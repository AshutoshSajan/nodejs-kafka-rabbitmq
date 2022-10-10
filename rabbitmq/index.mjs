import publisher from './publisher.js';
import consumer from './consumer.js';
import consumer2 from './consumer2.js';

await publisher();
await Promise.all([consumer(), consumer2()]);
