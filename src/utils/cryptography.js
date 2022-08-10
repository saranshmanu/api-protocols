const bcrypt = require("bcrypt");
const logger = require("./logger");

/**
 * The function is used to create a hash for the string
 * @param {*} phrase
 * @returns
 */
const createHash = async (phrase) => {
  logger.info("Initiating hash creation");
  try {
    const rounds = 10;
    const hash = await bcrypt.hash(phrase, rounds);
    logger.info("Successfully created the hash");
    return hash.toString();
  } catch (error) {
    logger.error("Error while create hash for the user password", error);
  }
};

module.exports = { createHash };
