import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const outputDir = path.join(projectRoot, 'exports');
const outputPdf = path.join(outputDir, 'Poster.pdf');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`));
    });
  });
}

async function createStaticServer(rootDir) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      let requestPath = decodeURIComponent(url.pathname);
      if (requestPath === '/') requestPath = '/index.html';

      const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
      const filePath = path.join(rootDir, safePath);
      const fileStat = await stat(filePath);

      let finalPath = filePath;
      if (fileStat.isDirectory()) {
        finalPath = path.join(filePath, 'index.html');
      }

      const ext = path.extname(finalPath).toLowerCase();
      const content = await readFile(finalPath);

      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(content);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(4173, '127.0.0.1', () => resolve());
  });

  return server;
}

async function launchBrowser() {
  try {
    return await chromium.launch({
      channel: 'msedge',
      headless: true,
    });
  } catch (edgeError) {
    try {
      return await chromium.launch({ headless: true });
    } catch (fallbackError) {
      throw new Error(
        [
          'Unable to launch a Chromium browser for PDF export.',
          'Primary attempt: Microsoft Edge channel.',
          `Edge error: ${edgeError instanceof Error ? edgeError.message : String(edgeError)}`,
          `Fallback error: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
          'Install a supported browser or run: npx playwright install chromium',
        ].join('\n')
      );
    }
  }
}

async function waitForAssets(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await Promise.all(
      Array.from(document.images).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              })
      )
    );
  });
}

async function main() {
  console.log('Building poster...');
  await runCommand('npm', ['run', 'build'], projectRoot);

  console.log('Starting static preview server...');
  const server = await createStaticServer(distDir);

  let browser;
  try {
    console.log('Launching browser...');
    browser = await launchBrowser();
    const page = await browser.newPage({
      viewport: { width: 1200, height: 1700 },
      deviceScaleFactor: 2,
    });

    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.error(`[page console] ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => {
      console.error(`[page error] ${error.message}`);
    });

    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
    await waitForAssets(page);

    await page.waitForFunction(() => !!document.querySelector('[data-export-poster]'), {
      timeout: 120000,
    });

    const poster = page.locator('[data-export-poster]');
    await poster.waitFor({ state: 'visible', timeout: 120000 });
    await poster.scrollIntoViewIfNeeded();

    const pngBuffer = await poster.screenshot({
      type: 'png',
      scale: 'device',
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [594, 841],
      compress: true,
    });

    pdf.addImage(`data:image/png;base64,${pngBuffer.toString('base64')}`, 'PNG', 0, 0, 594, 841);

    await mkdir(outputDir, { recursive: true });
    await writeFile(outputPdf, Buffer.from(pdf.output('arraybuffer')));

    console.log(`PDF exported to: ${outputPdf}`);
  } finally {
    if (browser) {
      await browser.close();
    }
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
