const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleViewShortUrl,
  handleUrlRedirects,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

// Routes

router.get("/", handleViewShortUrl);
router.post("/", handleGenerateNewShortUrl);
router.get("/:shortID", handleUrlRedirects);
router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
