import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import { IoMdPersonAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { data_contact, data_chats } from "./data";
import UserCard from "./userCard";
import ChatBubble from "./chatBubble";
import ChatHeader from "./chatHeader";

const UserPage = () => {
  const { userData, fetchUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserChats, setSelectedUserChats] = useState([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (selectedUser) {
      // Generate fake chat data for the selected user (for emulation)
      const userChats = data_chats.filter(chat => chat.userId === selectedUser.id);
      setSelectedUserChats(userChats);
    }
  }, [selectedUser]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!userData.firstName) {
    navigate("/login");
  }

  if (userData.message === "Unauthorized!") {
    navigate("/login");
  }

  const handleUserCardClick = (contact) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedUser(contact);
      setIsFading(false);
    }, 500); // Match the duration of the CSS animation
  };

  return (
    <div className="main-div">
      <div className="function-button-column">
        <button className="add-person">
          <IoMdPersonAdd />
        </button>
        <button className="logout">
          <BiLogOut />
        </button>
      </div>

      <div className="chatlist-column">
        {data_contact.map((contact, index) => (
          <UserCard key={index} index={index} contact={contact} onClick={() => handleUserCardClick(contact)} />
        ))}
      </div>

      <div className="chat-column">
        {selectedUser ? (
          <>
            <ChatHeader
              profilePic={selectedUser.profilePic}
              name={selectedUser.name}
              status={selectedUser.status}
            />
            <div className={`person-chat-view ${isFading ? 'fade-out' : ''}`}>
              {selectedUserChats.map((chat, index) => (
                <ChatBubble key={index} chats={chat} />
              ))}
            </div>
            <div className="person-chat-input">
              <textarea
                type="text"
                placeholder="Type a message"
                className="input-message"
              />
              <div className="sending">
                <button className="send-button">Send</button>
              </div>
            </div>
          </>
        ) : (
          <div className="welcome-message">
            <h1>WELCOME TO X-CHAT</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
