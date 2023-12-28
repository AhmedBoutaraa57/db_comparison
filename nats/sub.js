import { StringCodec, connect } from 'nats';

const main = async () => {
  const nc = await connect({
    servers: ['connect.ngs.global:4222'],
  })
  console.info('Connected to NATS as SUB...');

  const sub = nc.subscribe('/hello');
  const stringCodec = StringCodec();
  for await (const message of sub) {
    console.info(`[${sub.getProcessed()}]: ${stringCodec.decode(message.data)}`);
  }
  console.info('subscription closed..');
}

main();

/**
  CREATE TABLE temp_source (ts bigint, device_id VARCHAR, temperature FLOAT, PRIMARY KEY (ts, device_id))
  WITH (
    connector='nats',
    server_url='nats-server:4222',
    subject='HI.WORLD',
    stream='sodium',
    connect_mode='plain'
  ) FORMAT PLAIN ENCODE JSON;
  
  CREATE MATERIALIZED VIEW temp_summary AS SELECT device_id,
      MIN(temperature) AS min_temperature,
      MAX(temperature) AS max_temperature,
      AVG(temperature) AS avg_temperature
  FROM temp_source GROUP BY device_id;
*/

// CREATE USER sodiumreader WITH PASSWORD 'password';
// GRANT SELECT ON MATERIALIZED VIEW temp_min_max_avg TO sodiumreader;

// sudo apt install mosquitto
// sudo apt install mosquitto-clients

// docker pull nats:latest
// docker run -it --rm --name=nats-server -v $(pwd)/mqtt:/home/mqtt -p 4222:4222 -p 1884:1884 nats:latest -c /home/mqtt/conf/standalone.conf

// docker run -it --rm --name=grafana -v $(pwd)/certs:/home/certs -p 3000:3000 grafana/grafana-oss

// Genrate certs for Risingwave connection
// cd /usr/local/share/ca-certificates

// nats sub HI.WORLD
// nats pub HI.WORLD "{\"ts\": 1703771946391, \"device_id\": \"dev-id-77\", \"temperature\": 78.456}"
// nats pub HI.WORLD "{\"ts\": 1693844487326, \"device_id\": \"dev-id-88\", \"temperature\": 123.456}"
// mosquitto_pub -h 0.0.0.0 -p 1884 -t HI/WORLD -m "{\"ts\": 1703844487326, \"device_id\": \"dev-id-88\", \"temperature\": 123.456}"
