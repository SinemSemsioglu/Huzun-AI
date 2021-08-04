import sys
import os
import tensorflow as tf
import json

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['TF_XLA_FLAGS'] = '--tf_xla_enable_xla_devices'

dirname = os.path.dirname(__file__)
req_id = sys.argv[1]
def main():
    with open(os.path.join(dirname, 'generated/' + req_id + '.json'), 'w+', encoding='utf-8') as f:
        resp = dict()
        model_path = os.path.join(dirname, 'one_step')
        one_step_reloaded = tf.saved_model.load(model_path)
        states = None
        next_char = tf.constant([sys.argv[2]])
        result = [next_char]

        for n in range(int(sys.argv[3])):
              next_char, states = one_step_reloaded.generate_one_step(next_char, states=states)
              result.append(next_char)
        #resp["data"] = tf.strings.join(result)[0].numpy().decode("utf-8")
        #print(tf.strings.join(result)[0].numpy().decode("utf-8"))
        try:
            resp["data"] = str(tf.strings.join(result)[0].numpy().decode("utf-8"))
            print(resp)
            json.dump(resp, f)
        except Exception as e:
               print(str(e))
        # print(json.dumps(tf.strings.join(result)[0].numpy()))

        f.close()
main()



