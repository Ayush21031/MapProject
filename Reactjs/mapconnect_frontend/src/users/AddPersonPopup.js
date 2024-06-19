// AddPersonPopup.js
import React from "react";
import "./AddPersonPopup.css";
import { IoMdClose } from "react-icons/io";

const AddPersonPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>Add a new person</h2>
        <input type="text" placeholder="Enter name" className="popup-input" />
        <button className="popup-add-button">Search</button>
      </div>
    </div>
  );
};

export default AddPersonPopup;
