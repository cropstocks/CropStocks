import json
res = json.load(open('all_questions.json', encoding='utf-8'))
with open('list.txt', 'w', encoding='utf-8') as f:
    for i, q in enumerate(res):
        f.write(f'{i}: {q["title"][:50]} (Type {q["type"]})\n')
