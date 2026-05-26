# 850 English OS

基于 **C.K. Ogden 的 Basic English（基本英语）** 系统的英语学习 Web 应用。核心信念：**850 个词 + 简单的语法结构 = 日常英语交流能力**。

> Learn more with fewer words.

## 核心理念

传统英语学习让你背更多单词。850 English OS 让你 **用更少的词，表达更多意思**。

- **Fewer words, more expression** — 用 850 个基础词构建表达能力
- **Basic words are powerful** — get、make、take 这类词比高级词更重要
- **Learn by using, not memorizing** — 看词如何组合、造句、表达真实场景

## 功能模块

| 模块 | 路径 | 说明 |
|------|------|------|
| **850 Words** | `/words` | 完整 850 基础词表，按分类浏览 |
| **Daily 10 Words** | `/daily` | 每次 10 个词，翻转卡片互动学习 |
| **Power Patterns** | `/patterns` | 10 个万能动词的组合表达能力 |
| **Simple Rewrite** | `/simplify` | 复杂英文改写为简单英文的示例 |

## 技术栈

- [Next.js](https://nextjs.org/) (App Router) — 框架
- [React](https://react.dev/) 19 — UI 库
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- [Tailwind CSS](https://tailwindcss.com/) v4 — 样式
- [shadcn/ui](https://ui.shadcn.com/) — UI 组件
- [Framer Motion](https://motion.dev/) — 动画
- [Lucide React](https://lucide.dev/) — 图标

### 数据

所有页面内容由 JSON 文件驱动（位于 `src/data/`），无需数据库。

## 快速开始

```powershell
# 安装依赖
npm install

# 构建数据
npm run data:build

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run data:build` | 构建 Basic English 词库数据 |
| `npm run data:validate` | 验证数据完整性 |
| `npm run pages:check` | 检查页面路由完整性 |
| `npm run build:patterns` | 构建 patterns 数据 |

## 项目结构

```
src/
├── app/            # Next.js App Router 页面
│   ├── daily/      # 每日 10 词
│   ├── patterns/   # 万能词组合表达
│   ├── simplify/   # 简化改写
│   └── words/      # 850 词表
├── components/     # UI 组件
│   ├── site/       # Header, Footer 等站点组件
│   ├── ui/         # shadcn/ui 基础组件
│   └── words/      # 词表相关组件
├── data/           # JSON 数据文件
└── lib/            # 工具函数
```

## 设计

采用 [Adaline](docs/design.md) 设计系统 — 宁静、自然、极简的视觉风格，以浅色主题为主。

- 主背景色：`#fbfdf6` (Canvas Ice)
- 主文字色：`#0a1d08` (Adaline Ink)
- 强调色：`#203b14` (Valley Green)
- 行动按钮：`#4a3212` (Amber Seed)

## 许可证

MIT
