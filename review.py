import json

data = json.load(open('all_questions.json', encoding='utf-8'))

print("=== HINDI ===")
for i, q in enumerate(data[25:51]):
    print(f'HINDI Q{i}: {q["title"]}'.encode('unicode_escape').decode())
    if q.get('options') and q['options'][0]['opts']:
        for opt in q['options'][0]['opts']:
            print(f'  OPT: {str(opt).encode("unicode_escape").decode()}')

print("\n=== GUJARATI ===")
for i, q in enumerate(data[51:77]):
    print(f'GUJ Q{i}: {q["title"]}'.encode('unicode_escape').decode())
    if q.get('options') and q['options'][0]['opts']:
        for opt in q['options'][0]['opts']:
            print(f'  OPT: {str(opt).encode("unicode_escape").decode()}')
