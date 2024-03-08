import json
from datetime import datetime

def transform_json_to_microlab(json_message, delay):
    device_mac = json_message['device_info']['mac']
    formatted_json = json.dumps(json_message).replace('"', '""')
    now = int(datetime.now().timestamp() * 1000)
    microlab_string = f'microlab/cbeoffice/gws/{device_mac}/raw,"{formatted_json}",0,False,{now}.0122285,{delay}'
    return microlab_string

def process_log_file(input_path, output_path, delay):
    with open(input_path, 'r') as input_file, open(output_path, 'w') as output_file:
        for i, line in enumerate(input_file, start=1):
            json_message = json.loads(line)
            microlab_output = transform_json_to_microlab(json_message, delay)
            output_file.write(microlab_output + '\n')

INPUT_PATH = 'care.log'
OUTPUT_PATH = 'care_out.log'
DELAY_BETWEEN_MESSAGES = 0.1

print('Processing started...')
process_log_file(INPUT_PATH, OUTPUT_PATH, DELAY_BETWEEN_MESSAGES)
print("Processing complete!")
