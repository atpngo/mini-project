import requests



r = requests.get('http://localhost:8000/powerlines/?page=5')
print(r)

res = r.json()

print(res['count'])
print('-'*100)
print(res['next'])
print('-'*100)