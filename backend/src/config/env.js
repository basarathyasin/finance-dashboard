const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const PORT = process.env.PORT || "5001";
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env");
}

module.exports = {
  PORT,
  MONGODB_URI,
};
