import React from 'react';
import "./ChatBubble.css";

const ChatBubble = (props) => {
    const chat = props.chats;
  const isSenderAyush = chat.senderid === "Ayush";
  
  return (
    <div className={`chat ${isSenderAyush ? "chat-right" : "chat-left"}`}>
      <div className="chat-sender">{chat.senderid}</div>
      <div className="chat-message">{chat.message}</div>
      <div className="chat-time">{chat.time}</div>
    </div>
  );
};

export default ChatBubble;
