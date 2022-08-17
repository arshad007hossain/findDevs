const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

//connect the database
connectDB();

port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
