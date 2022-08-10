const { createChannel, postMessage, createUser, getChannel, getChannels, getMessage, getUser, updateUser, updateChannel, deleteChannel } = require("../../services");
const actions = require("./actions");

const createResponse = (data, type) => {
  return JSON.stringify({ type, data });
};

const resolver = async (wss, socket, payload, jwt) => {
  const type = payload.type;

  // Check if the user is authenticated in this step

  if (!type) {
    socket.send(JSON.stringify({ message: "Please specify the action" }));
    return;
  }

  switch (type) {
    case actions.GET_CHANNELS: {
      const channels = await getChannels();
      channels.map((channel) => {
        socket.send(createResponse(channel, actions.GET_CHANNELS));
      });
      return;
    }
    case actions.GET_CHANNEL: {
      const response = await getChannel(payload?.id);
      socket.send(createResponse(response, actions.GET_CHANNEL));
      return;
    }
    case actions.GET_MESSAGE: {
      const response = await getMessage(payload?.id);
      socket.send(createResponse(response, actions.GET_MESSAGE));
      return;
    }
    case actions.GET_USER: {
      const response = await getUser(payload?.id);
      socket.send(createResponse(response, actions.GET_USER));
      return;
    }
    case actions.CREATE_USER: {
      const response = await createUser(payload?.name, payload?.email, payload?.password);
      socket.send(createResponse(response, actions.CREATE_USER));
      return;
    }
    case actions.UPDATE_USER: {
      const response = await updateUser(payload?.id, payload?.payload);
      socket.send(createResponse(response, actions.UPDATE_USER));
      return;
    }
    case actions.ADD_CHANNEL: {
      const response = await createChannel(payload?.title, payload?.type);
      socket.send(createResponse(response, actions.ADD_CHANNEL));
      return;
    }
    case actions.UPDATE_CHANNEL: {
      const response = await updateChannel(payload?.id, payload?.payload);
      socket.send(createResponse(response, actions.UPDATE_CHANNEL));
      return;
    }
    case actions.DELETE_CHANNEL: {
      const response = await deleteChannel(payload?.id);
      socket.send(createResponse(response, actions.DELETE_CHANNEL));
      return;
    }
    case actions.POST_MESSAGE: {
      const response = await postMessage(payload?.message, payload?.channel, payload?.user);
      socket.send(createResponse(response, actions.POST_MESSAGE));
      return;
    }
  }
  socket.send(JSON.stringify({ message: "No action found with the given type" }));
};

module.exports = resolver;
