import React, { useRef } from "react";
import { IoMdAdd } from "react-icons/io";

function MediaUploader({ handleMedia }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && handleMedia) {
      handleMedia(file);
    }
  };

  return (
    <>
      <button className="add-media" onClick={handleButtonClick}>
        <IoMdAdd />
      </button>
      <input
        type="file"
        accept="*/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default MediaUploader;
