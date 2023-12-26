import 'dotenv/config';
import { InfluxDBClient, Point } from '@influxdata/influxdb3-client';

const TOKEN = process.env.MONGROV_INFLUX_TOKEN;
const HOST = process.env.MONGROV_HOST;
const DATABASE = process.env.MONGROV_INFLUX_DATABASE;

async function query_database() {
  const client = new InfluxDBClient({ host: HOST, token: TOKEN });
  console.info('influx_db connected...');

  const query = `
    SELECT * FROM "census"
    WHERE time >= now() - interval '1 hour'
    AND ("ants" IS NOT NULL OR "bees" IS NOT NULL)
  `;

  console.info(`${"ants".padEnd(5)}${"bees".padEnd(5)}${"location".padEnd(10)}${"time".padEnd(15)}`);
  for await (const row of client.query(query, DATABASE)) {
    let ants = row.ants || '';
    let bees = row.bees || '';
    let time = new Date(row.time);
    console.info(`${ants.toString().padEnd(5)}${bees.toString().padEnd(5)}${row.location.padEnd(10)}${time.toString().padEnd(15)}`);
  }

  client.close();
  console.info('influx_db connection closed!');
}

async function write_points() {
  const client = new InfluxDBClient({ host: HOST, token: TOKEN });
  console.info('influx_db connected...');

  const points = [
    Point.measurement("census").setTag("location", "Klamath").setIntegerField("bees", 23),
    Point.measurement("census").setTag("location", "Portland").setIntegerField("ants", 30),
    Point.measurement("census").setTag("location", "Klamath").setIntegerField("bees", 28),
    Point.measurement("census").setTag("location", "Portland").setIntegerField("ants", 32),
    Point.measurement("census").setTag("location", "Klamath").setIntegerField("bees", 29),
    Point.measurement("census").setTag("location", "Portland").setIntegerField("ants", 40)
  ];

  for (const point of points) {
    console.info(`writing point: ${point} ...`);
    await client.write(point, DATABASE);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  client.close();
  console.info('influx_db connection closed!');
}

async function main() {
  // await write_points();
  // await query_database();
}

main();
