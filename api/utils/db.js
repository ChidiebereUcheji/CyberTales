const connect = require("mongoose").connect;
const set = require("mongoose").set;
const dotenv = require("dotenv");
dotenv.config();
set("strictQuery", false);

const { MONGO_URI } = process.env;
async function connectDB() {
  const db = connect(MONGO_URI, {
      dbName: "cybertales",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB: ", err);
    })
    .finally(() => {
      console.log("MongoDB connection complete");
    });

  return db;
}

module.exports = connectDB;