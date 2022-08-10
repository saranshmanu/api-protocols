const { User, Message, Channel } = require("../models");
const { Types } = require("mongoose");
const logger = require("../utils/logger");
const { createHash } = require("../utils/cryptography");

const getChannels = async () => {
  const data = await Channel.find({});
  return data;
};

const getChannel = async (id) => {
  const channel = await Channel.findById(id);
  const messages = await Message.find({
    channel: Types.ObjectId(id),
  }).populate("user");
  return {
    channel,
    messages,
  };
};

const getMessage = async (id) => {
  const data = await Message.findById(id).populate("user").populate("channel");
  return data;
};

const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};

const createUser = async (name, email, password) => {
  try {
    logger.info("Creating a new user");
    const passwordHash = await createHash(password);
    let user = await User.create({
      name,
      email,
      password: passwordHash,
    });
    user = await user.save();
    logger.info("New user created successfully!");
    return user;
  } catch (error) {
    logger.error("Error while creating a new user");
    return error;
  }
};

const updateUser = async (user, payload) => {
  try {
    logger.info("Updating the user payload");
    const record = await User.findByIdAndUpdate(user, {
      ...payload,
    });
    record.save();
    logger.info("Updated the user successfully!");
    return record;
  } catch (error) {
    logger.error("Error while updating the user information");
    return error;
  }
};

const postMessage = async (message, channel, user) => {
  try {
    logger.info("Posting a new message");
    let record = await Message.create({
      message,
      channel: Types.ObjectId(channel),
      user: Types.ObjectId(user),
    })
      
    record = await record.save();
    logger.info("Posted the message!");
    return record;
  } catch (error) {
    logger.error("Error while posting the message to the channel");
    return error;
  }
};

const createChannel = async (title, type) => {
  try {
    logger.info("Creating a new channel");
    for (var i = 0; i <= 1000000; i++) {
      let channel = await Channel.create({
        type,
        title: title + i.toString(),
      });
      channel = await channel.save();
    }

    logger.info("Create a new channel!");
    return channel;
  } catch (error) {
    logger.error("Error while creating the channel");
    console.log(error);
    return error;
  }
};

const updateChannel = async (channel, payload) => {
  try {
    logger.info("Updating the channel payload");
    const record = await Channel.findByIdAndUpdate(channel, {
      ...payload,
    });
    record.save();
    logger.info("Updated the channel successfully!");
    return record;
  } catch (error) {
    logger.error("Error while updating the channel information");
    return error;
  }
};

const deleteChannel = async (channel) => {
  try {
    logger.info("Removing the channel");
    const record = await Channel.findByIdAndRemove(channel);
    logger.info("Removed the channel successfully!");
    return record;
  } catch (error) {
    logger.error("Error while removing the channel");
    return error;
  }
};

module.exports = {
  getChannels,
  getChannel,
  getMessage,
  getUser,
  createUser,
  updateUser,
  postMessage,
  createChannel,
  updateChannel,
  deleteChannel,
};
