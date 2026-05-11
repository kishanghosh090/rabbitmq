import express from "express";
import { channel, exchange } from "./client";

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
  //   channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  //fanout
  channel.publish(exchange, "", Buffer.from(JSON.stringify(data)));
  return res.status(200).json({ msg: "add to queue" });
});

// Route Handling:
app.get("/", (req, res) => {
  res.status(200).send("Hello! this is Route /");
});

app.get("/get", (req, res) => {
  res.status(200).json({ message: "You are Route /GET" });
});

app.post("/post", (req, res) => {
  let myJson = req.body;
  res.status(200).send(myJson);
});
app.listen(PORT, () => {
  console.log("server is listing at port", PORT);
});
