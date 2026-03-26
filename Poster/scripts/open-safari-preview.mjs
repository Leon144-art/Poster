import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const PORT = 4173;
const URL = `http://127.0.0.1:${PORT}/`;

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
    server.listen(PORT, '127.0.0.1', () => resolve());
  });

  return server;
}

async function main() {
  console.log('Building poster...');
  await runCommand('npm', ['run', 'build'], projectRoot);

  console.log('Starting static preview server...');
  const server = await createStaticServer(distDir);

  const cleanup = () => {
    server.close();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  console.log(`Opening Safari at ${URL}`);
  await runCommand('open', ['-a', 'Safari', URL], projectRoot);

  console.log('');
  console.log('Safari preview is ready.');
  console.log('Use Safari: File > Export as PDF... or File > Print > PDF.');
  console.log('Press Ctrl+C here when you are done.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
