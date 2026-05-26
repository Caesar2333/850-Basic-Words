可以，下面就是一个可以直接保存为 `prd.md` 的第一版 PRD。重点按你说的：**纯展示态、不做用户状态、不做数据库、用 JSON 驱动页面、Landing + 4 个模块 + 共用 Header/Footer**。

# 850 English OS PRD

## 1. 产品一句话

850 English OS 是一个基于 Basic English 850 words 的英文快速入门网站，帮助用户通过 850 个核心英文词、基础组合表达、场景例句和简化改写，快速建立“最小可用英语表达系统”。

## 2. 产品定位

这个网站不是传统背单词网站。

传统背单词网站的目标是：

> 让用户记住更多英文单词。

本产品的目标是：

> 让用户用更少的基础词，表达更多真实意思。

核心卖点：

- 不强调高级词汇。
- 不强调考试刷题。
- 强调用 850 个基础词构建英语表达能力。
- 通过词卡、组合表达、场景表达和简化改写，帮助用户快速理解英语的底层表达方式。

## 3. 第一版目标

第一版只做展示型网站，不做登录、不做用户状态、不做数据库。

第一版目标：

1. 清楚介绍 850 English OS 的概念。
2. 展示 850 个基础英文词。
3. 展示高频万能词的组合表达能力。
4. 展示每日 10 词学习页面。
5. 展示基础场景表达页面。
6. 展示 850 词简化改写器的静态示例。
7. 用 JSON 文件驱动页面内容，避免把数据写死在组件里。

## 4. 第一版不做什么

第一版不做：

- 用户登录
- 用户学习进度
- 收藏功能
- 答题记录
- 多设备同步
- 后台管理系统
- 数据库
- 真实 AI 改写接口
- 付费系统
- 排行榜
- 复杂动画
- 复杂课程系统

第一版只做：

> 静态内容展示 + JSON 数据驱动 + 清晰的信息架构。

## 5. 信息架构

网站包含 1 个 Landing Page 和 4 个核心模块。

```text
/
  Landing Page

/words
  850 词表模块

/daily
  每日 10 词模块

/patterns
  万能词组合表达模块


/simplify
  850 词简化改写模块
```

注意：虽然核心学习模块是 4 个，但 Landing Page 独立存在。

4 个核心模块为：

1. 850 Words
2. Daily 10 Words
3. Power Patterns
4. Simple English Rewrite

其中 Scenes 可以作为 Landing 和 Patterns 的辅助内容，也可以在第一版并入 Patterns 或 Simplify 页面中展示。若第一版想更清晰，也可以保留 `/scenes`，但导航主入口只展示 4 个模块。

## 6. 全站布局

### 6.1 Header

Header 是全站共用组件。

Header 内容：

- 左侧：网站 Logo / 产品名
  - `850 English OS`
- 中间或右侧：主导航
  - Home
  - 850 Words
  - Daily
  - Patterns
  - Rewrite
- 右侧可选：
  - GitHub 链接
  - Language toggle 占位，第一版可以不实现

导航形式：

- 桌面端使用顶部导航 Tabs / Nav Pills。
- 移动端使用折叠菜单，第一版可简化为横向滚动导航。

Header 设计要求：

- 固定在顶部或普通顶部均可。
- 当前页面导航项需要高亮。
- 不要做复杂动效。
- 风格清爽、学习工具感强。

### 6.2 Footer

Footer 是全站共用组件。

Footer 内容：

- 产品名：850 English OS
- 一句话说明：
  - `Learn more with fewer words.`
- 数据来源说明：
  - `Based on the classic Basic English 850-word concept.`
- 链接：
  - About
  - Words
  - Patterns
  - Rewrite
- 版权信息：
  - `© 2026 850 English OS`

Footer 设计要求：

- 简洁。
- 不抢主内容注意力。
- 可以放在页面底部。
- 第一版不需要复杂链接。

## 7. 页面需求

------

## 7.1 Landing Page

路径：

```text
/
```

### 页面目标

让用户在 10 秒内理解：

> 这个网站不是背单词，而是教你用 850 个基础词快速表达英语。

### 页面结构

#### Hero 区域

主标题：

```text
Learn English with 850 essential words.
```

副标题：

```text
A simple English system that helps you say more with fewer words.
```

