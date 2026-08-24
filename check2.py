import json
data = json.load(open('all_questions.json', encoding='utf-8'))
for q in data[51:77]:
    if '?????' in q['title']:
        print(q['title'])
