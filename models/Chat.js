const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;