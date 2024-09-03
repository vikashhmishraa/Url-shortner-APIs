const express = require("express");
const URL = require("../models/url");
const users = require("../models/users");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    // Check if user is authenticated
    console.log(req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const allUrls = await URL.find({}).populate({
      path: "createdBy",
    });
    return res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    // Check if user is authenticated
    console.log(req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const allUrls = await URL.find({ createdBy: req.user._id }).populate({
      path: "createdBy",
    });
    // const allName = await URL.find({ createdBy: req.user.name });
    // const allUsers = { allUrls, allName };
    return res.render("home", {
      urls: allUrls,
      baseUrl: process.env.BASE_URL,
      Port: process.env.PORT,
    });
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
