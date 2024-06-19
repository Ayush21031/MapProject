import React, { useContext, useEffect, useState } from "react";
import {handleMadLOG} from "../SignIn";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
// import { IoPersonAddSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { data_contact, data_chats, chat_js } from "./data";
import UserCard from "./userCard";
import ChatBubble from "./chatBubble";
import ChatHeader from "./chatHeader";
import AddPersonPopup from "./AddPersonPopup"; // Import the AddPersonPopup component
import Cookies from "js-cookie";
import { IoSend } from "react-icons/io5";


const UserPage = () => {
  const { userData, fetchUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserChats, setSelectedUserChats] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const handleAddPersonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
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

  


  const thisUser = "madhur@gmail.com";
  const messages = data_chats

  const filteredAndSortedChats = chat_js
    .filter(chat => chat.participants.includes(thisUser))
    .sort((a, b) => new Date(` ${a.time}`) - new Date(` ${b.time}`));

  const contacts = filteredAndSortedChats.map(chat => {
    const participant = chat.participants.find(email => email !== thisUser);
    return {
      chat_id: chat.chat_id,
      contact_name: participant,
      dp: "", // Assume there's no DP in the provided data

      topMsg: chat.time // Using time as the top message for demonstration
    };
  });
  console.log(
    selectedUser
  )

  const handleLogout =  async() => {
    console.log('Logging out...');
    Cookies.remove("token");
    // // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    try{
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      // const result =  await response.json();
      console.log('Logout response:', response);
    }
    catch (error) {
      console.error('Error logging out:', error);
    }
  };



  return (
    <div className="main-div">
      <div className="function-button-column">
        <button className="addperson" onClick={handleAddPersonClick}>
          <IoMdPersonAdd />
          {/* <IoPersonAddSharp /> */}
        </button>
        <button className="logout" onClick={()=>{
          handleLogout();
          navigate("/login");
        }}>
          <BiLogOut />
        </button>
      </div>

      <div className="chatlist-column">
      <div className="inner-chatlist-column">
        {contacts.map((contact, index) => (
          <UserCard key={index} index={index} contact={contact} onClick={() => handleUserCardClick(contact)} />
        ))}
      </div>
      </div>

      <div className="chat-column">
        {selectedUser ? (
          <>
            <ChatHeader
              profilePic={selectedUser.profilePic}
              name={selectedUser.contact_name}
              status={selectedUser.status}
            />
            <div className={`person-chat-view ${isFading ? 'fade-out' : ''}`}>
              {messages.map((chat, index) => (
                <ChatBubble key={index} chats={chat} curr_chat={selectedUser} />
              ))}
              
            </div>
            <div className="person-chat-input">
              <textarea
                type="text"
                placeholder="Type a message"
                className="input-message"
              />
              {/* <div className="sending"> */}
                <button className="send-button">
                <IoSend />
                </button>
              {/* </div> */}
            </div>
          </>
        ) : (
          <div className="welcome-message">
            <h1>WELCOME TO X-CHAT</h1>
          </div>
        )}
      </div>
            {showPopup && <AddPersonPopup onClose={handleClosePopup} />}

    </div>
  );
};

export default UserPage;
