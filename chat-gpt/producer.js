// producer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9092', 'localhost:9093'],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  // Produce a message to the specified topic
  await producer.send({
    topic: 'your-topic',
    messages: [
      { value: 'Hello from KafkaJS producer!' },
      // Add more messages as needed
    ],
  });

  await producer.disconnect();
};

run().catch(console.error);
