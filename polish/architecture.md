# 850 English OS — Frontend Architecture

## 1. 项目定位

一个**纯展示型**学习工具网站，基于 Basic English 850 词概念。MVP 阶段不做登录、不做数据库、不做用户状态，所有内容由 JSON 文件驱动。

## 2. 技术栈

| 层 | 选择 |
|---|---|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5 (strict mode) |
| UI 引擎 | React 19 |
| 样式 | Tailwind CSS v4 |
| 构建 | Next.js built-in (no custom config) |
| 路径别名 | `@/` → `./src/*` |

无外部状态管理、无 API 路由、无数据库。

## 3. 路由结构

```
/               Landing Page          — 产品介绍 + 4 模块入口
/words          850 Words             — 词表浏览/搜索/筛选
/daily          Daily 10 Words        — Day 1 静态示例
/patterns       Power Patterns        — 万能词组合表达
/simplify       Simple English Rewrite — 简化改写示例
```

所有页面都是服务端组件，除了 `Header`（需要 `usePathname`）和 `WordsPage`（需要 `useState`）标记了 `"use client"`。

## 4. 组件树

```
RootLayout (layout.tsx)
├── globals.css (Tailwind + 自定义 CSS 变量)
├── Header (site/Header.tsx) [client]
│   └── 导航: Home / 850 Words / Daily / Patterns / Rewrite
├── Children (当前路由页面)
│   ├── / → HomePage (page.tsx)
│   ├── /words → WordsPage [client]
│   │   ├── Header (hero + 统计)
│   │   ├── 搜索栏 + 排序下拉
│   │   ├── 分类筛选按钮 (pill)
│   │   ├── 首字母筛选 (A-Z)
│   │   ├── WordCard[] (words/WordCard.tsx)
│   │   │   └── word, zh, example, tags
│   │   ├── 空状态 "No words found"
│   │   └── Load More 按钮 (分页 24/page)
│   ├── /daily → DailyPage
│   │   ├── Header + today info
│   │   ├── 10 个词卡片
│   │   └── 静态练习 (choice / fill-blank / rewrite)
│   ├── /patterns → PatternsPage
│   │   ├── 横向词导航 (anchor links)
│   │   └── PatternEntry 卡片
│   │       ├── 词信息 + 例句
│   │       ├── Patterns 列表 (phrase + zh + example)
│   │       └── Simple Replacements (advanced → simple)
│   └── /simplify → SimplifyPage
│       ├── Disabled textarea (未来 AI 输入占位)
│       └── RewriteExample 卡片列表
│           ├── Original → Simple 对比
│           └── Why + Key Words 标签
└── Footer (site/Footer.tsx)
    └── 产品说明 + 导航链接 + 版权
```

## 5. UI/UX 结构

### 5.1 布局系统

- **全宽布局**，内容区 `max-w-6xl` 居中
- **布局模式**: `grid lg:grid-cols-[1fr_auto]` 等非对称网格
- **响应式断点**: sm(640px) / md(768px) / lg(1024px)
- **间距**: 内边距 `px-6 sm:px-10`，章节间隙 `py-16 / py-20`

### 5.2 视觉设计 (Adaline)

参考 `design.md` 设计系统，基于自然/山谷主题。

**色彩:**

| Token | 色值 | 用途 |
|---|---|---|
| `canvas-ice` | `#fbfdf6` | 页面背景 / 卡片背景 |
| `adaline-ink` | `#0a1d08` | 主文字 |
| `valley-green` | `#203b14` | 品牌强调色 / 交互态 |
| `amber-seed` | `#4a3212` | 主按钮填充色 |
| `stone-moss` | `#e0e5d5` | 边框 / 分隔线 |
| `forest-dew` | `#d7e8b5` | 浅色填充 / 活跃导航背景 |
| `mist-gray` | `#c5ccb6` | 次要边框 |

**字体:**

- `Akkurat` — 主字体，全部标题和正文，`-0.04em` 字间距
- `Fragment Mono` — 等宽字体，标签/元数据，`+0.02em` 字间距

**圆角:**

- 按钮/导航项: `20px` (pill 形状)
- 卡片: `8px`

**阴影:** 极克制——只有 `rgba(99,143,61,0.1) 0 0 0 1px` 一种微妙的内部描边阴影

### 5.3 交互模式

