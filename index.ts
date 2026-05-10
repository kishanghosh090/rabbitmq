import express from "express";
import { channel, queue } from "./client";

const app = express();

const PORT = 4002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/send/:id", (req, res) => {
  const params = req.params.id;

  const data = {
    id: Math.random() * 100,
    mssg: params,
  };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  
  return res.status(200).json({ msg: "add to queue" });
});
app.listen(PORT, () => {
  console.log("server is listing at port", PORT);
});
