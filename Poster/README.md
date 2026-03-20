# React 网页从 0 构建与现有文件启动说明

**⚡ 如果你是第一次接触这个项目，直接跳到"快速开始"章节！**

这份文档分三部分：

1. **快速开始**（五分钟内让网页在浏览器里跑起来）
2. 如何从 0 新建一个 React 网页项目
3. 如果已经拿到一堆现成文件，如何判断它是什么项目、如何安装并打开

本文以当前目录 [`Poster`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster) 里的项目为例。

---

## ⚡ 快速开始（新手必读）

**目标**：让网页在 5 分钟内在浏览器里跑起来。

### 第 1 步：打开终端，进入项目目录

```bash
cd "/Users/leonsun/Project/School Works/AEEE/Project/Poster"
```

### 第 2 步：安装依赖（第一次只需要做这一次）

```bash
npm install
```

**你会看到什么**：

- 开始会有一大堆输出
- 如果没有报错，最后会显示 `added XXX packages`
- 完成后项目里会多出一个 `node_modules/` 文件夹和 `package-lock.json`

**重要**：这两个文件/文件夹都不需要改，也不要删除。`node_modules/` 可能很大，但这是正常的。

### 第 3 步：启动开发服务器

```bash
npm run dev
```

**你会看到什么**：

```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  press h + enter to show help
```

### 第 4 步：打开浏览器

- 复制上面的链接：`http://127.0.0.1:5173/`
- 粘贴到浏览器地址栏
- 回车

**你会看到**：一个展板样式的网页，标题是"AURA"，有网格背景和彩色光晕。

---

## ✏️ 修改网页内容

### 最常改的文件：`src/app/App.tsx`

这个文件控制了网页的所有内容、布局、颜色。

**例如**：

- 改标题："AURA" 改成其他文字 → 找到 `<h1>AURA...</h1>` 那一行
- 改颜色主题 → 找到第 8 行的 `const THEME_VARIANT = 1;`，改成 `2`、`3` 或 `4` 试试
- 改网格透明度、大小 → 在 `THEMES` 对象里找到 `gridOpacity` 和 `gridPattern`

**修改后**：

- 保存文件（Ctrl+S / Cmd+S）
- 浏览器会**自动刷新**，你能立即看到改动

这叫"热更新"，不需要重启服务器，爽！

---

## ❌ 常见错误与解决

### 错误 1：`npm: command not found`

**原因**：没有安装 Node.js。

**解决**：
1. 下载 Node.js（推荐 LTS 版本）：https://nodejs.org/
2. 安装完成后重新打开终端
3. 验证：`node --version` 或 `npm --version`

### 错误 2：`npm install` 时卡住或报错

**原因 1**：网络慢或被墙了。
- 解决：等等，或者换网络

**原因 2**：旧版本依赖残留导致冲突。
- 解决：
  ```bash
  rm -rf node_modules/
  rm package-lock.json
  npm install
  ```

### 错误 3：`npm run dev` 后浏览器打不开网页

**原因**：端口被占用或防火墙问题。

**解决**：
1. 看终端的输出，找到 `Local: http://127.0.0.1:XXXX/` 的地址
2. 手动复制这个地址粘贴到浏览器
3. 如果还是不行，检查是否有其他程序占用了该端口

### 错误 4：改了代码但浏览器没有刷新

**原因**：可能是 VS Code 没有自动保存，或者浏览器缓存了。

**解决**：
1. 确保保存了文件（看标签页标题，没有白点说明已保存）
2. 浏览器按 `Cmd+Shift+R`（Mac）或 `Ctrl+Shift+R`（Windows）强制清除缓存刷新
3. 如果还是不对，检查终端有没有报错（红色 error 提示）

---

## 🎨 主题色切换说明

这个项目内置了 **4 个主题版本**，在 `src/app/App.tsx` 的第 8 行：

```tsx
const THEME_VARIANT = 1;
```

改这个数字试试：

