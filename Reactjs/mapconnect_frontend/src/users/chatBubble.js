import React from 'react';
import "./ChatBubble.css";

const ChatBubble = (props) => {
  const chat = props.chats;
  const selectedUser = props.curr_chat;
  const thisUser = props.thisUser
  const isSenderThisUser = chat.sender === thisUser;
  console.log(
    "chat.chat_id:", 
    chat.chat_id,
    "\n",
    "selectedUser.chat_id:",
    selectedUser.chat_id,
  )
  if (chat.chat_id === selectedUser.chat_id) {
    return (
      <div className={`chat ${isSenderThisUser ? "chat-left" : "chat-right"}`}>
        <div className="chat-sender">{chat.contact_name}</div>
        <div className="chat-message">{chat.msg}</div>
        <div className="chat-time">{chat.date_time}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ChatBubble;
