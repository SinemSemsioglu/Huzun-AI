import sys
import json
import os

req_id = sys.argv[1]
dirname = os.path.dirname(__file__)

def main():
    with open(os.path.join(dirname, 'data/sample.json'), 'r') as f:
        data = json.load(f)
        f.close()

    with open(os.path.join(dirname, 'generated/' + req_id + '.json'), 'w+') as f:
        resp = dict()
        numItems = len(data['submitted'])
        resp['num_items'] = numItems
        resp['req_id'] = req_id

        if numItems == 0:
            resp['last_added'] = 'no item added yet'
        else:
            resp['last_added'] = data['submitted'][-1]

        json.dump(resp, f, ensure_ascii=False, indent=4)
        f.close()

main()