| 数字 | 风格 | 特点 |
|------|------|------|
| `1` | 原始浅灰版 | 浅灰背景 + 蓝黄双光晕，看起来柔和 |
| `2` | 高对比极简版 | 纯白底 + 深灰字 + 橙色强调，专业感强 |
| `3` | 深色赛博版 | 极暗背景 + 紫青霓虹光晕 + 青色点缀，酷炫 |
| `4` | 苹果磨砂版 | 纯白 + 樱花粉和冰蓝微光 + 科技蓝，高级 |

改一个数字就能秒切整个主题，不用改其他东西。

---

## 📦 完成后：如何提交更改

如果你改完了网页，想把更改保存回 Git：

```bash
# 确保你在项目目录里
cd "/Users/leonsun/Project/School Works/AEEE/Project/Poster"

# 查看改动
git status

# 添加所有改动
git add .

# 提交
git commit -m "你的改动说明，比如：调整主题色"

# 推送回远端
git push
```

---

## 2. 从 0 构建一个 React 网页

最常见、最省事的方式是用 `Vite`。

### 2.1 新建项目

在终端运行：

```bash
cd "/Users/leonsun/Project/School Works/AEEE/Project"
npm create vite@latest my-react-page -- --template react-ts
```

说明：

- `my-react-page` 是项目文件夹名字，可以换成你自己的。
- `react-ts` 表示 React + TypeScript。
- 如果你想用 JavaScript，可以改成 `react`。

### 2.2 安装依赖

```bash
cd "/Users/leonsun/Project/School Works/AEEE/Project/my-react-page"
npm install
```

这一步会生成 `node_modules/` 和 `package-lock.json`。

### 2.3 启动本地开发服务器

```bash
npm run dev
```

终端通常会显示类似：

```text
Local: http://localhost:5173/
```

然后用浏览器打开这个地址。

### 2.4 开始编辑

最常改的文件通常是：

- `src/App.tsx` 或 `src/App.jsx`
- `src/main.tsx` 或 `src/main.jsx`
- `src/*.css`

你改完文件并保存后，浏览器会自动刷新，这就是实时预览。

### 2.5 生成正式构建版本

```bash
npm run build
```

构建结果通常在：

- `dist/`

如果只是平时写页面，看实时预览就够了；如果要部署或提交静态网页，再执行 `build`。

## 3. 已经有一堆现成文件时，如何从头判断并打开

这部分就是你这次 `Poster` 项目实际发生的情况。

### 3.1 第一步：先不要急着运行，先看文件结构

我最先检查的是目录里有没有这些关键文件：

- `package.json`
- `index.html`
- `vite.config.ts` 或 `vite.config.js`
- `src/main.tsx` / `src/main.jsx`
- `src/App.tsx` / `src/App.jsx`

你当前这个项目里就有：

- [`package.json`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/package.json)
- [`index.html`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/index.html)
- [`vite.config.ts`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/vite.config.ts)
- [`src/main.tsx`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/main.tsx)
- [`src/app/App.tsx`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/app/App.tsx)

从这些文件就能判断：

- 这不是普通静态网页文件夹
- 这是一个 `React + Vite` 项目
- 所以正确打开方式不是双击 `index.html`
- 而是安装依赖后跑开发服务器

### 3.2 第二步：看 `package.json` 里的脚本

`package.json` 里最重要的是 `scripts`：

```json
"scripts": {
  "build": "vite build",
  "dev": "vite"
}
```

这说明：

- 开发预览命令是 `npm run dev`
- 打包命令是 `npm run build`

也就是说，我不是"猜"怎么启动，而是先读 `package.json` 再启动。

### 3.3 第三步：如果没有依赖，就先安装

如果目录里没有 `node_modules/`，就运行：

```bash
cd "/Users/leonsun/Project/School Works/AEEE/Project/Poster"
npm install
```

你这次项目一开始就是这个状态，所以我先装了依赖。

### 3.4 第四步：启动项目

安装完后运行：

```bash
cd "/Users/leonsun/Project/School Works/AEEE/Project/Poster"
npm run dev
```

实际启动后，Vite 给出的本地地址是：

