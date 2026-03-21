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

### 12.3 网格化背景 (Grid) 的复刻

网页里的网格是用 CSS 的 `linear-gradient` 无限延展画出来的。在 Figma 里，请根据所选主题参考以下颜色表，然后选择对应的复刻方式：

**网格颜色与透明度参考**：

| 主题 | 网格线颜色 | 透明度 | 推荐说明 |
|------|---------|------|--------|
| 1（蓝黄） | `#D4D4D8`（锌灰） | 35% | 浅灰中等可见 |
| 2（橙绿） | `#000000`（纯黑） | 4% | 极淡线条 |
| 3（紫青） | `#FFFFFF`（纯白） | 6% | 深底浅线 |
| 4（樱花蓝） | `#000000`（纯黑） | 3% | 超浅极简 |
| 5（青蓝） | `#06B6D4`（亮青） | 6% | 青色网格 |
| 6（浅蓝） | `#CBD5E1`（浅灰） | 25% | 灰蓝可见 |

**Figma 复刻方法**：
- **推荐方法 A（组件平铺法）**：先画一个 `352×352` 的正方形，只给它的"右边"和"下边"加上 2px 的淡色线（参考上表的颜色），将其转换为 **Component（组件）**，然后复制平铺整个框架。
- **推荐方法 B（插件法）**：在 Figma 社区里搜索并运行插件，比如 **"Grid Generator"**，输入你的线宽（2px）、间距（352px）和对应主题的线条颜色，插件会一秒钟帮你切分好背景网格。

### 12.4 全局排版与安全边距 (Typography & Base Layout)

网页结构是一个极简的瑞士排版（Swiss Design）风格容器。所有文字与基础信息的定位都依赖外边距：

*   **画布内边距（Padding）**：代码中使用了 `p-10`（在移动端 `sm` 以上生效），即 `40px`。
    *   **Figma 映射**：给你的 A1 画布（Frame）四周留出约 **`440px` 的安全边距**（所有标题、底栏都在这个边界内对齐）。
*   **主标题 (Title - GROUP5.)**：代码为 `text-7xl`、字重 `font-black`、行高 `leading-[0.85]`。
    *   **Figma 映射**：无衬线字体（推荐 Helvetica Neue、Inter、SF Pro Display 甚至 Roboto），**字号 `800px`**，**字重 Black (900)**，**行高 (Line Height) 设定为 `85%`**，字母间距 (Letter spacing) 设定为 `-3%` 到 `-5%`。
*   **副标题 (Subtitle - NineOne Rover)**：代码为 `text-2xl`，大写 `uppercase`，宽间距 `tracking-widest`。
    *   **Figma 映射**：字号 `260px`，**字重 SemiBold (600)**，全大写，**字母间距 `10%`**。
*   **左侧侧边竖向文字**："Next Generation Autonomous Systems"
    *   **坐标与旋转**：画布左侧中心点（Y轴居中），旋转 `-90°`（逆时针或正向上）。字体基准 `text-[10px]` $\times$ 11 = `110px`，极宽的字距（`tracking-[0.4em]` 对应 Figma 字母间距 `40%`）。

### 12.5 悬浮毛玻璃卡片 (UI Panels) 的复刻与绝对坐标

网页中前方的半透明 UI 悬浮板使用了带背景模糊 (`backdrop-blur`) 的设计。把它们搬到标准 A1 画布（宽 7016 × 高 9933 px）时，你可以直接在 Figma 的右侧属性栏输入以下图层参数（圆顶角统一设置约为 `176px`）：

*   **材质通用做法**：
    *   面板底色：填充白色 `#FFFFFF`，透明度调到 `4%` 到 `10%`。
    *   高级模糊：点击 **Effects（效果）** ➜ **Background Blur（背景模糊）** 设为 `150` 到 `300` 左右。
    *   高光边缘：添加一个白色的 **Stroke（描边）**，宽 `4px`，透明度 `15%`，增加玻璃厚度感。

