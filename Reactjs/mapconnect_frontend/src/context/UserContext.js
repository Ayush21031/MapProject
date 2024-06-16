// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/user/userdetail', {
//                     method: 'GET',
//                     credentials: 'include',
//                 });
                
//                 if (response.ok) {
//                     const data = await response.json();
//                     setUser(data);
//                 } else {
//                     if (response.status === 401 || response.status === 403) {
//                         navigate('/login');
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching user details:', error);
//             }
//         };

//         fetchUserDetails();
//     }, [navigate]);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };



import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/userdetail', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
