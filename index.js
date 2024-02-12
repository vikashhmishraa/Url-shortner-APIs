const express = require("express");
const app = express();
const PORT = 5000;
const urlRouter = require("./routes/url");
const { ConnectDatabase } = require("./connect");
const mongoose = require("mongoose");
const URL = require("./models/url");
const path = require("path");
const staticRoutes = require("./routes/staticRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//  Connect Database ( MongoDB )

ConnectDatabase("mongodb://127.0.0.1:27017/short-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MondoDB Connected!!!");
});

// app.get("/test", async (req, res) => {
//   const AllUrls = await URL.find({});
//   return res.render("home", {
//     urls: AllUrls,
//   });
// });

// Routes
app.use("/hello", (req, res) => {
  res.send("hello Hello");
});

// All Dynamic Routes
app.use("/url", urlRouter);
// Static Routes
app.use("/", staticRoutes);

app.listen(PORT, console.log(`Server is listening on ${PORT}`));