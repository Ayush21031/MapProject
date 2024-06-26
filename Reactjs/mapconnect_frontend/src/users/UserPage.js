import React, { useContext, useEffect, useState , useCallback,useRef} from "react";
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
import io from 'socket.io-client';

const UserPage = () => {
  const { userData, fetchUserData } = useContext(UserContext);
  const { contacts, fetchContacts } = useContext(ContactContext);
  const { messages, fetchMessages, setMessages} = useContext(MessageContext);
  const [msg, setmsg] = useState('');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatViewRef = useRef(null);

  const scrollToBottom = () => {
    if (chatViewRef.current) {
      chatViewRef.current.scrollTop = chatViewRef.current.scrollHeight;
    }
  };
  
  const addMsg = useCallback( async (chat_id, sender, msg, date_time) =>{
    try {
      const res = await fetch('http://localhost:3000/user/addmsg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "chat_id":chat_id, "sender":sender, "msg":msg, "date_time":date_time }),
        credentials: 'include'
      });

      const data = await res.json();
      setMessages([...messages, {chat_id, msg, sender, date_time}]);
      scrollToBottom();
      socket.emit('send_message', {chat_id, sender, msg, date_time, contact_name: selectedUser.contact_name})
      if (!res.ok) {
        throw new Error(data.detail);
      }
    } catch (error) {
      console.log(error)
    }
  
  }) 




  useEffect(() => {
    if(userData && userData.email){
      const newsocket = io('http://localhost:3000', {query: {email: userData.email}});
      setSocket(newsocket);

       return () => {
        newsocket.disconnect();
      }
    }
  },[userData]);

  useEffect(() => {
    if(socket){

      socket.on('new_message', ({chat_id, msg, sender, date_time}) => {
        if(selectedUser && selectedUser.chat_id === chat_id){
          // fetchMessages(chat_id);
          setMessages([...messages, {chat_id, msg, sender, date_time}]);
          scrollToBottom();
        }
      });
    }
  })
  
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

  const handleChange = (e) => {
    setmsg(e.target.value);
  };


  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!userData.firstName) {
    navigate("/login");
    return null;
  }

  if (userData.message === "Unauthorized!") {
    navigate("/login");
    return null;
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
  const contacts_new = filteredAndSortedChats.map(chat => {
    const participant = chat.participants.find(email => email !== thisUser);
    return {
      chat_id: chat.chat_id,
      contact_name: participant,
      dp: "",
      topMsg: chat.time
    };
  });
  const handleSend = () =>{
    const chat_id = selectedUser.chat_id;
    const sender = thisUser;
    // const msg = document.querySelector('.input-message').value;
    const msg_user = msg;
    setmsg('');
    const date_time = new Date().toISOString();
    addMsg(chat_id, sender, msg_user, date_time);
    // document.querySelector('.input-message').value = '';
  }

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
            {/* <div className={`person-chat-view ${isFading ? 'fade-out' : ''}`}>
              {messages.map((chat, index) => (
                <ChatBubble key={index} chats={chat} thisUser= {thisUser} curr_chat={selectedUser} />
              ))}
            </div> */}
            <div ref={chatViewRef} className={`person-chat-view ${isFading ? 'fade-out' : ''}`}>
  {messages.map((chat, index) => (
    <ChatBubble key={index} chats={chat} thisUser={thisUser} curr_chat={selectedUser} />
  ))}
</div>
            <div className="person-chat-input">
              <textarea
                type="text"
                placeholder="Type a message"
                className="input-message"
                value = {msg}
                onChange={handleChange}
                required
              />
              <button className="send-button" onClick = {
                handleSend
              }>
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




// import React, { useContext, useEffect, useState, useCallback } from "react";
// import { UserContext } from "../context/UserContext";
// import { ContactContext } from "../context/ContactContext";
// import { MessageContext } from "../context/MessageContext";
// import { useNavigate } from "react-router-dom";
// import "./UserPage.css";
// import { IoMdPersonAdd } from "react-icons/io";
// import { BiLogOut } from "react-icons/bi";
// import UserCard from "./userCard";
// import ChatBubble from "./chatBubble";
// import ChatHeader from "./chatHeader";
// import AddPersonPopup from "./AddPersonPopup";
// import Cookies from "js-cookie";
// import { IoSend } from "react-icons/io5";
// import io from "socket.io-client";

// const UserPage = () => {
//   const { userData, fetchUserData } = useContext(UserContext);
//   const { contacts, fetchContacts } = useContext(ContactContext);
//   const { messages, fetchMessages } = useContext(MessageContext);
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isFading, setIsFading] = useState(false);
//   const [socket, setSocket] = useState(null); // State to hold socket instance

//   const addMsg = useCallback(async (chat_id, sender, msg, date_time) => {
//     try {
//       const res = await fetch("http://localhost:3000/user/addmsg/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           chat_id: chat_id,
//           sender: sender,
//           msg: msg,
//           date_time: date_time,
//         }),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.detail);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   // Initialize socket connection
//   useEffect(() => {
//     if (userData && userData.email) {
//       const newSocket = io("http://localhost:3000", {
//         query: { email: userData.email },
//       });
//       setSocket(newSocket);

//       // Clean up socket on component unmount
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [userData]);

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
//       fetchMessages(selectedUser.chat_id);
//     }
//   }, [selectedUser, fetchMessages]);

//   const handleAddPersonClick = () => {
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleChange = (e) => {
//     setMsg(e.target.value);
//   };

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   if (!userData.firstName) {
//     navigate("/login");
//     return null; // Ensure no further rendering after redirect
//   }

//   if (userData.message === "Unauthorized!") {
//     navigate("/login");
//     return null; // Ensure no further rendering after redirect
//   }

//   const handleUserCardClick = (contact) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setSelectedUser(contact);
//       setIsFading(false);
//     }, 500);
//   };

//   const thisUser = userData.email;

//   const handleLogout = async () => {
//     console.log("Logging out...");
//     Cookies.remove("token");
//     try {
//       const response = await fetch("http://localhost:3000/user/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       console.log("Logout response:", response);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const handleSend = () => {
//     const chat_id = selectedUser.chat_id;
//     const sender = thisUser;
//     const msg_user = msg;
//     setMsg("");
//     const date_time = new Date().toISOString();
//     addMsg(chat_id, sender, msg_user, date_time);
//   };

//   return (
//     <div className="main-div">
//       <div className="function-button-column">
//         <button className="addperson" onClick={handleAddPersonClick}>
//           <IoMdPersonAdd />
//         </button>
//         <button
//           className="logout"
//           onClick={() => {
//             handleLogout();
//             navigate("/login");
//           }}
//         >
//           <BiLogOut />
//         </button>
//       </div>

//       <div className="chatlist-column">
//         <div className="inner-chatlist-column">
//           {contacts.map((contact, index) => (
//             <UserCard
//               key={index}
//               index={index}
//               contact={contact}
//               onClick={() => handleUserCardClick(contact)}
//             />
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
//             <div className={`person-chat-view ${isFading ? "fade-out" : ""}`}>
//               {messages.map((chat, index) => (
//                 <ChatBubble
//                   key={index}
//                   chats={chat}
//                   thisUser={thisUser}
//                   curr_chat={selectedUser}
//                 />
//               ))}
//             </div>
//             <div className="person-chat-input">
//               <textarea
//                 type="text"
//                 placeholder="Type a message"
//                 className="input-message"
//                 value={msg}
//                 onChange={handleChange}
//                 required
//               />
//               <button className="send-button" onClick={handleSend}>
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