- **导航**: Tab 式 nav pills，当前路由高亮（绿色填充）
- **筛选**: Pill 按钮组 (All / 6 categories)，选中态绿色填充
- **首字母**: A-Z 横向字母条，选中态绿色背景
- **搜索**: 实时过滤，结合类目+字母复合筛选
- **排序**: A→Z / Z→A / Category 三种模式
- **分页**: "Load more" 按钮，每次 24 条
- **空状态**: 专门处理——显示 "No words found" + 提示文字
- **清除筛选**: 当有活跃筛选时显示 "Clear filters" 链接

### 5.4 关键 UX 细节

- `aria-current="page"` 导航高亮
- `aria-label` 搜索输入
- `scroll-mt-8` 锚点滚动偏移
- `focus-visible:outline` 键盘导航可见焦点
- `text-balance` 标题自动平衡换行
- `text-pretty` 正文最优换行
- 词卡 hover 边框变色 + `active:scale-[0.96]` 按压反馈

## 6. 数据层

### 6.1 JSON 数据文件 (src/data/)

| 文件 | 用途 | 消费页面 |
|---|---|---|
| `basic-850.json` | 850 个词完整数据 | /words, /daily |
| `categories.json` | 6 个词分类定义 | /words |
| `daily-lessons.json` | 每日课程 + 练习 | /daily |
| `patterns.json` | 万能词组合+高级替换 | /patterns |
| `rewrite-examples.json` | 简化改写示例 | /, /simplify |

### 6.2 类型定义 (src/types/content.ts)

```typescript
BasicWord       — { word, category, zh, simpleMeaning, examples, patterns, tags }
WordCategory    — { id, name, zh, description }
DailyLesson     — { day, title, words, practice[] }
PowerPattern    — { phrase, zh, example }
PatternEntry    — { word, coreMeaning, zh, examples, patterns[], advancedReplacements[] }
RewriteExample  — { original, simple, why, keyWords[] }
```

### 6.3 数据流

```
JSON file → import → cast to type → useMemo filter/sort → render
```

无 API 层、无 loader、无缓存策略。数据在构建时打包进 JS bundle。

## 7. 页面逻辑详解

### 7.1 Landing Page (`/`)
- 纯展示，无交互状态
- 从 `rewrite-examples.json` 取第一个示例展示
- 4 个模块卡片用 `Link` 跳转

### 7.2 850 Words (`/words`) [客户端渲染]
- 4 个状态: `query`, `categoryFilter`, `letterFilter`, `sortMode`
- `visibleCount` 控制分页
- 筛选逻辑: 3 个条件 AND 组合
- 排序逻辑: az / za / category
- 每次筛选/排序变化时重置分页（`resetVisibleCount`）
- 搜索在 6 个字段（word, zh, simpleMeaning, patterns, tags）中做 `.includes()` 匹配

### 7.3 Daily 10 Words (`/daily`)
- 纯展示，展示 `daily-lessons.json` 中 lessons[0] 即 Day 1
- `getLessonWords()` 关联 basic-850.json 补全词信息
- inline `wordExamples` 表提供 10 个核心词的中文/例句/组合

### 7.4 Power Patterns (`/patterns`)
- 纯展示，全量渲染所有 pattern entries
- 顶部横向锚点导航，`href="#{word}"` 跳转
- `scroll-mt-8` 确保锚点跳转不被 header 遮挡

### 7.5 Simple English Rewrite (`/simplify`)
- 纯展示，展示所有 rewrite examples
- 包含一个 **disabled** textarea + button，仅作为未来功能的视觉占位

## 8. CSS 架构

- **Tailwind v4 utility-first**，无自定义 CSS 类
- `globals.css` 中定义了:
  - CSS 自定义属性（颜色 tokens）
  - `@theme` 块（Tailwind v4 主题扩展）
  - 基础 reset（`box-sizing`, `body margin`, `font-smoothing`）
  - `a` 标签基础样式
- 无 CSS modules、无 styled-components、无内联 style

## 9. 当前局限 (MVP)

- 所有数据打包在 JS bundle 中，850 词约 ~数百 KB 的 JSON
- `/daily` 只展示 Day 1，没有真正的每日切换
- `/simplify` 的改写输入框 disabled，未接 AI API
- 无搜索状态持久化（刷新即重置）
- 无词详情页（点击词卡不展开详情）
- 无图片/图标资源
- 无动画/过渡效果
- 无测试

## 10. 改进方向

- **性能**: `/words` 词表数据量较大可考虑虚拟滚动或按需加载
- **体验**: 搜索可加 debounce；筛选条移动端溢出可改进
- **功能**: 词详情 `/words/[word]` 路由、每日切换、AI 改写
- **设计**: 缺少图标、缺少插图、缺少过渡动画
