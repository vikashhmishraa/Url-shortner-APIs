const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
