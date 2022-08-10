const { createChannel, postMessage, createUser, getChannel, getChannels, getMessage, getUser, updateUser, updateChannel, deleteChannel } = require("../../../services");

const userService = {
  getUser: async (args, callback) => {
    const response = await getUser(args?.request?.id);
    callback(null, response);
  },
  createUser: async (args, callback) => {
    const response = await createUser(args?.request?.name, args?.request?.email, args?.request?.password);
    callback(null, response);
  },
  updateUser: async (args, callback) => {
    const response = await updateUser(args?.request?.id, args?.request?.payload);
    callback(null, response);
  },
};

const messageService = {
  getMessage: async (args, callback) => {
    const response = await getMessage(args?.request?.id);
    callback(null, response);
  },
  postMessage: async (call, callback) => {
    let successfulReports = [];
    let failedReports = [];
    call.on("data", async (messageStream) => {
      const response = await postMessage(messageStream?.message, messageStream?.channel, messageStream?.user);
      if (response?.id) {
        successfulReports.push(JSON.stringify(response));
      } else {
        failedReports.push(JSON.stringify(messageStream));
      }
    });
    call.on("end", () => {
      callback(null, {
        successfulReports: successfulReports,
        failedReports: failedReports,
      });
    });
  },
};

const channelService = {
  getChannel: async (args, callback) => {
    const response = await getChannel(args?.request?.id);
    callback(null, response);
  },
  getChannels: async (call) => {
    const response = await getChannels();
    response.map((channel) => {
      call.write(channel);
    });
    call.end();
  },
  addChannel: async (args, callback) => {
    const response = await createChannel(args?.request?.title, args?.request?.type);
    callback(null, response);
  },
  updateChannel: async (args, callback) => {
    const response = await updateChannel(args?.request?.id, args?.request?.payload);
    callback(null, response);
  },
  deleteChannel: async (args, callback) => {
    const response = await deleteChannel(args?.request?.id);
    callback(null, response);
  },
};

module.exports = { userService, messageService, channelService };
