import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function Room() {
  const location = useLocation();
  const { roomid } = location.state || { roomid: "Room" }; // Default to 'User' if username is not provided
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('join-room', roomid);
    });

    socket.on('message', (data) => {
      console.log(data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Join the room
    // socket.emit('joinRoom', roomid);

    // return () => {
    //   socket.off('connect');
    //   socket.off('message');
    // };
  }, [socket, roomid]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleSendMessage = () => {
    // socket.emit('message', roomid);
    socket.emit('message', { roomid, message });
    setMessage('');
  }

  return (
    <div className="Room">
      <h1>Room: {roomid}</h1>
      <input value={message} onChange={handleMessageChange} placeholder='Message'/>
      <button onClick={handleSendMessage}>Send Message</button>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;
