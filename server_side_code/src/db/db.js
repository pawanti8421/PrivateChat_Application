const mongoose = require("mongoose");
const DB_NAME = require("../constant.js");

require("dotenv").config({ debug: false });

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n DB connected || DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