中文版本可选：

```text
用 850 个基础词，建立你的英语表达系统。
```

主按钮：

```text
Start with 850 Words
```

次按钮：

```text
See Power Patterns
```

#### 核心解释区

展示 3 个理念：

1. Fewer words, more expression
   用更少的词，表达更多意思。
2. Basic words are powerful
   get、make、take、put 这类词比很多高级词更重要。
3. Learn by using, not memorizing
   不只是背词，而是看它如何组合、如何造句、如何表达真实场景。

#### 4 个模块卡片

展示 4 张模块卡片：

1. 850 Words
   - 查看完整 850 基础词表。
2. Daily 10 Words
   - 每次只学 10 个词，降低压力。
3. Power Patterns
   - 学 get / make / take / put 等万能词组合。
4. Simple Rewrite
   - 把复杂英文改写成简单英文。

#### 示例区

展示一个“复杂表达 → 简单表达”的例子：

```text
Original:
The system encountered an unexpected error during initialization.

Simple English:
The system had a problem when it started.
```

说明：

```text
The goal is not to sound advanced. The goal is to be clear.
```

### 验收标准

- 用户能从首页理解产品定位。
- 首页必须展示 4 个核心模块入口。
- 首页必须有一个复杂英文改写成简单英文的例子。
- 首页不需要登录入口。
- 首页不需要用户状态。

------

## 7.2 850 Words 模块

路径：

```text
/words
```

### 页面目标

展示 850 个基础英文词，让用户可以按类别浏览。

### 页面结构

#### 页面标题

```text
850 Basic Words
```

副标题：

```text
The core words for building simple English expression.
```

#### 分类筛选

第一版可以按固定分类展示：

- Operations / Actions
- Things
- People
- Qualities
- Time & Place
- Function Words

分类按钮可以是静态筛选，也可以只是分组标题。

#### 词卡列表

每个词卡展示：

- 英文单词
- 中文核心意思
- 词性或类别
- 1 个最简单例句
- 标签，例如：
  - core
  - action
  - thing
  - quality

词卡示例：

```text
get
得到、拿到、变得、理解
Example: I got your message.
Tags: core, high-frequency
```

#### 词详情

第一版可以不做单独详情页，也可以用卡片展开。

若做详情页，路径为：

```text
/words/get
```

详情内容：

- word
- zh
- category
- examples
- patterns
- related words

### 验收标准

- 页面可以展示完整词表。
- 数据来自 `basic-850.json`。
- 词卡内容不能硬编码在组件里。
- 第一版不需要搜索功能。
- 第一版不需要收藏功能。
- 第一版不需要学习进度。

------

## 7.3 Daily 10 Words 模块

路径：

```text
/daily
```

### 页面目标

让用户以更轻的方式接触 850 词，不被完整词表吓到。

第一版不是动态每日生成，而是展示一个静态的 “Day 1” 示例。

### 页面结构

#### 页面标题

```text
Daily 10 Words
```

副标题：

```text
Learn 10 words at a time. Small steps, real progress.
```

#### 今日词列表

展示 10 个词。

每个词展示：

- word
- 中文意思
- 1 个基础例句
- 1 个组合表达，可选

示例：

```text
get
得到、拿到、变得
I got your message.
Pattern: get ready
```

#### 翻转词卡互动（Flip & Reveal）

**设计理念：** 用"翻牌"的仪式感替代枯燥的题目展示。用户先看到英文单词（正面），主动回忆意思后翻转卡片验证，加深印象。

##### 卡片正面（Flip Front）

用户看到的初始状态——**只有英文单词**，引导主动回忆：

```text
┌──────────────────┐
│                  │
│       GET        │  ← 大号英文词
│                  │
│    👆 tap me     │  ← 微妙的翻转提示
│                  │
└──────────────────┘
```

**交互流程：**

1. 用户看到 10 张词卡，全部正面朝上（仅显示英文）
2. 用户点击/触摸任意卡片 → 卡片翻转到背面
3. 背面展示完整信息（释义/例句/中文/组合表达）
4. 再次点击 → 翻回正面（仅显示英文）
5. 用户自由控制每张卡片的翻转状态

##### 卡片背面（Flip Back）

翻转后展示全部内容：

