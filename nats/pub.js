import { StringCodec, connect } from 'nats';

const main = async () => {
  const nc = await connect({
    servers: ['connect.ngs.global:4222'],
  })
  console.info('Connected to NATS as PUB...');
  const stringCodec = StringCodec();
  nc.publish('/hello', stringCodec.encode("Hello World Of Iron"));
}

main();