```text
http://127.0.0.1:5173/
```

浏览器打开这个地址就能看到页面。

### 3.5 第五步：确定后面应该改哪里

对于这个项目，最核心的页面内容在：

- [`src/app/App.tsx`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/app/App.tsx)

如果你要改：

- 文案
- 布局
- 区块顺序
- 标题、颜色、卡片、背景

通常先改这个文件。

如果你要改全局样式，再看：

- [`src/styles/index.css`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/styles/index.css)
- [`src/styles/theme.css`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/styles/theme.css)

## 4. 这次我实际是怎么把你的网页"build / 打开"的

这次的真实步骤是：

1. 先看 `Poster` 目录里有哪些文件。
2. 发现有 `package.json`、`vite.config.ts`、`src/main.tsx`，判断它是 `React + Vite` 项目。
3. 打开 `package.json`，确认脚本里有 `npm run dev`。
4. 检查到还没有正常的 `node_modules/`，所以先执行 `npm install`。
5. 安装过程中遇到旧依赖残留目录问题，于是把坏掉的依赖目录挪开，重新安装。
6. 安装完成后执行 `npm run dev -- --host 127.0.0.1`。
7. 看到终端返回本地地址 `http://127.0.0.1:5173/`，说明项目已经成功跑起来。

所以这里的关键不是"build 了文件就能看"，而是：

- 先识别项目类型
- 再安装依赖
- 再启动开发服务器
- 最后在浏览器里访问本地地址

## 5. 如果以后你又拿到"别的地方的一堆网页文件"，应该怎么判断

可以按下面这个顺序：

### 情况 A：有 `package.json`

说明它大概率是 Node 前端项目。

处理方法：

1. 打开 `package.json`
2. 看 `scripts`
3. 找 `dev`、`start`、`build`
4. 运行 `npm install`
5. 运行对应脚本，例如 `npm run dev`

### 情况 B：没有 `package.json`，但有 `index.html`、`.css`、`.js`

说明它可能只是普通静态网页。

处理方法：

1. 可以先直接双击 `index.html` 试试
2. 或者用 VS Code 的 Live Server 打开
3. 这种项目通常不需要 `npm install`

### 情况 C：文件很多，但结构很乱，不知道是什么

先优先找这些入口：

- `package.json`
- `index.html`
- `vite.config.*`
- `webpack.config.*`
- `next.config.*`
- `src/main.*`
- `src/App.*`

先识别框架，再决定怎么跑，不要一上来就盲目 `build`。

## 6. 常见问题

### 6.1 为什么项目里会突然多出很多文件

通常是因为执行了 `npm install`，生成了：

- `node_modules/`
- `package-lock.json`

这是正常现象。`node_modules/` 文件非常多，但一般应该被 `.gitignore` 忽略。

### 6.2 为什么 Git 有时会显示上万文件

常见原因是：

- 你把 `node_modules/` 改了名字，比如 `node_modules_backup/`
- 这个新名字不在 `.gitignore` 里
- Git 就会把里面几万个文件都当成未跟踪文件

### 6.3 为什么不能直接打开 `index.html`

因为很多 React/Vite 项目依赖：

- 模块打包
- 热更新
- TypeScript 转换
- 路径解析

这些都需要开发服务器处理，所以要用 `npm run dev`，不是直接双击 HTML。

## 7. 你以后可以直接照抄的最短流程

如果你拿到的是一个前端项目文件夹，先试下面这组命令：

```bash
cd "/你的项目路径"
ls
cat package.json
npm install
npm run dev
```

然后：

1. 看终端给出的本地网址
2. 用浏览器打开
3. 改 `src/App.tsx` 或对应入口文件
4. 保存后看自动刷新

如果你愿意，下一步我可以继续给你写第二份更短的版本，压缩成“5 分钟上手 React 网页”的速查文档。
---

## 8. 【重要】这个项目具体怎么改内容

这个 `Poster` 项目是一个展板样式的网页。如果下一个人要改内容，这里告诉他怎么改。

### 关键文件位置

