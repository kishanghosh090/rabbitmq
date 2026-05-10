import { channel, queue } from "./client";

// queue name

// message
const msg = "Hello World!";

// declare a queue (if not exists)
await channel.assertQueue(queue, {
  durable: true,
  arguments: {
    "x-queue-type": "quorum",
  },
});

// channel.sendToQueue(queue, Buffer.from(msg));
// console.log(" [x] Sent %s", msg);
