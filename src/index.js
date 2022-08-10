const path = require("path");
const express = require("express");

const environment = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.resolve(__dirname, `../environment/.${environment}.env`),
});

const logger = require("./utils/logger");
const configuration = require("./utils/configuration");
const database = require("./utils/database");
const graphqlInit = require("./protocols/http/graphql");
const grpcInit = require("./protocols/http/grpc");
const wsInit = require("./protocols/ws");

const init = async () => {
  await database.initConnection();

  const app = express();
  await graphqlInit(app);
  await grpcInit();
  await wsInit();

  app.listen(configuration?.port, () => {
    logger.info("Listening on port 3000");
  });
};

init();
