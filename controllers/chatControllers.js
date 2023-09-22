const Chat = require("../models/Chat");
const User = require("../models/User");

// @description     Create or fetch One to One Chat
// @route           POST /api/chat/
// @access          Protected
const accessChat = async (req, res) => {
  const { userId } = req.body;

  // If chat with 'userId' not present in request
  if (!userId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "UserId param not sent with request",
    });
  }

  if (req.user.isAgent) {
    var chatExists = await Chat.find({
      agent: req.user._id,
      customer: userId
    })
      .populate("agent", "-password -email") // Return 'users' without 'password'
      .populate("customer", "-password") // Return 'users' without 'password'
      .populate("latestMessage"); // Return 'latestMessage'
  } else {
    var chatExists = await Chat.find({
      customer: req.user._id,
      agent: userId
    })
      .populate("agent", "-password -email") // Return 'users' without 'password'
      .populate("customer", "-password") // Return 'users' without 'password'
      .populate("latestMessage"); // Return 'latestMessage'
  }

  chatExists = await User.populate(chatExists, {
    path: "latestMessage.sender",
    select: "name pic email", // Fields we want to populate
  });

  // Check if chat exists, else create a new chat
  if (chatExists.length > 0) {
    return res.status(200).send(chatExists[0]);
  } else {

    if (req.user.isAgent) {
      var newChatData = {
        agent: req.user._id,
        customer: userId
      };
    } else {
      var newChatData = {
        customer: req.user._id,
        agent: userId
      };
    }

    try {
      const createdChat = await Chat.create(newChatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "agent",
        "-password"
      ).populate(
        "customer",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      });
    }
  }
};

// @description     Fetch all chats for a user
// @route           GET /api/chat/
// @access          Protected
const fetchChats = async (req, res) => {
  try {
    if (req.user.isAgent) {
      var results = await Chat.find({
        agent: req.user._id,
      }).populate("customer", "-password")
        .populate("agent", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .exec();
    } else {
      var results = await Chat.find({
        customer: req.user._id,
      }).populate("customer", "-password")
        .populate("agent", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .exec();
    }

    results = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).send(results);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

module.exports = {
  accessChat,
  fetchChats
};
