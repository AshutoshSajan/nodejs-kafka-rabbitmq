import createTopic from './topic.js';
import producer from './producer.js';
import consumer from './consumer1.js';
import consumer2 from './consumer2.js';

await createTopic();
await producer();

await Promise.all([consumer(), consumer2()]);
