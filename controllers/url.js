const { shortid } = require("shortid");
const URL = require("../models/url");
const { default: ShortUniqueId } = require("short-unique-id");

const handleGenerateNewShortUrl = async (req, res) => {
  const GetNewShortID = await new ShortUniqueId({ length: 8 });
  const ShortID = GetNewShortID.rnd();
  console.log(ShortID);
  const body = req.body;
  if (!body.url) return res.status(400).json({ erroe: "URL is Required" });
  await URL.create({
    shortID: ShortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: ShortID });
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
