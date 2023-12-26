import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;
const credentials = {
  host: process.env.SQL_HOST,
  database: "dev",
  user: process.env.SQL_USER_NAME,
  password: process.env.SQL_USER_PASSWORD,
  port: 4566,
  ssl: true,
};

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

const create_source = async () => {
  const create_walk_query = `CREATE TABLE walk(distance INT, duration INT)`;
  const create_temperatures_query = `CREATE TABLE temperature(ts bigint, device_id VARCHAR, temperature FLOAT)`;
  const create_locations_query = `CREATE TABLE location(ts bigint, device_id VARCHAR, location VARCHAR)`;
  const pool = new Pool(credentials);
  const res = await pool.query(create_locations_query);
  console.log(res);
  await pool.end();
}
// create_source().catch(console.error); // CALL

const create_materialized_view = async () => {
  const create_mv_query = `CREATE MATERIALIZED VIEW counter
  AS SELECT
  SUM(distance) as total_distance,
  SUM(duration) as total_duration
  FROM walk`;
  const pool = new Pool(credentials);
  const res = await pool.query(create_mv_query);
  console.log(res);
  await pool.end();
}
// create_materialized_view().catch(console.error); // CALL

const query_materialized_view = async () => {
  const pool = new Pool(credentials);
  const res = await pool.query("SELECT * from counter;");
  console.log(res.rows);
  await pool.end();
}
// query_materialized_view().catch(console.error); // CALL

const query_source = async () => {
  const pool = new Pool(credentials);
  for (let i = 0; i < 1000; i++) {
    const res = await pool.query("SELECT * FROM temperature WHERE device_id = '1_ccd6a4f3-5e28-4ecf-90c8-5643a8a7bd8a';;");
    console.log(i, res.rows);
  }
}
// query_source().catch(console.error); // CALL

const populate_source = async () => {
  const pool = new Pool(credentials);
  const COUNTER = 1000 * 100;
  const { rows } = await pool.query(`SELECT COUNT(*) AS document_count FROM temperature`);
  const { document_count } = rows[0] || {};
  const random_number = () => Math.floor(Math.random() * 15);
  let count = parseInt(document_count);
  while (count++ < COUNTER) {
    // console.time('myCodeExecution');
    const dev_id = generateUniqueID();
    const insert_temperature_query = `
      INSERT INTO temperature (ts, device_id, temperature)
      VALUES (${Date.now()}, '${dev_id}', ${random_number().toFixed(2)})
    `;
    await pool.query(insert_temperature_query);
    console.log(`document counter: ${count}`, dev_id);
    // console.timeEnd('myCodeExecution');
    // await new Promise((resolve) => setTimeout(resolve, 500));
  }
  await pool.end();
}
// populate_source().catch(console.error); // CALL