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
  // const { userToken, userData, fetchUserData, setUserData } = useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (userToken) {
  //     console.log("Fetching data in UserPage");
  //     fetchUserData();
  //   }
  // }, [userToken, fetchUserData]);

  // if (!userData) {
  //   // setUserData({message: "Unauthorized!"});
  //   return(
  //     <div>
  //       <h1>Please Login First</h1>
  //       <button className="please-login" onClick={() => navigate("/login")}>Login</button>
  //     </div>
  //   )
  // }
  // if(userData.message === "Unauthorized!") {
  //   navigate("/login");
  // }


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
          // <div
          //   key={index}
          //   className="card"
          //   onClick={() => handleClick(contact.contact_name)}
          // >
          //   <div className="card-dp">
          //     {contact.dp ? (
          //       <img src={contact.dp} alt="dp" />
          //     ) : (
          //       <div className="placeholder-dp">No Image</div>
          //     )}
          //   </div>
          //   <div className="card-details">
          //     <h1 className="contact-name">{contact.contact_name}</h1>
          //     <small className="top-msg">{contact.topMsg}</small>
          //   </div>
          // </div>
          <UserCard key={index} index={index} contact={contact} />
        ))}
      </div>

      <div className="chat-column">
        {/* <div className="person-chat-header">
          <div className="person-profile-pic">
            <img src="C:\Users\Madhur Gupta\Desktop\NodeWSL\MapProject\Reactjs\mapconnect_frontend\react-profile-pic.png" />
          </div>
          <div className="person-chat-name">
            Madhur
            <div className="person-chat-status">Online</div>
          </div>
          <div className="person-chat-options">
            <CgOptions />
          </div>
        </div> */}
        <ChatHeader 
          profilePic="C:/Users/Madhur Gupta/Desktop/NodeWSL/MapProject/Reactjs/mapconnect_frontend/react-profile-pic.png"
          name="Madhur"
          status="Online"
        />
        <div className="person-chat-view">
          {chats.map((chat, index) => (
            // if senderid==madhur then chat-right else chat-left
            // <div
            //   key={index}
            //   className={`chat ${
            //     chat.senderid === "Ayush" ? "chat-right" : "chat-left"
            //   }`}
            // >
            //   <div className="chat-sender">{chat.senderid}</div>
            //   <div className="chat-message">{chat.message}</div>
            //   <div className="chat-time">{chat.time}</div>
            // </div>
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
