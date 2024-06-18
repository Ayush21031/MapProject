import React, { createContext, useState, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [userToken, setUserToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/user/userdetail', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchUserData();
      // setUserToken(0);
    }
  }, [userToken, fetchUserData]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};


