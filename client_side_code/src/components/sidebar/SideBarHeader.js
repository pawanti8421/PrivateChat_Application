import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import AddContact from "./AddContact";
import { RiMore2Fill } from "react-icons/ri";
import Logout from "./Logout";
import SendRequestToContact from "../SendRequestToContact";

function SideBarHeader({ handleAddContact }) {
  const [showModal, setShowModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [showSendRequest, setShowSendRequest] = useState(false);
  return (
    <>
      <div className="header">
        <h2>Chats</h2>
        <div className="header-right">
          <p onClick={() => setShowModal(true)}>
            <IoAddCircleSharp className="add-button" />
          </p>
          <p onClick={() => setLogout(!logout)}>
            <RiMore2Fill />
          </p>
        </div>

        <AddContact
          showModal={showModal}
          setShowModal={setShowModal}
          handleAddContact={handleAddContact}
          setShowSendRequest={setShowSendRequest}
        />
        <SendRequestToContact
          showSendRequest={showSendRequest}
          setShowSendRequest={setShowSendRequest}
        />
      </div>
      <Logout logout={logout} />
    </>
  );
}
export default SideBarHeader;
