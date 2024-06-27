import React from 'react';
import { CgOptions } from 'react-icons/cg';
import "./ChatHeader.css";

const ChatHeader = ({ profilePic, name, status, setoptions }) => {

  // const handleoptionclick = () => {
  //   setoptions();
  // };


  return (
    <div className="person-chat-header">
      <div className="person-profile-pic">
        <img src={profilePic} alt="Profile" />
      </div>
      <div className="person-chat-name">
        {name}
        <div className="person-chat-status">{status}</div>
      </div>
      <button className="person-chat-options" onClick={setoptions}>
        <CgOptions />
      </button>
    </div>
  );
};

export default ChatHeader;
