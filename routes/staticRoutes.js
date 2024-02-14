const express = require("express");
const URL = require("../models/url");
const users = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Check if user is authenticated
    console.log(req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});
module.exports = router;