**1. 右上角 ROI HUD 视窗 (带心跳红点和曲线)**
*   **尺寸 (W × H)**：`2816 × 3168 px`（网页中对应的 `w-64 h-72`）
*   **绝对位置 (X, Y)**：`X: 3639, Y: 1341`（逻辑：距顶部13.5%，距右侧8%）
*   **旋转角度 (Angle)**：`2°`
*   **阴影效果 (Drop Shadow)**：
    * Position X: `0`
    * Position Y: `198 px`
    * Blur: `484 px`
    * Spread: `0`
    * Color: `0F172A`，Opacity: `18%`
*   **内部核心元素**（按从上到下顺序）：
    *   **Header 状态栏**：`ROI_TRACKING_ACTIVE` 文字（字色 `#64748B`，字号 64px），左侧心跳指示灯（圆形，直径 44px，填充 `#EF4444` 红色，Blur `88px`），右侧 Settings 齿轮图标（灰色）
    *   **Visualizer 主窗口**（镂空矩形）：尺寸约 `2464 × 1452 px`，四个角的对焦框（白色线条 22px 长，2px 宽），中心十字准星（虚线），中心圆点（`border-blue-500/80` 描边）
    *   **绿色拟合直线**：宽约 1650px，斜角约 45°，上面采样标记 5 个点（`border-green-600` 圆环 + `bg-green-400` 实心点混合），绿色发光
    *   **红色法向量**：箭头指示，标注 `normError` 文字（红色 12px 字体）
    *   **底部 C++ 变量 HUD**（半透明卡片）：显示 3 行数据 
        - Line 1: `cv::fitLine([dist=L2])` 及其 `vy/vx` 的青蓝色显示值
        - Line 2: `emaTilt.deg` 及其琥珀色数值 `-35.15°`
        - Line 3: `expoPower` 及其绿色数值 `0.82 * P_MAX`

**2. 左下角 CPU 状态面板 (带处理芯片图标)**
*   **尺寸 (W × H)**：`2464 × 1584 px`（网页对应的 `w-56 h-36`）
*   **绝对位置 (X, Y)**：`X: 351, Y: 6363`（逻辑：距左侧5%，距底部20%）
*   **旋转角度 (Angle)**：`-2°`
*   **内部对齐参考**：内边距 Padding `176px`，左侧圆形装饰宽高 `440 × 440 px`。右侧高亮数据条高度约为 `176px`。
*   **内部核心元素**（按从上到下顺序）：
    *   **左上角 CPU 图标面板**：圆形图标框（`440 × 440 px`，边框 22px），填充近白色（主题依赖），中心 CPU 图标（使用主题的 accent 颜色，如 `#0066CC`）
    *   **右侧标签栏**：两行右对齐的文字（字色 `#64748B`），间距 176px
    *   **底部进度条组**：两条高亮粗条（左侧条 66% 宽度，右侧条普通宽度），全圆角（Rounded `100px`），填充主题 accent 色的半透明版本

**3. 左侧边缘被截断的小面板 (Mid Left Panel)**
*   **尺寸 (W × H)**：`1408 × 1936 px`（网页对应 `w-32 h-44`）
*   **绝对位置 (X, Y)**：`X: -352, Y: 4171`（逻辑：通过负坐标 -left-8 拖出画布边缘产生裁切感）
*   **旋转角度 (Angle)**：`-6°`
*   **设置 Clip content**：勾选 Figma 的裁切选项，使内容在边界外自动隐藏，模拟网页的溢出隐藏效果

**通用阴影参考表（其他 Panel 与页面元素）**：

| 元素位置 | Position X | Position Y | Blur | Spread | Color | Opacity | 说明 |
|--------|-----------|----------|------|--------|-------|---------|------|
| **大海报容器** | 0 | 352 | 880 | 0 | 000000 | 15% | 网页主海报外框阴影 |
| **Panel 背景通用** | 0 | 88 | 352 | 0 | 0F172A | 10% | 大多数浮窗用（除 theme 5） |
| **Panel 背景淡版** | 0 | 88 | 352 | 0 | 0F172A | 6% | 需要超轻微阴影的 Panel |
| **Panel 深色版（theme 5）** | 0 | 132 | 440 | 0 | 000000 | 50% | 深海青蓝主题的深色卡片 |

