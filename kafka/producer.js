const { Kafka, logLevel, CompressionTypes } = require('kafkajs');
const brokers = ['localhost:9092'];
const readline = require('readline');
const topics = ['topic-a']; // ['test-topic'];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('> Enter your message ', (messages) => {
//   console.log(`Hello, ${answer}!`);
//   rl.close();
// });

// const msg = process.argv[2];

async function producer() {
  try {
    const kafka = new Kafka({
      clientId: 'producer',
      brokers,
      logLevel: logLevel.DEBUG,
      // retry: {
      //   initialRetryTime: 100,
      //   retries: 8,
      // },
    });

    const producer = kafka.producer();
    // const producer = kafka.producer({
    //   allowAutoTopicCreation: false,
    //   transactionTimeout: 30000,
    // });

    console.log('Connecting.....');
    await producer.connect();
    console.log('Connected!');

    // const admin = kafka.admin();

    // // remember to disconnect when you are done
    // await admin.connect();

    // const clusterInfo = await admin.describeCluster();

    // const replicationFactor = clusterInfo.brokers.length;

    // console.log(JSON.stringify({ clusterInfo, replicationFactor }, null, 2));

    // const topicConfig = topics.map((topic) => ({
    //   topic,
    //   numPartitions: 1, // default: -1 (uses broker `num.partitions` configuration)
    //   replicationFactor, // default: -1 (uses broker `default.replication.factor` configuration)
    //   // replicaAssignment: <Array>,  // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
    //   // configEntries: <Array>       // Example: [{ name: 'cleanup.policy', value: 'compact' }] - default: []
    // }));

    // // kafka doc https://kafka.js.org/docs/admin#a-name-create-topics-a-create-topics
    // await admin.createTopics({
    //   topics: topicConfig,
    //   waitForLeaders: true,
    // });

    // await admin.disconnect();

    //A-M 0 , N-Z 1
    // let partition = msg[0] < 'N' ? 0 : 1;

    const messages = [];

    for (let i = 0; i < 100; i++) {
      const partition = i % 2;
      const message = `message ${i}`;

      messages.push({
        key: message,
        value: message,
        partition,
      });
    }

    const result = await producer.send({
      topic: topics[0],
      messages,
      // messages: [
      //   {
      //     key: message,
      //     value: message,
      //     partition, // : partition === 0 ? 1 : 2,
      //     // headers: {
      //     //   'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
      //     //   'system-id': 'my-system',
      //     // },
      //     // timestamp: new Date(),
      //   },
      // ],
      // acks: 1,
      // timeout: 30000,
      // compression: CompressionTypes.GZIP,
    });

    // console.log(
    //   'message send successfully!',
    //   JSON.stringify({ result, partition, message }, null, 2)
    // );

    // const topicMessages = [
    //   {
    //     topic: 'topic-a',
    //     messages: [{ key: 'key', value: 'hello topic-a' }],
    //   },
    //   {
    //     topic: 'topic-b',
    //     messages: [{ key: 'key', value: 'hello topic-b' }],
    //   },
    //   {
    //     topic: 'topic-c',
    //     messages: [
    //       {
    //         key: 'key',
    //         value: 'hello topic-c',
    //         headers: {
    //           'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
    //         },
    //       },
    //     ],
    //   },
    // ];

    // const batchResult = await producer.sendBatch({
    //   topicMessages,
    //   acks: 1,
    //   timeout: 30000,
    //   compression: CompressionTypes.GZIP,
    // });

    // console.log(
    //   'message send successfully!',
    //   JSON.stringify({ batchResult }, null, 2)
    // );

    await producer.disconnect();
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    process.exit(0);
  }
}

producer();

module.exports = producer;
