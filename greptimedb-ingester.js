import Greptime from 'greptime'
import { v4 as uuidv4 } from 'uuid';

let { sql } = Greptime({
  host: 'http://localhost:5000',
  dbname: 'public',
  username: '',
  password: '',
})

// const main = async () => {
  // const tableSchema = {
    // timeIndex: 'ts',
    // tags: ['tag1', 'tag2'],
    // fields: ['temperature', 'humidity'],
  // }
  // await sql.createTable('test_table', tableSchema)

  // const testTable = await sql.descTable('test_table')
  // console.log(testTable)

  // const valuesToInsert = [Date.now(), 'sodium_test3', 'ahmed_test3', 24.50, 46];
  // const addSQL = await sql.insert('test_table', valuesToInsert)
  // console.log(addSQL)

  // const demoSQL = await sql.select('*').from('test_table').limit(100).orderBy('ts', 'ASC').query()
  // console.log(demoSQL)

  // const demoPromQL = await promQL.query('test_table').start('2024-01-01 00:00').end('2024-06-06 00:00').run()
  // console.log(demoPromQL)
// }
// main()

const insertTemp = async () => {
  const randomAssetId = `fridge${Math.floor(Math.random() * 4) + 1}`;
  const randomTemp = Math.floor(Math.random() * 40);
  const randomHumidity = Math.floor(randomTemp + (randomTemp / 5));
  
  const valuesToInsert = [Date.now(), uuidv4(), randomAssetId, randomTemp, randomHumidity];
  console.log('Values to insert:', valuesToInsert); // Debugging: Print values to insert
  await sql.insert('temperature_table', valuesToInsert);
  await new Promise((resolve) => setTimeout(resolve, 900));
};

while (true) {
  await insertTemp();
}
