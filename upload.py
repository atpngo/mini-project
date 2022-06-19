# This python scripts reads in from a csv and makes a post request to add it to our backend
import requests
import json

data = dict()

data['geometry'] = {'bbox': [-121.706038329478, 37.700539173403726, -121.70587308768884, 37.70058992865414], 'type': 'MultiLineString', 'coordinates': [[[-121.70587308768884, 37.70058992865414], [-121.70591438209864, 37.70058130395718], [-121.70597654029899, 37.700560605487354]], [[-121.70597654029899, 37.700560605487354], [-121.7060100332222, 37.70054945234938]], [[-121.7060100332222, 37.70054945234938], [-121.706038329478, 37.700539173403726]]]}
data['wear'] = 0.1
data['weather'] = 0.2
data['vegetation'] = 0.3
data['name'] = 'Test Name'

# print(data)


r = requests.post('http://localhost:8000/add-powerline/', data=json.dumps(data), headers={'content-type':'application/json'})
print(r)
print(r.text)

# r = requests.get('http://localhost:8000/powerlines/')
# print(r)
# print(r.text)