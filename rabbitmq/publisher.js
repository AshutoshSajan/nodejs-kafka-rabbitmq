const amqplib = require('amqplib');

const publisher = async () => {
  const queue = 'tasks';
  const exchange = 'logs';
  const connection = await amqplib.connect('amqp://localhost');

  const channel = await connection.createChannel();

  channel.assertExchange('logs', 'fanout', { durable: false });
  channel.publish('logs', '', Buffer.from('Hello World!'));

  // await channel.assertQueue(queue);

  // // Listener
  // channel.consume(queue, (msg) => {
  //   if (msg !== null) {
  //     // console.log({ msg });
  //     console.log('message received:', msg.content.toString());
  //     channel.ack(msg);
  //   } else {
  //     console.log('Consumer cancelled by server');
  //   }
  // });

  // Sender
  // const channel2 = await connection.createChannel();

  // for (let i = 0; i < 50; i++) {
  //   channel.sendToQueue(queue, Buffer.from(`Message ${i}`));
  //   console.log(`${i + 1} message published`);
  // }
};

module.exports = publisher;
