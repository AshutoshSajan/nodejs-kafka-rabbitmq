const { Kafka, logLevel } = require('kafkajs');
const brokers = ['localhost:9092'];
const topic = 'test-topic';

const createTopic = async () => {
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

    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
          replicationFactor,
        },
        // {
        //   topic: 'topic-a',
        //   numPartitions,
        //   replicationFactor,
        // },
        // {
        //   topic: 'topic-b',
        //   numPartitions,
        //   replicationFactor,
        // },
        // {
        //   topic: 'topic-c',
        //   numPartitions,
        //   replicationFactor,
        // },
      ],
    });

    console.log('Created Successfully!');
    await admin.disconnect();
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    process.exit(0);
  }
};

createTopic();

module.exports = createTopic;
