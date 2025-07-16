import React, { useEffect, useRef, useState } from "react";
import "./chatArea.css";
import ChatMessageInputArea from "./ChatMessageInputArea";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8000");

function ChatArea({ activeChat, setActiveChat }) {
  const message = useRef("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", activeChat.chatId);

    const formData = {
      chatRoomId: activeChat.chatId,
    };

    axios
      .post("http://localhost:8000/api/v1/message/get-all-messages", formData, {
        withCredentials: true,
      })
      .then((res) => {
        const allMessages = res.data.data;

        const formattedMessages = allMessages.map((msg) => {
          const date = new Date(msg.createdAt);

          return {
            text: msg.message,
            file: msg.media,
            fileType: msg.mediaType,
            time: date.toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
            }),
            view: msg.receiverId === activeChat.id._id ? "sender" : "receiver",
          };
        });

        setMessages(formattedMessages);
      })
      .catch((err) => {
        alert(err.response?.data.message || "Something went wrong");
      });

    socket.on("receive_message", (data) => {
      const date = new Date(data.createdAt);

      const newMessage = {
        text: data.message,
        file: data.media,
        fileType: data.mediaType,
        time: date.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }),
        view: data.receiverId === activeChat.id._id ? "sender" : "receiver",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket.off("receive_message");
  }, [activeChat.chatId, activeChat.id._id]);

  const handleSend = () => {
    const inputValue = message.current.value;
    if (inputValue.trim() === "") {
      return;
    }

    const formData = {
      chatRoomId: activeChat.chatId,
      receiverId: activeChat.id._id,
      message: inputValue,
      media: null,
      mediaType: null,
    };

    socket.emit("send_message", formData);

    message.current.value = "";
  };

  const handleMedia = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const fileType = file.type;
    if (fileType === "application/pdf") {
      alert("Pdf is not supported write now. We are sorry for that.");
      return;
    }

    axios
      .post("http://localhost:8000/api/v1/message/store-media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((data) => {
        const uploadedFileUrl = `${data.data.data.destination}/${data.data.data.filename}`;

        const socketPayload = {
          chatRoomId: activeChat.chatId,
          receiverId: activeChat.id._id,
          message: null,
          media: uploadedFileUrl,
          mediaType: fileType,
        };

        socket.emit("send_message", socketPayload);
      })
      .catch((err) => {
        console.error("Media upload failed:", err);
      });
  };

  return (
    <div className="chat-area">
      <ChatHeader activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatMessages messages={messages} />

      <ChatMessageInputArea
        message={message}
        handleSend={handleSend}
        handleMedia={handleMedia}
      />
    </div>
  );
}

export default ChatArea;

// useEffect(() => {

//     const formData = {
//       chatRoomId: activeChat.chatId,
//     };

//     axios
//       .post("http://localhost:8000/api/v1/message/get-all-messages", formData, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         const allMessages = res.data.data;

//         const formattedMessages = allMessages.map((msg) => {
//           const date = new Date(msg.createdAt);

//           return {
//             text: msg.message,
//             file: null,
//             time: date.toLocaleTimeString("en-IN", {
//               timeZone: "Asia/Kolkata",
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//             view: msg.receiverId === activeChat.id._id ? "sender" : "receiver",
//           };
//         });

//         setMessages(formattedMessages);
//       })
//       .catch((err) => {
//         alert(err.response?.data.message || "Something went wrong");
//       });

//   }, [activeChat.id._id, activeChat.chatId]);

//   const handleSend = () => {
//     const inputValue = message.current.value;
//     if (inputValue.trim() === "") {
//       return;
//     }

//     const formData = {
//       chatRoomId: activeChat.chatId,
//       receiverId: activeChat.id._id,
//       message: inputValue,
//       media: null,
//     };

//     axios
//       .post("http://localhost:8000/api/v1/message/new-message", formData, {
//         withCredentials: true,
//       })
//       .then((data) => {
//         const date = new Date(data.data.data.createdAt);

//         const newMessage = {
//           text: data.data.data.message,
//           file: null,
//           time: date.toLocaleTimeString("en-IN", {
//             timeZone: "Asia/Kolkata",
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           view:
//             data.data.data.receiverId === activeChat.id._id
//               ? "sender"
//               : "receiver",
//         };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       })
//       .catch((err) => {
//         alert(err.response?.data.message);
//       });

//     message.current.value = "";
//   };

// const handleMedia = (file) => {
//     const fileURL = URL.createObjectURL(file);
//     const fileType = file.type;

//     const newMessage = {
//       text: null,
//       file: fileURL,
//       fileType: fileType,
//       name: file.name,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };
