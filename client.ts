import amqp from "amqplib";
// export const queue1 = "chai1";
// export const queue2 = "chai2";
export const exchange = "faoutEx";
const connection = await amqp.connect("amqp://13.205.160.169");
// create a channel
const channel = await connection.createChannel({ highWaterMark: 1 });



export { channel };
