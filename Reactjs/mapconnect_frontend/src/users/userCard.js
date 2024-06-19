import React from 'react';
import "./userCard.css"


const UserCard = (props) => {
  const handleClick = (contact_name) => {
    alert(`You clicked on ${contact_name}`);
  };

  const { index, contact } = props;

  return (
    <div
      key={index}
      className="card"
      onClick={() => handleClick(contact.contact_name)}
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
