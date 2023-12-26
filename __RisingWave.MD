### RisingWave Report:

  - ##### is cloud-native and fully distributed and uses(AWS S3, Azure Object Store, etc..) and can scale horizontally. scale shouldn't be a concern!
  - ##### uses SQL databases and support Windowing, Watermarks and Temporal Filtering. and uses materialized views for consistency, persistence, and high concurrent query access, and is easy to use and intergarte with.
    - RisingWave materialized views the following important characteristics
      - Consistency & Real time (updated synchronously, ensuring users always have access to the most up-to-date results)
      - High availability & High concurrency, and Resource isolation.
  - ##### long term data retention, cost is not going to be high since data is stored an object store.
    - write amplification means Operations amplification, In other words, 10X(1MB will be stored as 10MB in RW) write amplification means 1 foreground write to storage will trigger 10 background writes to storage by taking compaction into consideration.
    - space amplification, when compaction resource is sufficient, it will be much smaller than write amplification, we can say that the write amplification is 5-10x and space amplification is 1.25 - 1.5X.
  - ##### Lateness: The duration between the message's arrival time and its materialization time. The typical lateness that RisingWave provides is 500ms-3s.
  - ##### there is also POC questionnaire that go over a few questions about scale, latency, throughput, etc.
    - POC questionnaire URL: https://forms.gle/TEuXN15SUpkNqgcP6
  - ##### client libraries to Query the data through SQL: Java, Node.js, Python, Go

  - **Use Cases:** `Stream processing, Data storage, Random querying, especially point queries.`
  - **Edge Cases:** `Transaction processing, Ad-hoc analytical queries that involve frequent full table scans`

  - Cluster Info:
    - Compute node: 1vCPU, 2 GB memory; x1
    - Frontend node: 1vCPU, 1 GB memory; x1
    - Meta node: 1vCPU, 1 GB memory; x1
    - Compactor node: 1vCPU, 1 GB memory; x1
    - ETCD: 1vCPU, 1 GB memory; x1
  
  - Stream Input(data.json):
    - 100k => 5.7 MB
    - 1M => 56.7 MB
    - 5M => 283.3 MB
  
  - RisingWave Database/Object Storage:
    - 100k => 7.8MB after compaction => ??, [285k => 43MB compressed 22MB] [500K => 71MB compressed 38MB]
    - 1M   => 115MB after compaction => 81MB
    - 5M   => 433MB after compaction => 388MB
  
  - Memory:
    - 100k => 190MB, 285k => 350MB, 500K => 605MB
    - 1M   => 840MB
    - 5M   => 1.25GB
  
  - CPU Spikes(1/vCPU):
    - 100k => on write 14% | on read 80%
    - 1M   => on write 59% | on read 100%
    - 5M   => on write 100% | on read 100%

  - Query ResponseTime(SELECT * FROM temperature WHERE device_id = 'xy-id'):
    - 100K => 220ms
    - 1M   => 1.4s
    - 5M   => 7s

- 500K 
  - ![500K](https://i.ibb.co/RY4tskZ/RV-500K.png)
- 5M
  - ![5M](https://i.ibb.co/YQqGP1w/RV-5M.png)