### 12.6 背景大光晕与轨迹引导线 (Atmosphere & SVG Trails)

**1. 氛围大光晕 (Ambient Glow)**
网页中使用了基于画布百分比的极大尺寸椭圆配合极为激进的高斯模糊来制作光晕。在 Figma 中，请直接建立椭圆 (Ellipse)，点击 **Effects（效果）** ➜ **Layer Blur（图层模糊）**，并输入以下数据：

**注意**：光晕颜色根据所选主题而异，请根据下表选择对应的 RGB 值或 HEX 代码，在 Figma 的填充面板中输入，然后设置透明度：

| 光晕位置 | 主题 1（蓝黄） | 主题 2（橙绿） | 主题 3（紫青） | 主题 4（樱花蓝） | 主题 5（青蓝） | 主题 6（浅蓝） |
|---------|------------|------------|------------|------------|----------|----------|
| **左上暖光 (Warm)** | `#FCD34D` 40% | `#FF6600` 14% | `#A855F7` 25% | `#FCD34D` 50% | `#06B6D4` 15% | `#38BDF8` 15% |
| **右上冷光 (Cool)** | `#7DD3FC` 40% | `#00D084` 10% | `#06B6D4` 15% | `#BAE6FD` 60% | `#3B82F6` 10% | `#818CF8` 10% |
| **底部环光 (Ambient)** | `#3B82F6` 30% | `#00D084` 7% | `#3B82F6` 10% | `#E2E8F0` 70% | `#0891B2` 10% | `#CBD5E1` 30% |

*   **左上角首要光源 (Warm Glow)**
    *   **尺寸 (W × H)**：`3788 × 5363 px` 
    *   **位置 (X, Y)**：`X: -701, Y: -2185` 
    *   **填充颜色与透明度**：参考上表，选择相应主题的颜色
    *   **系统特效 (Layer Blur)**：图层模糊 `1100 px`
    *   **提示**：这个光晕构成了页面的主氛围调，置于画布的最底层即可。

*   **右上角辅光源 (Cool Glow)**
    *   **尺寸 (W × H)**：`2525 × 3575 px` 
    *   **位置 (X, Y)**：`X: 5332, Y: -1787` 
    *   **填充颜色与透明度**：参考上表，选择相应主题的颜色
    *   **系统特效 (Layer Blur)**：图层模糊 `1320 px`

*   **底部环境托底光带 (Bottom Ambient)**
    *   **尺寸 (W × H)**：`7717 × 3774 px` 
    *   **位置 (X, Y)**：`X: -350, Y: 8542` 
    *   **填充颜色与透明度**：参考上表，选择相应主题的颜色
    *   **系统特效 (Layer Blur)**：图层模糊 `1540 px` 

**2. Line-Following 循迹路线**

网页中有 4 种不同的路线变体（`TRAIL_VARIANT`），默认使用第 4 种。你可以在 `src/app/App.tsx` 第 14 行修改选择：

| 变体编号 | 路线风格 | 曲线形状说明 |
|--------|--------|---------|
| 1 | 标准S曲线 | 中段下探后向右下延展 |
| 2 | 缓和S曲线 | 更平缓的正弦波形 |
| 3 | 激进斜切 | 更陡峭的右下斜向延展 |
| 4（当前默认） | 直角L折 | 从右下垂直上升，再圆角转水平左移 |

**轨迹线条复刻方法**（以第 4 种为例）：
*   **Figma 操作**：使用 **Pen Tool（钢笔工具，快捷键 P）**，在 A1 画布中心拉出路线：
    *   从点 `(460, 900)` 垂直向上到 `(460, 320)`
    *   使用二次贝塞尔曲线平滑转角到 `(340, 200)`（转角半径约 120px）
    *   水平向左延伸到 `(-50, 200)` 穿过画布左边界
