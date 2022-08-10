const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const configuration = require("../../../utils/configuration");
const logger = require("../../../utils/logger");
const { userService, messageService, channelService } = require("./resolver");

const createProtoDefinition = (serviceName) => {
  const protoPath = path.join(__dirname, `./proto/${serviceName}`);
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const definition = grpc.loadPackageDefinition(packageDefinition);
  return definition;
};

const init = async () => {
  const server = new grpc.Server();

  const userProto = createProtoDefinition("User.proto");
  const messageProto = createProtoDefinition("Message.proto");
  const channelProto = createProtoDefinition("Channel.proto");

  server.addService(userProto.UserService.service, userService);
  server.addService(messageProto.MessageService.service, messageService);
  server.addService(channelProto.ChannelService.service, channelService);

  server.bindAsync(`0.0.0.0:${configuration?.grpcPort}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      logger.error(`Failed to start GRPC server on port ${port}`);
    } else {
      logger.info(`Started GRPC server on port ${port}`);
      server.start();
    }
  });
};

module.exports = init;
