import { channel } from "./client";

const queue = "chai";

await channel.assertQueue(queue, {
  durable: true,
  arguments: {
    "x-queue-type": "quorum",
  },
});
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
// Process one message at a time per consumer.
channel.prefetch(1);
channel.consume(
  queue,
  async function (msg) {
    if (!msg) {
      return;
    }

    let data: { id: number; msg: string } | null = null;
    try {
      data = JSON.parse(msg.content.toString()) as { id: number; msg: string };
    } catch {
      console.log("invalid json");
    }

    if (!data) {
      channel.nack(msg, false, false);
      return;
    }

    console.log(data);
    await doWork();

    console.log(data.id, data.msg);
    channel.ack(msg);
  },
  {
    noAck: false,
  },
);

function doWork(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("done...");
      resolve();
    }, 5000);
  });
}
