import { Kafka } from 'kafkajs';

const brokers = ['localhost:9092'];
const topic = 'test';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers,
  logLevel: logLevel.DEBUG,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: 'Hello KafkaJS user!' }],
  });

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
