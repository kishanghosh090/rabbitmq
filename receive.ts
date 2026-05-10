import { channel } from "./send";

const queue = "chai";

// await channel.assertQueue(queue, {
//   durable: true,
//   arguments: {
//     "x-queue-type": "quorum",
//   },
// });
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(
  queue,
  function (msg) {
    console.log(" [x] Received %s", msg!!.content.toString());
  },
  {
    noAck: true,
  },
);
