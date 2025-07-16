import axios from "axios";
import React, { useRef } from "react";

function UpdateContact({
  showUpdateModal,
  setShowUpdateModal,
  setContactName,
  contactPhone,
}) {
  const name = useRef("");

  const handleUpdateContact = () => {
    let contactNewName = name.current.value;

    if (!contactNewName) {
      alert("Please fill field.");
      return;
    }

    const formData = {
      contactNewName,
      contactPhone,
    };

    axios
      .post(
        "http://localhost:8000/api/v1/contact/update-contact-detail",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        alert(data.data.message);
        setContactName(contactNewName);
      })
      .catch((err) => {
        alert(err.response?.data.message);
      });

    setShowUpdateModal(false);
    name.current.value = "";
  };

  return (
    <>
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-box">
            {/* <h2>Update Contact</h2> */}
            <input type="text" placeholder="Enter new name" ref={name} />
            <button className="btn-primary" onClick={handleUpdateContact}>
              Update Name
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateContact;