所有的改动都在这一个文件里：

**[`src/app/App.tsx`](/Users/leonsun/Project/School%20Works/AEEE/Project/Poster/src/app/App.tsx)**

### 改标题和副标题

在 `App.tsx` 里找到这一部分：

```tsx
<h1 className={`text-6xl sm:text-7xl font-black tracking-tighter ${theme.title} leading-[0.85] mb-2`}>
  AURA<span className={theme.accent}>.</span>
</h1>
<h2 className={`text-xs sm:text-sm font-semibold tracking-widest ${theme.muted} uppercase mt-1`}>
  Intelligent Rover
</h2>
```

- `AURA` 改成你要的标题
- `Intelligent Rover` 改成副标题

### 改主题色（秒切主题）

在 `App.tsx` **第 8 行**，找到：

```tsx
const THEME_VARIANT = 1;
```

改这个数字即可秒切整个网页的色彩主题：

| 数字 | 风格 |
|------|------|
| `1` | 原始浅灰（蓝黄光晕） |
| `2` | 高对比白色（橙色强调） |
| `3` | 深色赛博（紫青霓虹） |
| `4` | 苹果磨砂（樱花粉和冰蓝） |

### 改底部文字（Specification、Exhibition）

找到底部的 Footer 部分：

```tsx
<p className={...}>
  Specification
</p>
<p className={...}>
  LiDAR Mapping<br />
  Neural Core v4
</p>
```

改这里的内容即可。

### 改右上角和左下角的卡片（UI Panel）

这两个毛玻璃卡片都是在"Defocused Frosted Glass UI Panels"那一段里：

- **Panel 1（右上）**：带 Settings 图标和柱状图
- **Panel 2（左下）**：带 CPU 图标和进度条

改里面的数字、文字、比例都可以。

### 想调整光晕效果？

在 `THEMES` 对象里，每个主题都有这些参数：

```tsx
glowWarm: 'bg-amber-200/50',      // 左上光晕
glowCool: 'bg-[#bae6fd]/60',      // 右上光晕
glowAmbient: 'bg-[#e2e8f0]/70',   // 底部光晕
```

改这些值就能改光晕的颜色和透明度。

### 想调整网格？

在 `THEMES` 对象里：

```tsx
gridOpacity: 'opacity-[0.35]',    // 网格透明度
gridPattern: 'bg-[linear-gradient(...)]',  // 网格大小和颜色
```

修改这两个值即可。

---

## 9. 如果改完了，如何提交回来？

**建议流程**：

```bash
# 1. 进入项目目录
cd "/Users/leonsun/Project/School Works/AEEE/Project/Poster"

# 2. 检查改了什么
git status

# 3. 把改动全部添加
git add .

# 4. 提交，写一个清楚的说明
git commit -m "主题切换到版本 4，调整网格透明度"

# 5. 推送到远端
git push
```

**或者直接压缩文件给原作者**：

- 把整个 `Poster` 文件夹压缩后发过去
- 或者把改动截图发过去

---

## 10. 遇到问题怎么办

1. **看终端**：红色 `Error` 信息通常告诉你哪里出错了
2. **看浏览器控制台**：按 `F12` 看有什么错误
3. **改回上一个版本**：如果改坏了，Ctrl+Z 撤销，或者 `git status` 看看改了什么
4. **不要删 `node_modules/`**：这个文件夹很大但改不得，删了重装会很慢

---

## 11. 快速参考表

| 任务 | 命令 |
|------|------|
| 启动开发服务器 | `npm run dev` |
| 正式打包构建 | `npm run build` |
| 查看构建结果 | 打开 `dist/` 文件夹 |
| 看 Git 改动 | `git status` 或 `git diff` |
| 撤销所有改动 | `git checkout .` |
| 删除 node_modules 重装 | `rm -rf node_modules && npm install` |

---

## 12. 🎨 扩展：如何在 Figma 中复刻此设计（高分辨率打印准备）