```text
┌──────────────────┐
│  GET              │
│  得到、拿到、变得  │
│ ┃ I got your      │  ← 引用块样式例句
│ ┃ message.        │
│ 📖 我收到了你的    │  ← 中文翻译
│    消息。         │
│ [Pattern: get ✓ ] │  ← 已掌握的标记
│      ↺ tap back   │
└──────────────────┘
```

##### 互动状态

| 状态 | 视觉 |
|------|------|
| 未翻转（正面） | 仅显示英文单词 + 底部 👆 tap me 提示 |
| 已翻转（背面） | 完整展示：单词 + 中文 + 例句 + 中文翻译 + Pattern + 翻转回提示 |
| 已掌握（背面标注 ✓） | 在 Pattern 标签旁显示绿色 "✓ 已掌握" 标记 |

**进阶互动可选：**
- 卡片翻转到背面时，加入微小的 "✓ 已查看" 标记
- 所有卡片翻过一遍后，底部显示 "完成了！" 的鼓励提示
- 可加入简单的 "全部翻转" / "全部翻回" 快捷按钮

##### 交互原则

- 翻转动画平滑（CSS transform: rotateY）
- 卡片背面内容层次清晰：词 → 释义 → 例句 → 翻译 → 标签
- 所有翻转状态由前端本地管理，不依赖后端
- 刷新页面后翻转状态重置（符合第一版不做用户状态的原则）

### 验收标准

- 页面展示 10 个词。
- 10 个词来自 JSON 数据。
- 第一版不需要真正按日期变化。
- 卡片默认展示正面（仅英文单词）。
- 点击卡片可翻转到背面（展示完整内容）。
- 再次点击可翻回正面。
- 翻转状态由前端本地管理。
- 刷新后重置翻转状态。
- 第一版不记录完成状态。

------

## 7.4 Power Patterns 模块

路径：

```text
/patterns
```

### 页面目标

展示基础高频词的强大组合能力。

这是网站最重要的差异化模块。

核心思想：

> 英语表达能力不只来自更多单词，也来自基础词的组合能力。

### 重点词

第一版重点展示这些万能词：

- get
- make
- take
- give
- put
- go
- come
- have
- be
- do

### 页面结构

定位：参考工具型。用户来这里查某个万能词有哪些 pattern、怎么用、在什么场合用。不是练习或测验页。

#### 页面标题

```text
Power Patterns
```

副标题：

```text
Use simple words to build many meanings.
```

#### 页面导航

使用顶部横向 pills 导航，展示全部 10 个万能词：

```
[ get ] [ make ] [ take ] [ put ] [ give ] [ go ] [ come ] [ have ] [ be ] [ do ]
```

点击 pill 切换当前显示的词。一次只展示一个词的全部内容，聚焦吃透。默认选中第一个（get）。

不使用左侧栏——10 个词用 pills 更轻量。

#### 每个万能词的页面布局

一屏聚焦一个词，从上到下分三块：

**第一块：Hero 区**

大字展示当前词，一眼建立”我要搞定这个词”的心理暗示。

```text
GET                                    ← 超大词
receive, become, understand, move      ← core meaning
得到、变得、理解、移动                  ← 中文释义
```

Hero 区下方展示该词的 2-3 个基础例句（与 pattern 例句区分，展示这个词的整体用法）。

**第二块：Pattern 卡片网格**

每个 pattern 是一张独立卡片，展示全部信息。卡片采用网格布局（移动端 1 列，桌面端 2-3 列）。

每张卡片包含的信息：

| 字段 | 说明 | 示例 (get up) |
|------|------|------|
| phrase | 动介组合本身 | get up |
| zh | 中文释义 | 起床 |
| literalBreakdown | 字面拆解，解释为什么这个组合有这个意思 | get(到达) + up(向上) → “从床面到达上方” → 起床 |
| usageScenarios | 使用场景标签 | 日常、早晨、作息 |
| examples | 2-3 个例句，覆盖不同搭配 | I get up at seven. / She got up late. / Get up! |
| collocation | 搭配结构说明 | get up + (时间 / early / late) |
| antonym | 反义 pattern | go to bed, lie down |

不包含近义/易混淆辨析（第一版跳过）。

**第三块：高级词替代表**

