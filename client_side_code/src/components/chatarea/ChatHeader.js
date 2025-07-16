import { useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import UpdateContact from "./UdateContact";

function ChatHeader({ activeChat, setActiveChat }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [contactName, setContactName] = useState(activeChat.name);
  return (
    <div className="chat-header">
      <div className="chat-header">
        {setActiveChat && (
          <button className="back-button" onClick={() => setActiveChat(null)}>
            ←
          </button>
        )}
        <div className="user-avatar"></div>
        <p>
          {activeChat.name} | {activeChat.id.phone}
        </p>
      </div>
      <div>
        <p onClick={() => setShowUpdateModal(true)}>
          <RiMore2Fill />
        </p>
      </div>
      <UpdateContact
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        setContactName={setContactName}
        contactPhone={activeChat.id.phone}
      />
    </div>
  );
}
export default ChatHeader;
