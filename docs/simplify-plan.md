# Simplify 功能实现

## 架构

```
浏览器输入 ──POST──> /api/simplify ──> simplify() 核心逻辑 ──> 返回简化结果
```

## 文件结构

```
src/
├── app/api/simplify/route.ts       ← POST API 路由
├── lib/simplify/
│   ├── index.ts                    ← 简化核心逻辑
│   └── patterns.ts                 ← retext-simplify 的 327 条词映射（自动生成）
└── data/
    └── complex-to-simple.json      ← 未使用，直接用 retext-simplify 内置映射
```

## 实现方式

### 词替换
- 使用 `retext-simplify` 库检测复杂词 → 给出简单词建议
- 配合内置 327 条词映射表做精确替换 + 词干回退
- 多词短语（如 "in accordance with", "a number of"）优先替换
- 词干回退处理变形：encountered → encounter → meet, implementation → implement → carry out

### 句子拆分
- 遇到 `because/although/unless/whereas` 引导的从句 → 断开为独立句子
- 遇到 `which/that` 引导的长从句 → 拆分为短句

### 时态保留
- 原词 -ing → 替换词 +ing
- 原词 -ed → 替换词 +ed

### 850 词优选
- 当 retext-simplify 给出多个建议时，优先选在 850 词汇表内的词

## API

```
POST /api/simplify
Body: { text: "The system encountered an unexpected error during initialization." }
返回: {
  original: "...",
  simplified: "...",
  changes: [{ from: "encountered", to: "meet" }, ...]
}
```

## 构建
- `npm run build:patterns` — 从 retext-simplify 提取映射表
- `npm run dev` — 开发模式
- `npm run build` — 生产构建
