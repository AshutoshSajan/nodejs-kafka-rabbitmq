const { Kafka, logLevel, CompressionTypes } = require('kafkajs');
const brokers = ['localhost:9092'];
const topic = 'test-topic';
// const msg = process.argv[2];

async function producer() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
      logLevel: logLevel.ERROR,
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

    //A-M 0 , N-Z 1
    // let partition = msg[0] < 'N' ? 0 : 1;

    for (let i = 0; i < 100; i++) {
      const partition = i % 2;
      const message = `message ${i}`;

      const result = await producer.send({
        topic,
        messages: [
          {
            key: message,
            value: message,
            partition, // : partition === 0 ? 1 : 2,
            // headers: {
            //   'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
            //   'system-id': 'my-system',
            // },
            // timestamp: new Date(),
          },
        ],
        // acks: 1,
        // timeout: 30000,
        // compression: CompressionTypes.GZIP,
      });

      console.log(
        'message send successfully!',
        JSON.stringify({ result, partition, message }, null, 2)
      );
    }

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
