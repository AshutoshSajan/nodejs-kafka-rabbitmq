const { Kafka, logLevel } = require('kafkajs');
const brokers = ['localhost:9092'];

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
      logLevel: logLevel.ERROR,
    });

    const admin = kafka.admin();
    console.log('Connecting.....');
    await admin.connect();
    console.log('Connected!');

    const numPartitions = 2;
    const replicationFactor = 1;

    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions,
          replicationFactor,
        },
        {
          topic: 'topic-a',
          numPartitions,
          replicationFactor,
        },
        {
          topic: 'topic-b',
          numPartitions,
          replicationFactor,
        },
        {
          topic: 'topic-c',
          numPartitions,
          replicationFactor,
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
