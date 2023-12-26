### InfluxDB V3 Report:

  - ##### I have Built a InfluxDB_V3 Docker Image from the github source code I was able to access the database which was based on the rust and InfluxDB.IOx but form looking at 1.x to 2.x to 3.x, each lacking backward compatibility and changing query APIs and introducing new languages (InfluxQL, Flux, InfluxQL again in 3.x) I wasn't clear how to interact with DB.
  - ##### I had meeting with InfluxData Team. and long story short is at this moment InfluxDB.V3(previously know as InfluxDB IOx) is only available for Commercial use under 2 options:
    - 1. Self-Hosted and Self-Managed which is refferd to as Clustered (start at 24CPU and 96GB Memory) for 45$/year.
    - 2. InfluxDB Cloud(single-tenant & multi-tenant) which Hosted and Managed by InfluxData(start at 24CPU 96GB Memory, 1TB Storage) for 60$/year.
    - They Also provide POC Or evaluation licences for 500$/month for both subscriptions
  - ##### and the Open-Source InfluxDB.V3 has no concrete timeline when it will be available
  - ##### based on google searches, InfluxDB strengths in IoT workloads looks promising
