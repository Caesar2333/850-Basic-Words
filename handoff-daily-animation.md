# Handoff: Daily 翻卡页动画方案

## ⚠️ 核心约束：不动页面结构

**Daily 页面的 layout、shuffle 逻辑、数据流、2 栏布局、卡片网格（sm:grid-cols-2 lg:grid-cols-5）、aside 区域全部保持原样。** 只做手术式动画注入，不改架构。

## 已做的工作

1. **原型制作**: 创建了 `/prototype/animations` 页面（7 个变体 A-G）
2. **方案筛选**: 最终选中 **Variant G — Ghibli 动画语言 × Adaline 设计系统配色**
3. **文档产出**:
   - `docs/daily-animation-plan.md` — 完整方案（含"实现方式—不动结构"说明）
   - `docs/prototype/daily-animations.html` — 独立 HTML 参考（配色 + CSS demo + 参数表）
   - `handoff-daily-animation.md` — 本文件

## 技术栈

- **framer-motion v12**（已安装），零新增依赖，不需要 animate.js/Lottie

## 最终选型参数

| 动画 | framer-motion 参数 |
|---|---|
| 卡片翻转 3D | `rotateY: 0→180`, spring stiffness:110, damping:16, mass:1.1, perspective:800 |
| 卡片 hover wobble | `rotate: [0, -0.8, 0.8, 0]`, duration: 0.35s |
| 卡片入场 stagger | spring stiffness:70, damping:15, mass:1.1, stagger: 90ms |
| 进度条 | width transition 0.7s cubic-bezier(0.25,0.46,0.45,0.94) |

## Adaline 配色（Tailwind v4 变量）

- `bg-canvas-ice` / `text-adaline-ink` / `border-mist-gray` / `text-valley-green`
- `bg-stone-moss`（进度条轨道） / `bg-forest-dew`（标签/粒子）
- 卡片圆角 `rounded-lg`(8px) / 按钮圆角 `rounded-[20px]`

## 对 `src/app/daily/page.tsx` 的修改（仅 3 处）

### 改动 1 — 卡片翻转（替换条件渲染）

当前代码（要替换的部分）:
```tsx
// 把这段条件渲染替换为 framer-motion 3D flip
{flipped ? (
  <span className="flex h-full flex-col..."> {/* 背面 */} </span>
) : (
  <span className="flex h-full flex-col..."> {/* 正面 */} </span>
)}
```

替换为:
```tsx
<motion.div
  className="size-full"
  animate={{ rotateY: flipped ? 180 : 0 }}
  transition={{ type: "spring", stiffness: 110, damping: 16, mass: 1.1 }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* 正面 — same existing front JSX but with backfaceVisibility:"hidden" */}
  <div style={{ backfaceVisibility: "hidden" }}>
    ...existing front JSX...
  </div>
  {/* 背面 — same existing back JSX but with backfaceVisibility:"hidden", transform:"rotateY(180deg)" */}
  <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
    ...existing back JSX...
  </div>
</motion.div>
```

⚠️ 注意：卡片外层 `<button>` 完全保留，`className`、`aria-label`、`onClick` 全部不动。
⚠️ 注意：在 button 上加 `whileHover={{ rotate: [0, -0.8, 0.8, 0] }}` 实现 wobble。
⚠️ 注意：button 的 `style={{ perspective: 800 }}` 需要保留。

### 改动 2 — 进度条动画

当前代码中的 aside 区域（结构完全不动，只把内部的计数数字替换为动画 bar）:
```tsx
<aside className="...">
  <p>Progress</p>
  <p>{knownCount} / 10</p>   {/* ← 替换为 */}
  <p>Words you've tapped to review.</p>
</aside>
```

替换为:
```tsx
<aside className="...">
  <p>Progress</p>
  <div className="h-1.5 rounded-full bg-stone-moss overflow-hidden">
    <motion.div
      className="h-full rounded-full bg-valley-green"
      animate={{ width: `${(knownCount / 10) * 100}%` }}
      transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }}
    />
  </div>
  <p className="mt-1 font-fragmentmono text-xs text-valley-green/50">{knownCount} / 10</p>
  <p>Words you've tapped to review.</p>
</aside>
```

### 改动 3 — 背景氛围粒子

在 `<main>` 的开头添加（绝对定位，不影响布局）:
```tsx
<main className="bg-canvas-ice relative">   {/* ← 加 relative */}
  {/* Dust motes */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute size-1 rounded-full bg-forest-dew/20"
        style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
        animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 5+Math.random()*6, repeat: Infinity, delay: Math.random()*4, ease: "easeInOut" }}
      />
    ))}
  </div>
  {/* existing content ... */}
```

## 不改的（保持 100% 原样）

- ✅ Header / Footer / Layout
- ✅ Shuffle 按钮和 `pickRandomWords()` 逻辑
- ✅ `flippedWords` 的 `useState` / `toggleWord` / `knownCount`
- ✅ 页面 2 栏网格布局（`lg:grid-cols-[1fr_280px]`）
- ✅ 卡片 5 列网格（`sm:grid-cols-2 lg:grid-cols-5`）
- ✅ aside 区域的文案和结构
- ✅ 所有 data types 和 imports

## 原型参考

- 开发服务器: `http://localhost:3000/prototype/animations`（← → 箭头切换变体）
- 看 **Variant G**（Ghibli Anims × Adaline Design）
- 独立 HTML 配色参考: `docs/prototype/daily-animations.html`

## 文件索引

| 文件 | 说明 |
|---|---|
| `src/app/prototype/animations/page.tsx` | 全部动画变体（选 Variant G） |
| `docs/daily-animation-plan.md` | 动画方案文档 |
| `docs/prototype/daily-animations.html` | 独立 HTML 配色+参数参考 |
| `src/app/daily/page.tsx` | 待修改的目标文件 |
