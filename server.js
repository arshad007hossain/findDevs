const express = require("express");

const app = express();

port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
