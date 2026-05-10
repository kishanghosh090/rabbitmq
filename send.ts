import amqp from "amqplib";
const connection = await amqp.connect("amqp://localhost");
// create a channel
export const channel = await connection.createChannel();

// queue name
const queue = "chai";

// message
const msg = "Hello World!";

await channel.assertQueue(queue, {
  durable: true,
  arguments: {
    "x-queue-type": "quorum",
  },
});

channel.sendToQueue(queue, Buffer.from(msg));
console.log(" [x] Sent %s", msg);
