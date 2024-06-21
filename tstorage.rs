use tstorage::{storage::{Config, DiskConfig, PartitionConfig, Storage}, DataPoint, Row};
use tstorage::EncodeStrategy::Gorilla;

#[no_mangle]
pub extern "C" fn tsdb_rs() {
  let storage = Storage::new(Config {
    partition: PartitionConfig {
      duration: 100_000,
      hot_partitions: 50,
      max_partitions: 50,
    },
    disk: Some(DiskConfig {
      data_path: "./data".to_string(),
      encode_strategy: Gorilla,
    }),
    ..Default::default()
  }).unwrap();

  // let mut counter: i64 = 0;
  // for i in 0..100_000 * 10 * 5 {
  //   counter += 1;
  //   print!("counter: {} ", counter);
  //   storage.insert(&Row {
  //     metric: "metric1",
  //     data_point: DataPoint {
  //       timestamp: 160_000_000_0000 + counter,
  //       value: i as f64 * 0.1,
  //     },
  //   }).unwrap();
  // }

  let points: Vec<DataPoint> = storage.select("metric1", 160_000_000_0000, 160_000_010_0000).unwrap();
  for p in points {
    println!("\n timestamp: {}, value: {}", p.timestamp, p.value);
  }

  storage.close().unwrap();
}

fn main() {
  tsdb_rs();
}
