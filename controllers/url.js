const { shortid } = require("shortid");
const URL = require("../models/url");
const { default: ShortUniqueId } = require("short-unique-id");

const handleGenerateNewShortUrl = async (req, res) => {
  try {
    const shortID = new ShortUniqueId({ length: 8 }).rnd();
    console.log("Generated Short ID:", shortID);
    const allUrls = await URL.find({});
    const { url } = req.body;
    console.log("Received URL:", url);

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    await URL.create({
      shortID,
      redirectURL: url,
      visitHistory: [],
    });

    console.log("URL created successfully:", url);
    return res.render("home", { id: shortID, urls: allUrls });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleViewShortUrl = async (req, res) => {
  const AllShortIDs = await URL.find({});
  return res.json(AllShortIDs);
};

const handleUrlRedirects = async (req, res) => {
  const shortID = req.params.shortID;
  console.log(shortID);
  const singleUrl = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        userVisitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  console.log(singleUrl); // Add this line to see what singleUrl contains
  if (singleUrl && singleUrl.redirectURL) {
    res.redirect(singleUrl.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
};

const handleGetAnalytics = async (req, res) => {
  try {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.json({
      totalClicks: result.userVisitHistory.length,
      analytics: result.userVisitHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleGenerateNewShortUrl,
  handleViewShortUrl,
  handleUrlRedirects,
  handleGetAnalytics,
};
