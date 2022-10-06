const { Kafka } = require('kafkajs');
const brokers = ['localhost:9092'];

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
    });

    const admin = kafka.admin();
    console.log('Connecting.....');
    await admin.connect();
    console.log('Connected!');

    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
        },
      ],
    });

    console.log('Created Successfully!');
    await admin.disconnect();
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    process.exit(0);
  }
}

run();
