// import React, { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/user/userdetail", {
//         method: "GET",
//         credentials: "include",
//       });
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }

//       const data = await response.json();
//       setUser(data);
//     } catch (error) {
//       console.error("Failed to fetch user details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    // if (userToken) {
    //   fetchUserData();
    // }
    fetchUserData();
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};


