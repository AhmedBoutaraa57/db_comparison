### Openobserve Report:

  - Stream Input(data.json):
    - 100K => 10.5MB
    - 1M   => 105MB
    - 5M   => 526MB

  - Local FileSystem Storage:
  	- 100k => 12.9MB after compaction =>	2.1MB
    - 1M   => 129.1MB after compaction => 21.3MB
    - 5M   => 645.3MB after compaction =>	106.6MB

  - Memory/localhost(32GB total/20GB free | DDR4 | Speed: 2667 MT/s | 1.2 Voltage):
    - 100k => 475MB(1.5% of 32GB)
    - 1M   => 697MB(2.2% of 32GB)
    - 5M   => 1.1GB(3.6% of 32GB)

  - Query ResponseTime (SELECT * FROM temperature WHERE device_id = 'ID'):
    - 100K document -> around 100ms
    - 1M document   -> around 100ms
    - 5M document   -> around 100ms

  - CPU Spikes:
    - 100k => on write 30%  | on read 140%
    - 1M   => on write 100% | on read 109%
    - 5M   => on write 191% | on read 450%

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

- 100K 
  - ![100K](https://i.ibb.co/PQMH19m/openobserver-100k.png)
- 5M
  - ![5M](https://i.ibb.co/rQ6XvNT/openobserve-5-M.png)