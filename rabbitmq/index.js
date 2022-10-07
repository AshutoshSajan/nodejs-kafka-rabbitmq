const amqplib = require('amqplib');

(async () => {
  const queue = 'tasks';
  const connection = await amqplib.connect('amqp://localhost');

  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  // Listener
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      // console.log({ msg });
      console.log('message received:', msg.content.toString());
      channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });

  // Sender
  const channel2 = await connection.createChannel();

  setInterval(() => {
    channel2.sendToQueue(queue, Buffer.from('something to do'));
  }, 100);
})();
