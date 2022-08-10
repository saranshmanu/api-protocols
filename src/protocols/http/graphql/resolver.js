const { createChannel, postMessage, createUser, getChannel, getChannels, getMessage, getUser, updateUser, updateChannel, deleteChannel } = require("../../../services");

const resolvers = {
  Query: {
    getChannels: async (parent, args) => {
      return await getChannels();
    },
    getChannel: async (parent, args) => {
      return await getChannel(args?.id);
    },
    getMessage: async (parent, args) => {
      return await getMessage(args?.id);
    },
    getUser: async (parent, args) => {
      return await getUser(args?.id);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      return await createUser(args?.name, args?.email, args?.password);
    },
    updateUser: async (parent, args) => {
      return await updateUser(args?.id, args?.payload);
    },
    addChannel: async (parent, args) => {
      return await createChannel(args?.title, args?.type);
    },
    updateChannel: async (parent, args) => {
      return await updateChannel(args?.id, args?.payload);
    },
    deleteChannel: async (parent, args) => {
      return await deleteChannel(args?.id);
    },
    postMessage: async (parent, args) => {
      return await postMessage(args?.message, args?.channel, args?.user);
    },
  },
};

module.exports = resolvers;
