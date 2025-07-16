import { FiSend } from "react-icons/fi";
import MediaUploader from "./MediaUploader";

function ChatMessageInputArea({ message, handleSend, handleMedia }) {
  return (
    <div className="message-input-area">
      <MediaUploader handleMedia={handleMedia} />
      <input
        type="text"
        placeholder="Type a message"
        className="message-input"
        ref={message}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="send-button" onClick={handleSend}>
        <FiSend />
      </button>
    </div>
  );
}
export default ChatMessageInputArea;
