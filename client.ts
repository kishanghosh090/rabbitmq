import amqp from "amqplib";
const connection = await amqp.connect("amqp://13.205.160.169");
// create a channel
export const channel = await connection.createChannel({ highWaterMark: 1 });
export const queue = "chai";

connection.on("close", () => {});
