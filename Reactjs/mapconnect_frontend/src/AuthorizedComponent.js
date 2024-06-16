// import React, { useEffect, useState } from 'react';

// const AuthorizedComponent = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       try {
//         const response = await fetch('http://localhost:3000/user/userdetail', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         const result = await response.json();
//         console.log('Authorized data:', result);
//         setUserData(result);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>User Data</h1>
//       {/* Render user data */}
//       <pre>{JSON.stringify(userData, null, 2)}</pre>
//     </div>
//   );
// };

// export default AuthorizedComponent;
