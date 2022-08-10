const configuration = {
  port: process.env.SERVER_PORT || 8080,
  grpcPort: process.env.GRPC_PORT || 3001,
  wsPort: process.env.WS_PORT || 3002,
  environment: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
};

module.exports = configuration;
