const { Kafka } = require('kafkajs');

const msg = process.argv[2];
const brokers = ['localhost:9092'];

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
    });

    const producer = kafka.producer();
    console.log('Connecting.....');
    await producer.connect();
    console.log('Connected!');

    //A-M 0 , N-Z 1
    const partition = msg[0] < 'N' ? 0 : 1;
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    process.exit(0);
  }
}

run();
