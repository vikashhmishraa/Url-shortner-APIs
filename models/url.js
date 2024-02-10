const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: { type: String, require: true },
    redirectURL: { type: String, require: true },
    userVisitHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
