// import { channel } from "./client";

import { channel, exchange } from "./client";

// import { channel, exchange, queue1, queue2 } from "./client";

// const queue = "chai";

// await channel.assertQueue(queue, {
//   durable: true,
//   arguments: {
//     "x-queue-type": "quorum",
//   },
// });
// console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
// // Process one message at a time per consumer.
// channel.prefetch(1);
// channel.consume(
//   queue,
//   async function (msg) {
//     if (!msg) {
//       return;
//     }

//     let data: { id: number; msg: string } | null = null;
//     try {
//       data = JSON.parse(msg.content.toString()) as { id: number; msg: string };
//     } catch {
//       console.log("invalid json");
//     }

//     if (!data) {
//       channel.nack(msg, false, false);
//       return;
//     }

//     console.log(data);
//     await doWork();

//     console.log(data.id, data.msg);
//     channel.ack(msg);
//   },
//   {
//     noAck: false,
//   },
// );

// function doWork(): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("done...");
//       resolve();
//     }, 5000);
//   });
// }

// fanout ---------------

async function main() {
  // await channel.assertExchange(exchange, "fanout", {
  //   durable: false,
  // });

  const q1 = await channel.assertQueue("", {
    exclusive: true,
  });
  const q2 = await channel.assertQueue("", {
    exclusive: true,
  });
  // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
  // channel.bindQueue(q.queue, exchange, "");
  channel.assertExchange(exchange, "fanout", { durable: false });
  channel.bindQueue(q1.queue, exchange, "");
  channel.bindQueue(q2.queue, exchange, "");

  channel.consume(
    q1.queue,
    function (msg) {
      if (msg!!.content) {
        console.log(" [x] %s", msg!!.content.toString());
      }
    },
    {
      noAck: true,
    },
  );
  channel.consume(
    q2.queue,
    function (msg) {
      if (msg!!.content) {
        console.log(" [x] %s", msg!!.content.toString());
      }
    },
    {
      noAck: true,
    },
  );
}

main();
