# Daily 翻卡页 — 动画方案

> 基于 Variant G（Ghibli 动画 × Adaline 设计系统）的最终决策

## 技术栈

- **framer-motion v12** — 已安装，零新增依赖
- 不需要 animate.js、不需要 Lottie

## 动画原则

### 1. 卡片入场（staggered entrance）

```
每个卡片初始状态: opacity: 0, y: 28px, rotate: -1.5deg
每个卡片目标状态: opacity: 1, y: 0, rotate: 0
过渡: spring (stiffness: 70, damping: 15, mass: 1.1)
错开: 90ms stagger 延迟
```

- 卡片依次从下方轻跃出现，伴随微旋转
- 如同翻开桌面上一叠卡片

### 2. 卡片翻转（3D flip）

```
perspective: 800px (设置在父容器上)
rotateY: 0 → 180 (翻到背面)
过渡: spring (stiffness: 110, damping: 16, mass: 1.1)
backfaceVisibility: hidden (正反面)
```

- 背面用 `rotateY(180deg)` 预设
- 弹簧硬度中等，有轻微过冲但不夸张

### 3. 悬浮微动（idle wobble）

```
whileHover: rotate: [0, -0.8deg, 0.8deg, 0]
过渡: 0.35s
```

- 鼠标悬浮时卡片有极轻微左右摇晃
- 像风吹过纸片 — 不可过于夸张

### 4. 背景氛围粒子（dust motes）

```
8 个半透明圆形元素，Forest Dew 色 (#d7e8b5)
大小: 2-6px 随机
浮动: y 轴往复 20-50px
周期: 5-11s 随机，easeInOut
初始位置、大小、延迟全部随机
```

- 极淡、不抢注意力
- 给画面提供"呼吸感"

### 5. 进度条（ink-wash）

```
背景: Stone Moss (#e0e5d5) 圆角轨道
填充: Valley Green (#203b14)
过渡: 0.7s ease-out (非弹簧)
```

- 每次翻卡进度条平滑推进
- 右侧 Fragment Mono 数字计数

### 6. Shuffle 按钮

```
圆角: 20px (Adaline pill 风格)
边框: Stone Moss (#e0e5d5)
hover: 边框变为 Valley Green，文字变为 Valley Green
过渡: transition-colors (CSS)
```

## 设计系统映射

| Adaline Token | 用法 | 值 |
|---|---|---|
| `--color-canvas-ice` | 页面背景、卡片背景 | `#fbfdf6` |
| `--color-adaline-ink` | 主文字、标题 | `#0a1d08` |
| `--color-mist-gray` | 卡片边框 | `#c5ccb6` |
| `--color-valley-green` | 强调色、进度条、翻转边框 | `#203b14` |
| `--color-stone-moss` | 进度条轨道、次要分隔线 | `#e0e5d5` |
| `--color-forest-dew` | 已读标签背景、氛围粒子 | `#d7e8b5` |
| `--shadow-subtle` | 卡片阴影 | `rgba(99, 143, 61, 0.1) 0px 0px 0px 1px` |
| `--font-akkurat` | 标题、正文（tracking: -0.04em） | — |
| `--font-fragmentmono` | 标签、进度计数（tracking: 0.02em） | — |

## 卡片正反面结构

### 正面（Front）
```
[大号单词] — 30px bold, uppercase, -0.04em tracking
[tap me] — 12px, adaline-ink/35
```

### 背面（Back）
```
[单词] — 20px bold, uppercase         [seen 标签]
[中文释义] — 14px, adaline-ink/75
[例句] — 带 Forest Dew/30 背景
[翻译] — 12px, adaline-ink/65
[tap back] — 12px, adaline-ink/45, 右下角
```

## 实现方式 — 手术式修改，不动结构

### 修改范围（仅 3 处手术式修改）

**注意：不动 layout、不动页面整体结构、不动 shuffle 逻辑、不动 Header/Footer。**

现有 `src/app/daily/page.tsx` 要改的只有：

1. **卡片翻转** — 把当前 `{flipped ? <背面/> : <正面/>}` 条件渲染替换为 framer-motion 3D flip
   - 卡片外层 `<button>` 保留，`className` 和 `aria-*` 属性保留
   - 内部用 `<motion.div style={{ transformStyle: "preserve-3d" }} animate={{ rotateY }}>` 包裹正反面
   - 正反面 div 加 `style={{ backfaceVisibility: "hidden" }}`，背面加 `transform: "rotateY(180deg)"`
   - 给卡片 button 加 `whileHover` 实现 wobble
2. **进度条** — 给 Progress aside 里的进度条改成 `<motion.div animate={{ width }}>`
   - aside 区域结构完全不动，只把内部的静态文字替换为带动画的条形
3. **背景粒子** — 在 `<main>` 内部首个子元素位置添加一个 `pointer-events-none absolute` 的 dust motes 容器

### 不改的（保持原样）
- ✅ Header / Footer / Layout 完全不动
- ✅ Shuffle 按钮和 `pickRandomWords` 逻辑完全不动
- ✅ `flippedWords` 的 `useState` / `toggleWord` / `knownCount` 逻辑完全不动
- ✅ 页面 2 栏布局（`lg:grid-cols-[1fr_280px]`）完全不动
- ✅ 卡片网格（`sm:grid-cols-2 lg:grid-cols-5`）完全不动
- ✅ aside 进度区域的结构和文案完全不动

## 原型参考

- 在线原型: `/prototype/animations` → Variant G
- 独立 HTML: `/docs/prototype/daily-animations.html`（含全部 6 种风格以供参考配色）
