const express = require("express");
const app = express();
const PORT = 5000;
const urlRouter = require("./routes/url");
const { ConnectDatabase } = require("./connect");
const mongoose = require("mongoose");
const URL = require("./models/url");

app.use(express.json());

//  Connect Database ( MongoDB )

ConnectDatabase("mongodb://127.0.0.1:27017/short-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MondoDB Connected!!!");
});

// Routes
app.use("/hello", (req, res) => {
  res.send("hello Hello");
});

app.use("/url", urlRouter);

app.listen(PORT, console.log(`Server is listening on ${PORT}`));
