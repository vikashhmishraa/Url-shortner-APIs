const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleViewShortUrl,
  handleUrlRedirects,
  handleGetAnalytics,
} = require("../controllers/url");

const {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
} = require("../middleware/auth");
const router = express.Router();

// Routes

router.get("/ViewAll", restrictTo(["ADMIN"]), handleViewShortUrl);
router.post(
  "/create",
  restrictTo(["NORMAL", "ADMIN"]),
  handleGenerateNewShortUrl
);
router.get("/:shortID", handleUrlRedirects);
router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
