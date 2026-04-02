const mongoose = require("mongoose");

async function connectDatabase(mongoUri) {
  console.log("[MongoDB] connecting...");
  await mongoose.connect(mongoUri);
  console.log("[MongoDB] connected");
}

module.exports = {
  connectDatabase,
};
