import json

data = json.load(open('all_questions.json', encoding='utf-8'))
eng = data[1:25]
guj = data[51:77]

print('Eng:')
for i, q in enumerate(eng):
    print(f"  {i}: {q['title'][:30].encode('unicode_escape').decode()}")
    
print('Guj:')
for i, q in enumerate(guj):
    print(f"  {i}: {q['title'][:30].encode('unicode_escape').decode()}")
