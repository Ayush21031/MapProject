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

  return (
    <MessageContext.Provider value={{ messages, loading, error, fetchMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
