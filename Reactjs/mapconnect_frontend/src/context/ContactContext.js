import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from './UserContext';
import Cookies from 'js-cookie';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const { userData } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async (email) => {
    if (!email) return;
    console.log("Inside fetchContacts");
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/user/getcontact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email":email }),
        credentials: 'include'
      });
      
      const data = await res.json();
      console.log('Contacts:', data);
      if (!res.ok) {
        throw new Error(data.detail);
      }
      setContacts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.email) {
      fetchContacts(userData.email);
    }
  }, [userData, fetchContacts]);

  return (
    <ContactContext.Provider value={{ contacts, loading, error, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
