
let counter = 0;
let lastTimestamp = 0;
const generateUniqueID = () => {
  const timestamp = Date.now();
  if (timestamp !== lastTimestamp) {
    lastTimestamp = timestamp;
    counter = 0;
  } else {
    counter = (counter + 1) % 1000; // Reset counter every 1000 to avoid overflow
  }
  const paddedCounter = counter.toString().padStart(3, '0');
  const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Add some randomness
  return `${timestamp}${paddedCounter}${randomPart}`;
};

const getRandomTemperature = () => (Math.random() * 100).toFixed(2);

const generateRandomTimestamp = () => {
  const randomOffset = Math.floor(Math.random() * 7500);
  const randomMilliseconds = Math.floor(Math.random() * 1000); // Generating random milliseconds
  const randomTimestamp = Date.now() + randomOffset;
  const timestampWithMilliseconds = new Date(randomTimestamp + randomMilliseconds).toISOString().slice(0, 23).replace('T', ' ');
  return timestampWithMilliseconds;
};

const generateInsertCommand = (n) => {
  const values = Array.from({ length: n }, (_, index) => {
    const deviceId = generateUniqueID();
    const timestamp = generateRandomTimestamp();
    const temperature = getRandomTemperature();
    return `('${deviceId}', '${timestamp}', ${temperature})`;
  });

  return `INSERT INTO temperature (device_id, ts, temperature) VALUES ${values.join(',')};`;
}

for (let count = 0; count < 99; count++) {
  console.info(`exuction number: ${count}`);
  const queryString = generateInsertCommand(10000);
  const MYSQLConsole = document.querySelector('.cm-content');
  MYSQLConsole.textContent = queryString;
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  const runAllQueryBtn = document.querySelector('#ahmed-id'); // Adjust the button index as needed
  runAllQueryBtn.click();
  
  await new Promise((resolve) => setTimeout(resolve, 12000));
}

// fs.writeFile('tmp_data.json', JSON.stringify(queryString), (error) => {
//   if (error) console.error(error);
//   else console.info(`query sucess:: ${queryString}`);
// });