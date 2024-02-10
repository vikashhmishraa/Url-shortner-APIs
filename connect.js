const mongoose = require("mongoose");

async function ConnectDatabase(url) {
  return mongoose.connect(url);
}

module.exports = {
  ConnectDatabase,
};
