// consumer1.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'consumer1',
  brokers: ['localhost:9092', 'localhost:9093'],
});

const consumer = kafka.consumer({ groupId: 'your-group-id' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'your-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
