run the following commands to setup RisingWave + NATS + Grafana

- 1 Clone the Risingwave repo
  ```
  git clone https://github.com/risingwavelabs/risingwave.git
  ```
- 2 Navigate to the docker directory
  ```
  cd /<your-base-dir>/risingwave/docker
  ```
- 3 Then under `<your-base-dir>/risingwave/docker` create a folder named `mqtt` > with a file inside named `standalone.conf` and put the following content inside
  ```
  server_name: sodium_mqtt
  mqtt {
    listen: "0.0.0.0:1884"
  }
  
  jetstream {
    enabled: true
  }
  ```

- 4 Edit and run the docker-compose file
- **Note:**  and before you move on please make sure you have **Docker-Desktop** in your environment running before launching the cluster. 
  for more info checkout the source here for: [risingwave-docker-compose](https://docs.risingwave.com/docs/current/risingwave-docker-compose/)
  
  open the file `<your-base-dir>/risingwave/docker/docker-compose.yml` and put the following inside
  ```
  nats-server:
    image: nats:latest
    container_name: nats-server
    volumes:
      - ./mqtt:/home/mqtt
    ports:
      - "4222:4222"
      - "1884:1884"
    command: -c /home/mqtt/standalone.conf
  ```

  and the from `<your-base-dir>/risingwave/docker>` run the following:
  ```
  docker compose up -d
  ```

- 5 create the source table and materialized view and make sure you have [psql](https://docs.risingwave.com/docs/current/install-psql-without-postgresql/) installed
  ```
  psql -h localhost -p 4566 -d dev -U root
  ```
  for the source table run:
  ```
  CREATE TABLE temp_source (ts bigint, device_id VARCHAR, temperature FLOAT, PRIMARY KEY (ts, device_id))
  WITH (
    connector='nats',
    server_url='nats-server:4222',
    subject='HI.WORLD',
    stream='sodium',
    connect_mode='plain'
  ) FORMAT PLAIN ENCODE JSON;
  ```
  for the materialized view run:
  ```
  CREATE MATERIALIZED VIEW temp_summary AS SELECT device_id,
    MIN(temperature) AS min_temperature,
    MAX(temperature) AS max_temperature,
    AVG(temperature) AS avg_temperature
  FROM temp_source GROUP BY device_id;
  ```

- 6 last but now least make sure you have the mosquitto-client OR nats-cli installed and you can run the following to test that everything works:
  ```
  nats pub HI.WORLD "{\"ts\": 1693844487326, \"device_id\": \"dev-id-78\", \"temperature\": 93.45}"
  mosquitto_pub -h 0.0.0.0 -p 1884 -t HI/WORLD -m "{\"ts\": 1703844487326, \"device_id\": \"dev-id-88\", \"temperature\": 123.56}"
  ```
- OR use [mqtt-simulator](https://github.com/DamascenoRafael/mqtt-simulator) with the following configuration under `<your-base-dir>/mqtt-simulator/config/settings.json`:
   
  ```
  {
      "BROKER_URL": "0.0.0.0",
      "BROKER_PORT": 1884,
      "TOPICS": [
          {
              "TYPE":"list",
              "PREFIX": "HI",
              "LIST": ["WORLD"],
              "TIME_INTERVAL": 0.5,
              "DATA": [
                  {
                      "NAME": "temperature",
                      "TYPE": "float",
                      "MIN_VALUE": 20,
                      "MAX_VALUE": 180,
                      "MAX_STEP": 15,
                      "RETAIN_PROBABILITY": 0
                  },
                  {
                      "NAME": "ts",
                      "TYPE": "int",
                      "MIN_VALUE": 1703875253910,
                      "MAX_VALUE": 1745075523910,
                      "MAX_STEP": 3,
                      "RETAIN_PROBABILITY": 0,
                      "INCREASE_PROBABILITY": 1
                  },
                  {
                      "NAME": "device_id",
                      "TYPE": "int",
                      "INITIAL_VALUE": 1,
                      "MIN_VALUE": 10,
                      "MAX_VALUE": 50,
                      "MAX_STEP": 29,
                      "RETAIN_PROBABILITY": 0
                  }
              ]
          }
      ]
  }
  ```

- RisingWave Dashboard
  - Access the RisingWave Dashboard at http://127.0.0.1:5691/. RisingWave Dashboard displays an overview of the cluster, as well as sources, sinks, tables, materialized views, and indexes available on the cluster.

- Grafana
  - Access Grafana at http://127.0.0.1:3001/ and search for risingwave_dashboard. In this dashboard, you can view the internal metrics such as node count, memory consumption, throughput, and latencies. You can use these metrics to troubleshoot and optimize the cluster performance.

- MinIO
  - Access the MinIO instance at http://127.0.0.1:9400/. Use the following credentials to log in.
    - User name: hummockadmin
    - Password: hummockadmin

- Prometheus
  - Access Prometheus at http://127.0.0.1:9500/. No credentials are needed. You can use Prometheus for real-time alerting.

- Grafana Intergarion with Risingwave
  - ![Grafana Intergarion with Risingwave](https://i.ibb.co/9WyKS6n/Screenshot-from-2023-12-29-16-39-10.png)
