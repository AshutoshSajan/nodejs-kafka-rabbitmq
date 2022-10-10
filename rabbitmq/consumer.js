const amqplib = require('amqplib');

const consumer = async () => {
  const queue = 'tasks';
  const connection = await amqplib.connect('amqp://localhost');

  const channel = await connection.createChannel();

  // Listener
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log({
        // msg,
        // channel,
        msgContent: msg.content.toString(),
        consumer: 'consumer1',
      });
      channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
};

// consumer();
module.exports = consumer;