*   **外围发光效果**（三层构成）：
    1. **底层 Glow**：描边颜色 `#7DD3FC`（天蓝色），宽度约 `260px`，并添加 **Drop Shadow/Outer Glow** 特效
    2. **虚线层**：复制一条线，描边改为虚线（Dash = `110px`, Gap = `130px`），颜色 `#FFFFFF` 透明度 `18%`
    3. **实线层**：最前的主线，描边 `#7DD3FC` 宽度 `27px`（放大11倍的数值）

**轨迹线条颜色根据主题变化**（虽然默认都使用冰蓝，但可按需调整）：

| 主题 | 轨迹主线色 | 发光色 | 虚线色（RGBA） |
|------|---------|------|-----------|
| 1（蓝黄） | `#0EA5E9` | `#0EA5E9` | `rgba(148,163,184,0.18)` |
| 2（橙绿） | `#0EA5E9` | `#0EA5E9` | `rgba(148,163,184,0.18)` |
| 3（紫青） | `#0EA5E9` | `#0EA5E9` | `rgba(148,163,184,0.18)` |
| 4（樱花蓝） | `#7DD3FC` | `#7DD3FC` | `rgba(125,211,252,0.18)` |
| 5（青蓝） | `#06B6D4` | `#06B6D4` | `rgba(6,182,212,0.18)` |
| 6（浅蓝） | `#7DD3FC` | `#7DD3FC` | `rgba(125,211,252,0.18)` |

*   **轨迹中心标记点**（Circle 12.5. 部分提到的中心红点）：
    *   **尺寸**：`40px × 40px`（11倍缩放后）
    *   **填充**：纯白或目标颜色，透明度 100%
    *   **描边**：主题中的 `centerDotBorder` 颜色（通常带蓝色 `-500/80` 级别的透明度）
    
然后**在同位置复制一条线**，描边改为内部虚线（Dash = `110px`, Gap = `130px`），使用根据主题选定的虚线色，盖合在底部发光线上即可完美呈现科幻数据流质感。

### 12.7 装饰线与占位符细节

**条形码修饰 (Barcode Lines 右上角竖线)**
在右上角标题对面有一组竖线。网页里是 `h-7`，所以 Figma 里高度统一为 `300px`。线宽分别为 2px、1.5px、1px、4px、2px —— 放大11倍后，你在 Figma 里可以画一系列高度 300px，宽度分别为 `22px, 16.5px, 11px, 44px, 22px` 的矩形，间距大约留 `33px`。

**线条颜色根据主题参考下表**：

| 主题 | 条形码线条颜色 | 透明度 |
|------|-------------|------|
| 1（蓝黄） | `#64748B`（深灰） | 100% |
| 2（橙绿） | `#64748B`（深灰） | 100% |
| 3（紫青） | `#64748B`（灰） | 100% |
| 4（樱花蓝） | `#86868B`（Apple灰） | 100% |
| 5（青蓝） | `#475569`（深灰青） | 100% |
| 6（浅蓝） | `#64748B`（深灰） | 100% |

**中央产品放置区 (十字准星)**
画面正中间的预留空位是一个 `max-w-[320px]` 的框。Figma 里画一个大约 `3500px × 3500px` 的隐形参考框，然后在其四个角画长度 `176px`，粗细 `11px` 的直线交组出十字"+"号角即可。

**十字准星线条颜色根据主题参考下表**：

| 主题 | 十字线条颜色 | 透明度 |
|------|---------|------|
| 1（蓝黄） | `#64748B`（深灰） | 100% |
| 2（橙绿） | `#64748B`（深灰） | 100% |
| 3（紫青） | `#475569`（深灰） | 100% |
| 4（樱花蓝） | `#C7C7CC`（Apple浅灰） | 100% |
| 5（青蓝） | `#475569`（深灰青） | 100% |
| 6（浅蓝） | `#64748B`（深灰） | 100% |

按照以上所有尺寸、间距、参数复刻到 Figma 或者 AI 里后，你得到的绝对不会是一个“看着差不多的图”，而是像素级完美对仗、排版逻辑极度严谨的“可打印版本重构工程”。