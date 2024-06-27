import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
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
import UserOptions from "./UserOptions";

const UserPage = () => {
  const { userData, fetchUserData } = useContext(UserContext);
  const { contacts, fetchContacts } = useContext(ContactContext);
  const { messages, fetchMessages, setMessages } = useContext(MessageContext);
  const [msg, setmsg] = useState('');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatViewRef = useRef(null);
  const [showoptions, setshowoptions] = useState(false);
  const [incognitoModes, setIncognitoModes] = useState({});

  const scrollToBottom = useCallback(() => {
    if (chatViewRef.current) {
      const scrollToBottomIfNeeded = () => {
        const { scrollTop, scrollHeight, clientHeight } = chatViewRef.current;
        const maxScrollTop = scrollHeight - clientHeight;

        // Check if we're already at the bottom (within 20px tolerance)
        if (maxScrollTop - scrollTop > 20) {
          chatViewRef.current.scrollTop = maxScrollTop;
          // If we haven't reached the bottom, request another animation frame
          requestAnimationFrame(scrollToBottomIfNeeded);
        }
      };

      // Start the scrolling process
      requestAnimationFrame(scrollToBottomIfNeeded);
    }
  }, []);

  const addMsg = useCallback(async (chat_id, sender, msg, date_time) => {
    if(incognitoModes[chat_id] && incognitoModes[chat_id] === true){
      // console.log('Incognito mode enabled for this chat!');
      setMessages([...messages, { chat_id, msg, sender, date_time }]);
      scrollToBottom();
      socket.emit('send_message', { chat_id, sender, msg , date_time, contact_name: selectedUser.contact_name })
    }
    else{

      try {
        const res = await fetch('http://localhost:3000/user/addmsg/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "chat_id": chat_id, "sender": sender, "msg": msg, "date_time": date_time }),
          credentials: 'include'
        });
  
        const data = await res.json();
        setMessages([...messages, { chat_id, msg, sender, date_time }]);
        scrollToBottom();
        socket.emit('send_message', { chat_id, sender, msg, date_time, contact_name: selectedUser.contact_name })
        if (!res.ok) {
          throw new Error(data.detail);
        }
      } catch (error) {
        console.log(error)
      }
    }

  })




  useEffect(() => {
    if (userData && userData.email) {
      const newsocket = io('http://localhost:3000', { query: { email: userData.email } });
      setSocket(newsocket);

      return () => {
        newsocket.disconnect();
      }
    }
  }, [userData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // useEffect(() => {
  //   if (socket) {

  //     socket.on('new_message', ({ chat_id, msg, sender, date_time }) => {
  //       if (selectedUser && selectedUser.chat_id === chat_id) {
  //         // fetchMessages(chat_id);
  //         setMessages([...messages, { chat_id, msg, sender, date_time }]);
  //         scrollToBottom();
  //       }
  //     });

  //     socket.on('incognito_mode_on', ({ from }) => {
  //       incognitoModes[from] = true;
  //       console.log('Incognito mode enabled for this chat!')
  //       console.log('value of incognitoModes');
  //       //print the value of incognitoModes
  //       console.log(incognitoModes);
  //     })

  //     socket.on('incognito_mode_off', ({ from }) => {
  //       incognitoModes[from] = false;
  //       console.log('Incognito mode disabled for this chat!')
  //       console.log('value of incognitoModes')
  //       console.log(incognitoModes);
  //     })
  //   }
  // })


  useEffect(() => {
    if (socket) {
      socket.on('new_message', ({ chat_id, msg, sender, date_time }) => {
        if (selectedUser && selectedUser.chat_id === chat_id) {
          setMessages(prevMessages => [...prevMessages, { chat_id, msg, sender, date_time }]);
          scrollToBottom();
        }
      });
  
      socket.on('incognito_mode_on', ({ from }) => {
        setIncognitoModes(prevModes => ({
          ...prevModes,
          [selectedUser.chat_id]: true
        }));
        console.log('Incognito mode enabled for this chat!');
      });
  
      socket.on('incognito_mode_off', ({ from }) => {
        setIncognitoModes(prevModes => ({
          ...prevModes,
          [selectedUser.chat_id]: false
        }));
        console.log('Incognito mode disabled for this chat!');
      });
  
      return () => {
        socket.off('new_message');
        socket.off('incognito_mode_on');
        socket.off('incognito_mode_off');
      };
    }
  }, [socket, selectedUser]);
  

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

  const handleshowoptionsfunc = () => {
    setshowoptions(true);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseOptions = () => {
    setshowoptions(false);
  }

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

  // const handleUserCardClick = (contact) => {
  //   setIsFading(true);
  //   setTimeout(() => {
  //     setSelectedUser(contact);
  //     setIsFading(false);
  //   }, 500);
  // };
  const handleUserCardClick = (contact) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedUser(contact);
      setIsFading(false);
      // Reset incognito mode when switching to a different chat
      if (!incognitoModes[contact.chat_id]) {
        setIncognitoModes(prevModes => ({
          ...prevModes,
          [contact.chat_id]: false
        }));
      }
    }, 500);
  };


  // const handleToggleIncognito = () => {
  //   if (selectedUser) {
  //     setIncognitoModes(prevModes => ({
  //       ...prevModes,
  //       [selectedUser.chat_id]: !prevModes[selectedUser.chat_id]
  //     }));
  //     if(incognitoModes[selectedUser.chat_id] && incognitoModes[selectedUser.chat_id] === true){
  //       // console.log('Incognito mode enabled for this chat!');
  //       socket.emit("incognito_mode_on", { from: userData.email, to: selectedUser.contact_name })
  //     }
  //     else{
  //       socket.emit("incognito_mode_off", { from: userData.email, to: selectedUser.contact_name })
  //     }
  //   }
  // };

  const handleToggleIncognito = () => {
    if (selectedUser) {
      const newIncognitoStatus = !incognitoModes[selectedUser.chat_id];
      setIncognitoModes(prevModes => ({
        ...prevModes,
        [selectedUser.chat_id]: newIncognitoStatus
      }));
      
      if (newIncognitoStatus) {
        socket.emit("incognito_mode_on", { from: userData.email, to: selectedUser.contact_name });
      } else {
        socket.emit("incognito_mode_off", { from: userData.email, to: selectedUser.contact_name });
      }
    }
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
  
  const handleSend = () => {
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
              setoptions = {handleshowoptionsfunc}
            />
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
                value={msg}
                onChange={handleChange}
                required
              />
              <button className="send-button" onClick={
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
      {showoptions && (
        <UserOptions 
          onClose={handleCloseOptions} 
          isIncognito={selectedUser ? (incognitoModes[selectedUser.chat_id] || false) : false}
          onToggleIncognito={handleToggleIncognito}
          // socket={socket}
        />
      )}
    </div>
  );
};

export default UserPage;


