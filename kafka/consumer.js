const { Kafka, logLevel } = require('kafkajs');
const brokers = ['localhost:9092'];
const topic = 'test-topic';
const groupId = 'group1';

async function consumer() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
      logLevel: logLevel.DEBUG,
    });

    const consumer = kafka.consumer({ groupId });
    
    console.log('Connecting.....');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    await consumer.run({
      partitionsConsumedConcurrently: 2, // Default: 1
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
          topic,
          partition,
          messageText: message.value.toString(),
          // message,
          // heartbeat,
          // pause,
        });
      },

      // ==========================================
      // To read messages in batch
      // ==========================================

      // eachBatchAutoResolve: true,
      // eachBatch: async ({
      //   batch,
      //   resolveOffset,
      //   heartbeat,
      //   commitOffsetsIfNecessary,
      //   uncommittedOffsets,
      //   isRunning,
      //   isStale,
      //   pause,
      // }) => {
      //   for (let message of batch.messages) {
      //     console.log({
      //       topic: batch.topic,
      //       partition: batch.partition,
      //       highWatermark: batch.highWatermark,
      //       message: {
      //         offset: message.offset,
      //         key: message.key?.toString(),
      //         value: message.value?.toString(),
      //         headers: message.headers,
      //       },
      //       commitOffsetsIfNecessary,
      //       uncommittedOffsets,
      //       isRunning,
      //       isStale,
      //       pause,
      //     });
      //     resolveOffset(message.offset);
      //     await heartbeat();
      //   }
      // },
    });
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    console.log('finally');
  }
}

consumer();

module.exports = consumer;
