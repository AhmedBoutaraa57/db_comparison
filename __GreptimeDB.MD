### GreptimeDB Report:

  - ##### Supports storing data in local file system, AWS S3 and compatible services
  - ##### At the moment the product is Still in the technical preview phase and all use is currently free and detailed pricing plan will be available around the end of January with dedicated version or BYOC(Bring Your Own Cloud) deployment
  - ##### Some details from "Sun Ning(CTO of Greptime)" message: `Recently we just collaborate with a Electronic Vehicle manufacture to help them store time-series data in car and on cloud. In that scenario, we compressed to 30% of its original size with restricted resources (less 10% average cpu usage).`
  - ##### client libraries to Query the data through SQL: Java, Go
  
  - Cluster Info:
    - (Compute node, Frontend node, Meta node) Currently the cloud version does not publicize the load of frontend datanode and metasrv. This is because the cloud version shares these resources.

  - Stream Input(data.json):
    - 100K => 10.5MB
    - 1M   => 105MB
    - 5M   => 526MB
  
  - GreptimeDB Cloud Database/Object Storage:
    - 100k => 4.5MB after compaction => 3.65MB
    - 1M   => 49MB after compaction => 25MB
    - 5M   => 99MB after compaction => 99MB

  - Local FileSystem Storage:
    - 100k => 6MB
    - 1M   => 64MB  | 32MB(second try)
    - 5M   => 189MB | 155MB(second try)

  - Memory/localhost(32GB total/20GB free | DDR4 | Speed: 2667 MT/s | 1.2 Voltage):
    - 100k => 126MB(0.4% of 32GB)
    - 1M   => 412MB(1.3% of 32GB)
    - 5M   => 761MB(2.4% of 32GB)

  - CPU Spikes:
    - 100k => on read 20% on write 31%
    - 1M   => on read 77% on write 100%
    - 5M   => on read 96% on write 100%

  - Cloud/Local Query ResponseTime (SELECT * FROM temperature WHERE device_id = 'ID'):
    - 100k document -> 280ms/60ms
    - 1M document   -> 3.5s/350ms
    - 5M document   -> 2.5s/430ms

  - GreptimeDB Cloud WCU/RCU:
    - 200K
      - WCU == 528
      - RCU == 8924
    - 500k
      - WCU == 528
      - RCU == 34841
    - 1M
      - WCU == 528
      - RCU == 69500

  - My CPU Info:
    - CPU(s): 16
    - Intel(R) Core(TM) i9-9980HK CPU @ 2.40GHz
    - CPU family:          6
    - Model:               158
    - Thread(s) per core:  2
    - Core(s) per socket:  8
    - Socket(s):           1
    - Stepping:            13
    - CPU max MHz:         5000.0000
    - CPU min MHz:         800.0000
    - BogoMIPS:            4800.00

  - storage-location:
    - https://docs.greptime.com/user-guide/concepts/storage-location


Email I Got From Greptime:
--------------------------------------------------------------------------------------------------------------------
I hope this email finds you well. As we discussed on slack, you shared us workload and metrics you care about.
Workload:
- Time series dataset (ts, device_id, temperature)
- Time series location dataset (ts, device_id, location)

Metrics:
- Data size of the db after (100K, 1M, 5M) data points
- Query the end point for both data and see cpu spike and query response time
- know if they can scale well

In GreptimeDB, we store time-series data in compressed data format on s3-like object store. The format is optimised for time-series data.
We helped one of our client to compress data to 30% of original size with very restricted cpu/memory usage. And the storage cost on cloud
infrastructure can be very low (10x) thanks to object store. We fully leverage compute-storage separated architecture so it's possible to scale storage or query engine individually, as your data or query load grows.

Regarding the metrics and our collaboration, I have a few questions for you:
  - 1. For the second metric, do you mean "latest data point" for "end point"? We use LSM-Tree based storage engine so the latest point are typically in memory.
  - 3. What will be Mongrov's deployment model for your clients, hosted service or on-premise? And what will be your preferred model for GreptimeDB?
  - 4. You mentioned you have a few clients in queue. May I know your preferred business model if we worked together to deliver this streaming platform + time-series database solution? For example, will your client sign with us?
  - 5. From the metrics,I believe you want
    - 1) low storage cost
    - 2) good query performance
    - 3) scalability. Do you have any other aspect you care most about? Are you comparing any other TSDBs with GreptimeDB?
  - 6. In what process and when will you make the decision of TSDB for your project?

Also I want to share related items in our 2024 roadmap with you:
1. In January, we will be launching our dedicated version of GreptimeDB on GreptimeCloud. As our early adopter, our engineer can work with you to test out best configuration of GreptimeDB for you workload.
2. We have advanced geolocation data type planned for this year although it's already possible to store them as floats. Let us know if you have advanced query based on geolocation data.
--------------------------------------------------------------------------------------------------------------------