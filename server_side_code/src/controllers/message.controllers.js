const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const messageSchema = require("../models/message.model.js");
const asyncHandler = require("../utils/asyncHandler");

const storeMessage = asyncHandler(async (req, res) => {
  const { chatRoomId, receiverId, message, media, mediaType } = req.body;

  if (chatRoomId === "" || receiverId === "") {
    throw new ApiError(400, "Something went wrong");
  }

  const newMessage = await messageSchema.create({
    chatRoomId: chatRoomId,
    receiverId: receiverId,
    message: message,
    media: media,
    mediaType: mediaType,
  });

  if (!newMessage) {
    throw new ApiError(500, "Not able to send message");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newMessage, "Message stored successfully"));
});

const getAllMessage = asyncHandler(async (req, res) => {
  const { chatRoomId } = req.body;
  const allMessages = await messageSchema.find({
    chatRoomId: chatRoomId,
  });
  if (!allMessages) {
    throw new ApiError(500, "Not able to fetch previous messages");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allMessages, "All messages fetched."));
});

const storeMediaMessage = asyncHandler(async (req, res) => {
  const mediaPath = req.file;

  if (!mediaPath) {
    throw new ApiError(400, "Media file is required");
  }

  return res.status(201).json(new ApiResponse(200, mediaPath, "Media stored"));
});

module.exports = { storeMessage, getAllMessage, storeMediaMessage };
