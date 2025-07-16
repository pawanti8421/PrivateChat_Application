import axios from "axios";
import React, { useRef } from "react";

function AddContact({
  handleAddContact,
  showModal,
  setShowModal,
  setShowSendRequest,
}) {
  const name = useRef("");
  const phone = useRef("");

  const handleSubmit = () => {
    let contactName = name.current.value;
    let contactPhoneNumber = phone.current.value;
    if (!contactName || !contactPhoneNumber) {
      alert("Please fill both fields.");
      return;
    }

    const formData = {
      contactName,
      contactPhoneNumber,
    };
    setShowModal(false);

    axios
      .post(
        "https://privatechat-server.onrender.com/api/v1/contact/add-contact",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        alert(data.data.message);
        handleAddContact();
      })
      .catch((err) => {
        setShowSendRequest(true);
      });

    name.current.value = "";
    phone.current.value = "";
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Contact</h2>
            <input type="text" placeholder="Enter your name" ref={name} />
            <input
              type="tel"
              placeholder="Enter your phone number"
              ref={phone}
            />
            <button className="btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn-cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddContact;
