import v8 from 'v8';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const getObjectSize = (obj) => {
  const sizeInBytes = v8.serialize(obj).length;
  return sizeInBytes;
}

const generateRandomTimestamp = () => {
  const randomOffset = Math.floor(Math.random() * 7500);
  const randomMilliseconds = Math.floor(Math.random() * 1000); // Generating random milliseconds
  const randomTimestamp = Date.now() + randomOffset;
  const timestampWithMilliseconds = new Date(randomTimestamp + randomMilliseconds).toISOString().slice(0, 23).replace('T', ' ');
  return timestampWithMilliseconds;
};

const ingest_json_data = async () => {
  const random_number = () => Math.floor(Math.random() * 15);
  const COUNTER = 1000 * 1000;

  const parsedTemperatureData = [];
  for (let count = 1; count <= COUNTER; count++) {
    const random_packet = {
      ts: generateRandomTimestamp(),
      device_id: uuidv4(),
      temperature: random_number().toFixed(2),
    }
    parsedTemperatureData.push(random_packet);
    console.log(count, 'COUNT');
  }

  console.info(getObjectSize(parsedTemperatureData), 'bytes');

  fs.writeFile('tmp_data_1M-5.json', JSON.stringify(parsedTemperatureData), (error) => {
    if (error) console.error(error);
    else console.info(`Length After: ${parsedTemperatureData.length}`);
  });
}
ingest_json_data();

// for (let i = 0; i < 1000; i++) {
//   document.querySelector('#ahmed-id').click();
// }

// curl -u ahmed@mongrov.com:e6ga6euVjciwXT9r -k http://localhost:5080/api/default/default/_json -d "@tmp_data_100k.json"