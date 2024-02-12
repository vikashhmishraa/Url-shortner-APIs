const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleViewShortUrl,
  handleUrlRedirects,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

// Routes

router.get("/ViewAll", handleViewShortUrl);
router.post("/create", handleGenerateNewShortUrl);
router.get("/:shortID", handleUrlRedirects);
router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
