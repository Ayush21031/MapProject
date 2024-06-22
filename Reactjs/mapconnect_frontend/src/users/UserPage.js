// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/UserContext";
// import { ContactContext } from "../context/ContactContext";
// import { useNavigate } from "react-router-dom";
// import "./UserPage.css";
// import { IoMdPersonAdd } from "react-icons/io";
// import { BiLogOut } from "react-icons/bi";
// import { data_chats, chat_js } from "./data";
// import UserCard from "./userCard";
// import ChatBubble from "./chatBubble";
// import ChatHeader from "./chatHeader";
// import AddPersonPopup from "./AddPersonPopup";
// import Cookies from "js-cookie";
// import { IoSend } from "react-icons/io5";

// const UserPage = () => {
//   const { userData, fetchUserData } = useContext(UserContext);
//   const { contacts, fetchContacts } = useContext(ContactContext);
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedUserChats, setSelectedUserChats] = useState([]);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   useEffect(() => {
//     if (userData && userData.email) {
//       fetchContacts(userData.email);
//     }
//   }, [userData, fetchContacts]);

//   useEffect(() => {
//     if (selectedUser) {
//       const userChats = data_chats.filter(chat => chat.userId === selectedUser.id);
//       setSelectedUserChats(userChats);
//     }
//   }, [selectedUser]);

//   useEffect(() => {
//     console.log("Contacts are -:", contacts);
  
//   })

//   const handleAddPersonClick = () => {
//         setShowPopup(true);
//       };
    
//       const handleClosePopup = () => {
//         setShowPopup(false);
//       };
//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   if (!userData.firstName) {
//     navigate("/login");
//   }

//   if (userData.message === "Unauthorized!") {
//     navigate("/login");
//   }

//   const handleUserCardClick = (contact) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setSelectedUser(contact);
//       setIsFading(false);
//     }, 500);
//   };

//   const thisUser = userData.email;
//   console.log('This User:', thisUser);
//   const messages = data_chats;

//   const filteredAndSortedChats = chat_js
//     .filter(chat => chat.participants.includes(thisUser))
//     .sort((a, b) => new Date(` ${a.time}`) - new Date(` ${b.time}`));

//   const contacts_new = filteredAndSortedChats.map(chat => {
//     const participant = chat.participants.find(email => email !== thisUser);
//     return {
//       chat_id: chat.chat_id,
//       contact_name: participant,
//       dp: "",
//       topMsg: chat.time
//     };
//   });

//   const handleLogout = async () => {
//     console.log('Logging out...');
//     Cookies.remove("token");
//     try {
//       const response = await fetch('http://localhost:3000/user/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//       });
//       console.log('Logout response:', response);
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <div className="main-div">
//       <div className="function-button-column">
//         <button className="addperson" onClick={handleAddPersonClick}>
//           <IoMdPersonAdd />
//         </button>
//         <button className="logout" onClick={() => {
//           handleLogout();
//           navigate("/login");
//         }}>
//           <BiLogOut />
//         </button>
//       </div>

//       <div className="chatlist-column">
//         <div className="inner-chatlist-column">
//           {contacts.map((contact, index) => (
//             <UserCard key={index} index={index} contact={contact} onClick={() => handleUserCardClick(contact)} />
//           ))}
//         </div>
//       </div>

//       <div className="chat-column">
//         {selectedUser ? (
//           <>
//             <ChatHeader
//               profilePic={selectedUser.profilePic}
//               name={selectedUser.contact_name}
//               status={selectedUser.status}
//             />
//             <div className={`person-chat-view ${isFading ? 'fade-out' : ''}`}>
//               {selectedUserChats.map((chat, index) => (
//                 <ChatBubble key={index} chats={chat} curr_chat={selectedUser} />
//               ))}
//             </div>
//             <div className="person-chat-input">
//               <textarea
//                 type="text"
//                 placeholder="Type a message"
//                 className="input-message"
//               />
//               <button className="send-button">
//                 <IoSend />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="welcome-message">
//             <h1>WELCOME TO X-CHAT</h1>
//           </div>
//         )}
//       </div>
//       {showPopup && <AddPersonPopup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default UserPage;












import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ContactContext } from "../context/ContactContext";
import { MessageContext } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import { IoMdPersonAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { data_chats, chat_js } from "./data";
import UserCard from "./userCard";
import ChatBubble from "./chatBubble";
import ChatHeader from "./chatHeader";
import AddPersonPopup from "./AddPersonPopup";
import Cookies from "js-cookie";
import { IoSend } from "react-icons/io5";

const UserPage = () => {
  const { userData, fetchUserData } = useContext(UserContext);
  const { contacts, fetchContacts } = useContext(ContactContext);
  const { messages, fetchMessages } = useContext(MessageContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData && userData.email) {
      fetchContacts(userData.email);
    }
  }, [userData, fetchContacts]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.chat_id);
    }
  }, [selectedUser, fetchMessages]);

  useEffect(() => {
    console.log("Contacts are -:", contacts);
  });

  const handleAddPersonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

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
    }, 500);
  };

  const thisUser = userData.email;
  console.log('This User:', thisUser);

  const handleLogout = async () => {
    console.log('Logging out...');
    Cookies.remove("token");
    try {
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      console.log('Logout response:', response);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
    const filteredAndSortedChats = contacts
    .filter(chat => chat.participants.includes(thisUser))
    .sort((a, b) => new Date(` ${a.time}`) - new Date(` ${b.time}`));

  const contacts_new = filteredAndSortedChats.map(chat => {
    const participant = chat.participants.find(email => email !== thisUser);
    return {
      chat_id: chat.chat_id,
      contact_name: participant,
      dp: "",
      topMsg: chat.time
    };
  });

  return (
    <div className="main-div">
      <div className="function-button-column">
        <button className="addperson" onClick={handleAddPersonClick}>
          <IoMdPersonAdd />
        </button>
        <button className="logout" onClick={() => {
          handleLogout();
          navigate("/login");
        }}>
          <BiLogOut />
        </button>
      </div>

      <div className="chatlist-column">
        <div className="inner-chatlist-column">
          {contacts_new.map((contact, index) => (
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
              <button className="send-button">
                <IoSend />
              </button>
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