保持不变，展示简单词如何替代高级词：

```text
receive → get
understand → get
become tired → get tired
```

### 验收标准

- 页面必须突出 get / make / take / put 这类万能词。
- 页面必须展示”一个简单词，多种表达”的感觉。
- 使用顶部 pills 导航，一次只展示一个词。
- 默认选中第一个词（get）。
- 每个 pattern 包含：字面拆解、场景标签、多个例句、搭配结构、反义 pattern。
- 每个 pattern 的例句不少于 2 个。
- 数据来自 `patterns.json`。
- 第一版不需要用户输入。
- 第一版不需要测试记录。

------

## 7.5 Simple English Rewrite 模块

路径：

```text
/simplify
```

### 页面目标

展示“复杂英文可以被 850 词改写成简单英文”的产品能力。

第一版不接真实 AI，只展示静态示例。

### 页面结构

#### 页面标题

```text
Simple English Rewrite
```

副标题：

```text
Turn complex English into clear English.
```

#### 示例卡片

每个示例展示：

- Original
- Simple English
- Why it works
- Key basic words

示例 1：

```text
Original:
The system encountered an unexpected error during initialization.

Simple English:
The system had a problem when it started.

Why it works:
It replaces difficult words with basic words.

Key words:
system, have, problem, start
```

示例 2：

```text
Original:
Please confirm whether you require additional assistance.

Simple English:
Please tell me if you need more help.

Key words:
tell, need, more, help
```

示例 3：

```text
Original:
We need to investigate the cause of the issue.

Simple English:
We need to look into why this problem happened.

Key words:
need, look, why, problem, happen
```

#### 输入框占位

第一版可以展示一个 disabled input 或 fake textarea：

```text
Paste a sentence here...
```

按钮：

```text
Rewrite in Simple English
```

点击后不需要真实工作，可以显示：

```text
AI rewrite is coming in a future version.
```

或者第一版直接不做点击。

### 验收标准

- 页面必须展示至少 3 个静态改写例子。
- 必须体现“复杂词 → 基础词”的转换。
- 第一版不接 AI API。
- 第一版不需要用户输入真实可用。
- 数据来自 `rewrite-examples.json`。

------

## 8. 数据设计

第一版使用静态 JSON 文件，不使用数据库。

推荐目录：

```text
src/data/
  basic-850.json
  categories.json
  daily-lessons.json
  patterns.json
  rewrite-examples.json
```

## 8.1 basic-850.json

用于 850 Words 页面。

字段设计：

```json
[
  {
    "word": "get",
    "category": "operations",
    "zh": "得到、拿到、变得、理解",
    "simpleMeaning": "receive, become, understand",
    "examples": [
      "I got your message.",
      "I got tired.",
      "I got it."
    ],
    "patterns": [
      "get up",
      "get in",
      "get out",
      "get ready",
      "get better"
    ],
    "tags": ["core", "high-frequency"]
  }
]
```

## 8.2 categories.json

用于词表分类。

```json
[
  {
    "id": "operations",
    "name": "Operations / Actions",
    "zh": "动作与操作词",
    "description": "Words used to describe actions and basic operations."
  },
  {
    "id": "things",
    "name": "Things",
    "zh": "事物词",
    "description": "Words used to describe objects and common things."
  }
]
```

## 8.3 daily-lessons.json

用于 Daily 10 Words 页面。

第一版只需要 Day 1 到 Day 3 示例即可。

```json
[
  {
    "day": 1,
    "title": "Start with core action words",
    "words": ["get", "make", "take", "give", "put", "go", "come", "have", "be", "do"],
    "practice": [
      {
        "type": "fill-blank",
        "question": "I need to ___ ready for the meeting.",
        "answer": "get"
      }
    ]
  }
]
```

## 8.4 patterns.json

用于 Power Patterns 页面。

