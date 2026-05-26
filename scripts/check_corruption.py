import json
words = json.load(open('src/data/basic-850.json', 'r', encoding='utf-8'))

corrupt = []
for i, w in enumerate(words):
    zh_list = w.get('patternZh', [])
    for j, t in enumerate(zh_list):
        if '�' in t:
            corrupt.append((i, w['word'], w['patterns'][j] if j < len(w['patterns']) else '', t))
            break

print(f'Corrupted entries: {len(corrupt)}')
for i, word, pat, bad in corrupt[:30]:
    print(f'  [{i}] {word} | {pat} -> BAD: {repr(bad)}')
