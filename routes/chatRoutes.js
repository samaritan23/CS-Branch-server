const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Only logged in user can access the below routes
router.route("/").post(protect, accessChat).get(protect, fetchChats); // Both requests work on same route

module.exports = router;
