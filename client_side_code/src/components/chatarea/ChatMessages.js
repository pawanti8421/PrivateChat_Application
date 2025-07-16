import { useEffect, useRef, useState } from "react";
import MediaPreview from "./MediaPreview";

function ChatMessages({ messages }) {
  const bottomRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages">
      {/* <div className="message received">Hi! how are you</div> className="message sent"*/}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.view === "sender" ? "sent" : "received"}`}
        >
          {msg.file ? (
            <>
              {msg.fileType.startsWith("image/") && (
                <img
                  src={msg.file}
                  alt="media"
                  className="sent-image"
                  onClick={() => setPreview({ type: "image", src: msg.file })}
                />
              )}

              {msg.fileType.startsWith("video/") && (
                <video
                  controls
                  className="sent-video"
                  onClick={() => setPreview({ type: "video", src: msg.file })}
                >
                  <source src={msg.file} type={msg.fileType} />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Document links */}
              {(msg.fileType === "application/pdf" ||
                msg.fileType.includes("wordprocessingml")) && (
                <a href={msg.file} target="_blank" rel="noopener noreferrer">
                  📄 {msg.name}
                </a>
              )}

              {/* Fallback */}
              {!msg.fileType.startsWith("image/") &&
                !msg.fileType.startsWith("video/") &&
                !msg.fileType.includes("pdf") &&
                !msg.fileType.includes("wordprocessingml") && (
                  <a href={msg.file} target="_blank" rel="noopener noreferrer">
                    📎 {msg.name}
                  </a>
                )}
            </>
          ) : (
            msg.text
          )}

          <span className="message-time">{msg.time}</span>
        </div>
      ))}

      <div ref={bottomRef} />

      <MediaPreview preview={preview} setPreview={setPreview} />
    </div>
  );
  /* <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
          >
            {msg.text}
            <span className="message-time">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div> */
}

export default ChatMessages;
