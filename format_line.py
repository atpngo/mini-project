import pandas
import pprint

data = pandas.read_csv('challenge_source_data.csv')
data_len = len(data)

line = eval(data.loc[44, 'geometry'])
coords = line['coordinates']
# pprint.pprint(coords)

final = []
for shape in coords:
    s = []
    for coord in shape:
        s.append(coord[::-1])
    final.append(s)

pprint.pprint(final)
seen = set()
output_string = ''
import pyperclip; pyperclip.copy(pprint.pformat(str(coords)))

print('-'*100)
# print(line['bbox'])