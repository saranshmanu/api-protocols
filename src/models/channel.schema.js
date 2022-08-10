const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    type: {
      type: String,
      enum: ["Private", "Public"],
      default: "Private",
    },
  },
  { timestamps: true }
);

var Channel = mongoose.model("Channel", channelSchema);
module.exports = { Channel, channelSchema };
