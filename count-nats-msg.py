import asyncio
import time
from pynats import NATSClient
from nats.aio.client import Client as NATS

message_count = 0
start_time = time.time()

with NATSClient() as client:
    client.connect()

    def callback(msg):
      global message_count
      global start_time
      message_count += 1

      if time.time() - start_time >= 1:
          print(f"[nats-python] > Messages per 1s: {message_count}")
          # Reset counter and update start time
          message_count = 0
          start_time = time.time()

    client.subscribe(subject='microlab.cbeoffice.*.gws', callback=callback)
    client.wait()

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

async def main():
    async def message_handler(msg):
      global message_count
      message_count += 1

    async def subscribe(nc, subject):
      await nc.subscribe(subject, cb=message_handler)

    global message_count
    message_count = 0

    nc = NATS()
    await nc.connect(servers=["nats://127.0.0.1:4222"])

    subject = "microlab.cbeoffice.*.gws"
    await subscribe(nc, subject)

    while True:
        start_time = time.time()
        await asyncio.sleep(1)
        end_time = time.time()
        msgs_per_sec = message_count / (end_time - start_time)
        print(f"[nats-py] > Messages per 1s: {msgs_per_sec:.2f}")
        message_count = 0

if __name__ == "__main__":
    asyncio.run(main())
