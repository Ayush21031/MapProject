import React from 'react';
import { CgOptions } from 'react-icons/cg';
import "./ChatHeader.css";

const ChatHeader = ({ profilePic, name, status }) => {
  return (
    <div className="person-chat-header">
      <div className="person-profile-pic">
        <img src={profilePic} alt="Profile" />
      </div>
      <div className="person-chat-name">
        {name}
        <div className="person-chat-status">{status}</div>
      </div>
      <div className="person-chat-options">
        <CgOptions />
      </div>
    </div>
  );
};

export default ChatHeader;
