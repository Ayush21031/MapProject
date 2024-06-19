import React from 'react';
import "./userCard.css";

const UserCard = ({ index, contact, onClick }) => {
  return (
    <div
      key={index}
      className="card"
      onClick={() => onClick(contact)}
    >
      <div className="card-dp">
        {contact.dp ? (
          <img src={contact.dp} alt="dp" />
        ) : (
          <div className="placeholder-dp">No Image</div>
        )}
      </div>
      <div className="card-details">
        <p className="contact-name">{contact.contact_name}</p>
        <small className="top-msg">{contact.topMsg}</small>
      </div>
    </div>
  );
};

export default UserCard;
