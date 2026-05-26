# 批量补充 JSON 数据中缺失的中文翻译教程

## 背景

在 `basic-850.json` 中，每个单词有 `patterns`（搭配词组）和对应的 `patternZh`（中文翻译）字段。某些情况下 `patternZh` 大量缺失（本例中 850 个单词共缺失 2137 条），需要批量补全。

---

## 完整步骤

### 第一步：定位缺失数据

写一个脚本来扫描 JSON，找出所有 `patternZh` 为空或缺失的位置。

**核心思路：** 遍历每个单词的 `patterns` 数组，检查同位置的 `patternZh` 是否存在且非空。

```js
// 伪代码逻辑
for (item of data) {
  for (let i = 0; i < item.patterns.length; i++) {
    const zh = item.patternZh[i];  // 可能 undefined
    if (!zh || zh.trim() === '') {
      // 这条 pattern 缺少中文翻译
    }
  }
}
```

得到结果后，确认总缺失量（本例 2137 条），以便评估工作量。

---

### 第二步：建立翻译映射

创建一个翻译字典，key 用 `"单词||词组"` 的复合格式确保唯一性，value 是中文翻译：

```js
const T = {
  "put||put on": "穿上；戴上",
  "put||put off": "推迟",
  "good||good example": "好例子",
  // ...
};
```

为什么要用 `"单词||词组"` 而不是直接用词组本身？因为同一个词组可能出现在不同单词下（比如 `"first place"` 在 `"first"` 和 `"place"` 下都有），翻译可能不同。

---

### 第三步：编写应用脚本

核心逻辑：读取 JSON → 遍历每个单词的 patterns → 查翻译字典 → 写入 patternZh → 保存 JSON。

```js
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('basic-850.json', 'utf-8'));
const T = { /* 翻译映射 */ };

let count = 0;
for (const item of data) {
  if (!item.patterns) continue;
  for (let i = 0; i < item.patterns.length; i++) {
    const key = `${item.word}||${item.patterns[i]}`;
    if (T[key]) {
      // 确保 patternZh 数组长度足够
      while (item.patternZh.length <= i) item.patternZh.push('');
      // 只在空位写入，不覆盖已有翻译
      if (!item.patternZh[i] || item.patternZh[i].trim() === '') {
        item.patternZh[i] = T[key];
        count++;
      }
    }
  }
}

fs.writeFileSync('basic-850.json', JSON.stringify(data, null, 2) + '\n', 'utf-8');
console.log(`已应用 ${count} 条翻译`);
```

几个关键点：
- **`while` 循环扩展数组：** 确保 `patternZh` 长度至少等于 `patterns`，防止下标越界
- **只填空位：** 已有翻译的不覆盖，避免误操作
- **保持 JSON 格式化：** `JSON.stringify(data, null, 2)` 保留可读性

---

### 第四步：验证完整性

再跑一遍第一步的检查脚本，确认缺失数归零：

```bash
node check-missing.js
# 输出: ✅ 验证通过！所有 850 个单词的中文映射完整，无缺失项。
```

---

## 为什么不调用翻译 API？

这种场景下用 AI 模型自身能力翻译比调用外部 API 更好：

| 对比 | 调用翻译 API | AI 直接翻译 |
|------|-------------|------------|
| 速度 | 2137 次 HTTP 请求，几分钟 | 一次写入，几秒完成 |
| 费用 | 按字符计费 | 0 额外费用 |
| 隐私 | 数据出本地 | 完全本地 |

但需要注意，AI 生成的翻译需要人工 review 以保证质量，特别是多义词和术语。

---

## 推广到其他场景

这套方法不只适用于翻译，任何 JSON 数据的批量填充都可以用：

1. **检查缺失** — 扫描数据，定位空洞
2. **生成映射** — 借助 AI 能力批量生成填充内容
3. **脚本写入** — 自动化回写到数据文件
4. **验证** — 确认无遗漏

对于更大规模的数据（比如上万条），可以分批次生成映射字典，每次处理几百条，逐步累加。
