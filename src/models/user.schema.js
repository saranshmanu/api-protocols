const mongoose = require("mongoose");
const { createHash } = require("../utils/cryptography");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 250,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxLength: 250,
    },
    password: {
      type: String,
      required: true,
      maxLength: 250,
      get: (hash) => {
        return hash;
      },
      set: (password) => {
        return password;
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.compareCredentials = async (_id, password) => {
  const hash = await createHash(password);
  const user = await this.model("User").find({ _id });
  if (hash == user?.password) return true;
  else return false;
};

var User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };
