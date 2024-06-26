import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async (chat_id) => {
    if (!chat_id) return;
    
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/user/getmsg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "chat_id":chat_id }),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail);
      }
      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

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
      if (!res.ok) {
        throw new Error(data.detail);
      }
    } catch (error) {
      console.log(error)
    }
  
  }) 

  return (
    <MessageContext.Provider value={{ messages, loading, error, fetchMessages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

