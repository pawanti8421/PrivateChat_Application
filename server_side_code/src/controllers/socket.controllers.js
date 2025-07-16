const messageSchema = require("../models/message.model.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const ApiError = require("../utils/ApiError.js");
const handleSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_room", (chatRoomId) => {
      socket.join(chatRoomId);
    });

    socket.on("send_message", async (data) => {
      const { chatRoomId, receiverId, message, media, mediaType } = data;

      if (chatRoomId === "" || receiverId === "") {
        return;
      }

      let storedMedia = null;
      if (media !== null) {
        const mediaUpload = await uploadOnCloudinary(media);
        if (!mediaUpload) {
          console.log(storedMedia);
          return;
        }
        storedMedia = mediaUpload.secure_url;
      }

      const newMessage = await messageSchema.create({
        chatRoomId: chatRoomId,
        receiverId: receiverId,
        message: message,
        media: storedMedia,
        mediaType: mediaType,
      });

      if (!newMessage) {
        throw new ApiError(500, "Not able to send message");
      }

      io.to(data.chatRoomId).emit("receive_message", newMessage);
    });

    // socket.on("disconnect", () => {
    //   console.log("User disconnected:", socket.id);
    // });
  });
};

module.exports = handleSocket;
