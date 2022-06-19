# This python scripts reads in from a csv and makes a post request to add it to our backend
import requests
import json
import pandas

data = pandas.read_csv('challenge_source_data.csv')
data_len = len(data)

def send_data(payload, i, data_len):
    r = requests.post('http://localhost:8000/add-powerline/', data=json.dumps(payload), headers={'content-type':'application/json'})
    if r.status_code != 200:
        exit(1)
    else:
        print(f'Sent powerline ({i+1}/{data_len}) - {round(((i+1)/data_len)*100, 1)}%')
    return

for i in range(data_len):
    payload = dict()
    payload['geometry'] = eval(data.loc[i, 'geometry'])
    payload['wear'] = data.loc[i, 'wear']
    payload['weather'] = data.loc[i, 'weather']
    payload['vegetation'] = data.loc[i, 'vegetation']
    payload['name'] = data.loc[i, 'names']
    send_data(payload, i, data_len)


# r = requests.get('http://localhost:8000/powerlines/')
# print(r)
# print(r.text)