如果你需要将这个网页的设计复刻到 Figma 中，用来输出高清的实体海报（例如 A1 尺寸打印），可以按照以下逻辑进行 CSS 样式到 Figma 工具栏的等比例翻译。

### 12.1 画布设置与尺寸换算

实体 A1 海报在 300 PPI（像素/英寸）下的标准像素尺寸为 **7016 × 9933 px**。

目前网页（开发时）的相对参考尺寸大约是 **640 × 905 px**。
这意味着在 Figma 中，你需要把所有元素按比例放大近 **11 倍**（`7016 / 640 ≈ 10.96`）。所以你在代码里看到的任何 px 尺寸，搬到 Figma 里都要乘以 11：

- **基础网格 (Grid)**：网页里一格是 `32px`，在 Figma 里画格子应当是 `352px × 352px` 左右。
- **大标题文字**：网页里是 `text-7xl`（约 `72px`），Figma 里直接放飞，字号调到 `~800px` 左右。
- **卡片圆角**：网页是 `rounded-2xl`（`16px`），Figma 里就是 `~176px`。

### 12.2 快速获取与迁移颜色 (HEX) 和透明度 (Opacity)

在 `src/app/App.tsx` 里的 `THEMES` 字典中，颜色的写法非常直观，比如：

- `bg-[#ffc8d6]/60`
- `text-white/80`

**如何迁移到 Figma：**
1. `/` 前面的是颜色，`/` 后面的是透明度。
2. 选中 Figma 里的形状或文字。
3. 在右侧属性面板的 **Fill（填充）** 里输入对应的十六进制代码，比如 `FFC8D6`。
4. 旁边的透明度直接输入 `60%` 即可。

### 12.3 核心视觉元素：光晕与毛玻璃的复刻

**1. 氛围光晕（对应 CSS 的 `blur-`）**
网页代码里背景的大光斑用的是类似于 `blur-[100px]`（100像素高斯模糊）。
- **Figma 操作**：画一个巨大的椭圆（Ellipse）。
- 设置好上面的颜色和透明度（比如蓝色 `BAE6FD`，透明度 `60%`）。
- 点击右侧的 **Effects（效果）** ➜ 选择 **Layer Blur（图层模糊）**。
- **注意**：由于画布放大了11倍，这里的模糊值也要乘以 11。将 Blur 的数值调到 `1000` 到 `1500` 之间，直到光斑边缘如网页般完全柔和。

**2. 微磨砂玻璃卡片（对应 CSS 的 `backdrop-blur`）**
网页中前方的半透明 UI 悬浮板用的是 `backdrop-blur-md` 结合 `bg-white/[0.04]`。
- **Figma 操作**：画一个圆角矩形作为卡片底板。
- 填充选白色 `#FFFFFF`，透明度调到极低，例如 `4%` 到 `10%`。
- 点击 **Effects（效果）** ➜ 选择 **Background Blur（背景模糊）**。模糊值建议设为 `150` 到 `250`（按需微调，保证下方底图被模糊且前方文字仍清晰可读）。
- 💎 **高光细节边缘**：为了让玻璃质感更强，网页里加了一层淡边框。在 Figma 里，给此矩形加一个 **Stroke（描边）**，宽度随意（比如 `4px`），颜色为白色，描边透明度 `15%` 左右，这样你的玻璃就像有厚度和高光一样。

### 12.4 网格化背景 (Grid) 的复刻

网页里的网格是用 CSS 的 `linear-gradient` 无限延展画出来的。在 Figma 里：
- 不要尝试手动画几百条线填满 7016×9933 的画布，很卡也很麻烦。
- **推荐方法 A（组件平铺法）**：先画一个 `352×352` 的正方形，只给它的“右边”和“下边”加上 2px 的淡色线（纯白或纯黑，透明度 10%）。将其转换为 **Component（组件）**，然后复制平铺整个框架。
- **推荐方法 B（插件法）**：在 Figma 社区里搜索并运行插件，比如 **"Looper"**、**"Grid Generator"** 或 **"Pattern Hero"**，输入你的线宽和间距（352px），插件会一秒钟帮你切分好背景网格。