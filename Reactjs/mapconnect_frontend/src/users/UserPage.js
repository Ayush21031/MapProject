import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import { IoMdPersonAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import {data_contact, data_chats} from "./data"
import UserCard from "./userCard";
import ChatBubble from "./chatBubble";
import ChatHeader from "./chatHeader"
const UserPage = () => {

  const { userData, fetchUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  if(!userData.firstName){
    navigate("/login");
  }

  if (userData.message === "Unauthorized!") {
    navigate("/login");
  }

  let chats = data_chats
  let contact = data_contact

  const handleClick = (contactName) => {
    alert(`You clicked on ${contactName}`);
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
        {contact.map((contact, index) => (
          <UserCard key={index} index={index} contact={contact} />
        ))}
      </div>

      <div className="chat-column">
        
        <ChatHeader 
          profilePic="C:/Users/Madhur Gupta/Desktop/NodeWSL/MapProject/Reactjs/mapconnect_frontend/react-profile-pic.png"
          name="Madhur"
          status="Online"
        />
        <div className="person-chat-view">
          {chats.map((chat, index) => (
            <ChatBubble key = {index} chats = {chat}/>
          ))}
        </div>
        <div className="person-chat-input">
          <textarea
            type="text"
            placeholder="Type a message"
            className="input-message"
          />
          <div classname="sending">
            <button className="send-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