```json
[
  {
    "word": "get",
    "coreMeaning": "receive, become, understand, move",
    "zh": "得到、变得、理解、移动",
    "examples": [
      "I got your message.",
      "I got tired.",
      "I got it."
    ],
    "patterns": [
      {
        "phrase": "get up",
        "zh": "起床",
        "literalBreakdown": "get(到达) + up(向上) → 从床面到达上方 → 起床",
        "usageScenarios": ["日常", "早晨", "作息"],
        "examples": [
          "I get up at seven.",
          "She got up late this morning.",
          "Get up, it's time for school!"
        ],
        "collocation": "get up + (时间 / early / late)",
        "antonym": "go to bed, lie down"
      },
      {
        "phrase": "get ready",
        "zh": "准备好",
        "literalBreakdown": "get(变得) + ready(准备好的) → 进入准备好的状态",
        "usageScenarios": ["日常", "工作", "出行"],
        "examples": [
          "Please get ready for the meeting.",
          "I need 10 minutes to get ready.",
          "Get ready, we're leaving soon!"
        ],
        "collocation": "get ready + for + (something)",
        "antonym": ""
      }
    ],
    "advancedReplacements": [
      {
        "advanced": "receive",
        "simple": "get"
      },
      {
        "advanced": "understand",
        "simple": "get"
      },
      {
        "advanced": "become tired",
        "simple": "get tired"
      }
    ]
  }
]
```

注：antonym 为空字符串表示该 pattern 没有明确的反义组合。

## 8.5 rewrite-examples.json

用于 Simple English Rewrite 页面。

```json
[
  {
    "original": "The system encountered an unexpected error during initialization.",
    "simple": "The system had a problem when it started.",
    "why": "It replaces difficult words with basic words.",
    "keyWords": ["system", "have", "problem", "start"]
  },
  {
    "original": "Please confirm whether you require additional assistance.",
    "simple": "Please tell me if you need more help.",
    "why": "It uses common words instead of formal words.",
    "keyWords": ["tell", "need", "more", "help"]
  }
]
```

## 9. 组件设计

推荐组件：

```text
components/
  Header.tsx
  Footer.tsx
  Layout.tsx
  ModuleCard.tsx
  WordCard.tsx
  WordGrid.tsx
  PatternCard.tsx
  RewriteExampleCard.tsx
  SectionTitle.tsx
```

### 9.1 Header.tsx

职责：

- 展示 Logo
- 展示主导航
- 高亮当前页面

### 9.2 Footer.tsx

职责：

- 展示产品说明
- 展示基础链接
- 展示版权信息

### 9.3 WordCard.tsx

职责：

- 展示单词
- 展示中文意思
- 展示例句
- 展示标签

### 9.4 PatternCard.tsx

职责：

- 展示万能词
- 展示核心意思
- 展示 patterns
- 展示 examples

### 9.5 RewriteExampleCard.tsx

职责：

- 展示复杂英文
- 展示简单英文
- 展示解释
- 展示 key words

## 10. 推荐技术方案

第一版推荐：

```text
Vite + React + TypeScript + Tailwind CSS + Next.js（可以直接部署到vercel中）
```

可选：

```text
shadcn/ui
lucide-react
Motion
lottie
Animate.js---一些动态动画
```

第一版不需要：

```text
数据库
后端 API
用户系统
复杂状态管理
```

## 11. 视觉风格

整体风格：

- 清爽
- 教育感
- 工具感
- 不幼稚
- 不像传统背单词 App
- 更像一个“英语表达系统”

建议关键词：

```text
minimal
calm
structured
friendly
clear
```

页面观感：

- 大标题清晰
- 卡片布局
- 留白充足
- 重点词突出
- 不堆太多颜色
- 不使用复杂背景

## 12. 第一版验收标准

第一版完成后，必须满足：

1. 有 Landing Page。
2. 有共用 Header。
3. 有共用 Footer。
4. Header 可以进入 4 个核心模块。
5. 有 850 Words 页面。
6. 有 Daily 10 Words 页面。
7. 有 Power Patterns 页面。
8. 有 Simple English Rewrite 页面。
9. 页面内容来自 JSON 文件。
10. 组件中不直接硬编码大量词表数据。
11. 不需要登录。
12. 不需要数据库。
13. 不需要用户学习状态。
14. 不需要真实 AI 改写接口。
15. 页面在桌面端和移动端都能正常阅读。

## 14. 核心原则

第一版最重要的原则：

> 内容先跑通，结构先跑通，不要一开始做复杂系统。

技术原则：

> JSON 驱动内容，React 负责展示，暂时不要数据库。

产品原则：

> 不做“背 850 个词”，而是做“用 850 个词表达世界”。

