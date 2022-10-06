const { Kafka } = require('kafkajs');

const brokers = ['localhost:9092'];

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'my_app',
      brokers,
    });

    const consumer = kafka.consumer({ groupId: 'test' });
    console.log('Connecting.....');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });

    await consumer.run({
      // eachMessage: async (result) => {
      //   console.log({
      //     result,
      //     message: result.message.value,
      //     partition: result.partition,
      //   });
      // },

      eachBatchAutoResolve: true,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
        pause,
      }) => {
        for (let message of batch.messages) {
          console.log({
            topic: batch.topic,
            partition: batch.partition,
            highWatermark: batch.highWatermark,
            message: {
              offset: message.offset,
              key: message.key?.toString(),
              value: message.value?.toString(),
              headers: message.headers,
            },
            commitOffsetsIfNecessary,
            uncommittedOffsets,
            isRunning,
            isStale,
            pause,
          });

          resolveOffset(message.offset);
          await heartbeat();
        }
      },
    });
  } catch (err) {
    console.error('Something bad happened', err);
  } finally {
    console.log('finally');
  }
}

run();
