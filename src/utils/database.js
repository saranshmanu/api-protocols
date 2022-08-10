const mongoose = require("mongoose");
const logger = require("./logger");
const configuration = require("./configuration");

const initConnection = async () => {
  logger.info("Initiating connection to the database");
  try {
    mongoose.connection.once("open", () => {
      logger.info("Connected to the database");
    });
    await mongoose.connect(configuration?.databaseUrl);
  } catch (err) {
    logger.error("Failed to connect to the database");
  }
};

module.exports = { initConnection };
