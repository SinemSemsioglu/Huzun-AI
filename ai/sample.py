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
        numKeys = len(data)
        resp['num_keys'] = numKeys
        resp['req_id'] = req_id
        resp['last_added_text'] = data[list(data)[0]]
        json.dump(resp, f, ensure_ascii=False, indent=4)
        f.close()

main()
