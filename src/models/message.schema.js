const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxLength: 250,
    },
    channel: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

var Message = mongoose.model("Message", messageSchema);
module.exports = { Message, messageSchema };
