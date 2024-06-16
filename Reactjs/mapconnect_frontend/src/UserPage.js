// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import Roomcard from "./Roomcard";
// import "./UserPage.css";

// const UserPage = () => {
//   const location = useLocation();
//   const { username } = location.state || { username: "User" }; // Default to 'User' if username is not provided
//   // const { rooms } = location.state || { rooms: [] }; // Default to 'User' if username is not provided
//   const [formData, setFormData] = useState({
//     roomcode: "",
//   });

//   const [rooms, setRooms] = useState(location.state.rooms || []);

//   // setRooms(location.state.rooms);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const sendRoomCode = async (e) => {
//     e.preventDefault();
//     console.log("Room code:", formData.roomcode);
//     if (formData.roomcode === "") {
//       alert("Please enter a room code");
//     }
//     else{
//       // alert("Room code: " + formData.roomcode);
//       const useremail = localStorage.getItem("email");
//       const data = {
//         email: useremail,
//         roomid: formData.roomcode,
//       };
//       const response = await fetch("http://localhost:3000/room/join", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       console.log("Server response:", result);
//       if (result.message === "Successfully joined the room") {
//         alert("Room joined successfully");
//         setRooms([...rooms, formData.roomcode]);
//       } else {
//         alert("Error joining room");
//       }
//     }
//   };

//   const createroom = async () => {
//     console.log("Creating room");
//     // alert("Creating room");
//     // generate random code
//     const useremail = localStorage.getItem("email");
//     const data = {
//       email: useremail,
//     };

//     const response = await fetch("http://localhost:3000/room/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     console.log("Server response:", result);
//     if (result.message === "Room created") {
//       alert("Room created successfully with code"+result.roomid);
//       setRooms([...rooms, result.roomid]);
//       //update rooms list with new room
//       // console.log("Updating rooms list"+result.roomlist);


//     } else {
//       alert("Error creating room");
//     }

//   };


//   return (
//     <div className="user-page">
//       <h1>Welcome, {username}!</h1>
//       <button onClick={createroom}>Create Room</button>
//       <form onSubmit={sendRoomCode}>
//         <button type="submit">Join Room</button>
//         <input
//           type="text"
//           name="roomcode"
//           placeholder="Room Code"
//           value={formData.roomcode}
//           onChange={handleChange}
//           required
//         />
//       </form>

//       <div>
//         <h2>Your Rooms</h2>

//         {rooms.map((room) => (
//           <Roomcard key={room} room_id={room} />
//         ))}
  

//       </div>


//     </div>
    
//   );
// };

// export default UserPage;

// import React, { useContext } from "react";
// import { UserContext } from "./context/UserContext";

// const UserPage = () => {
//   const { user } = useContext(UserContext);

//   return (
//     <div>
//       <h1>Welcome to User Page</h1>
//       {user && (
//         <div>
//           <h2>{user.firstName} {user.lastName}</h2>
//           <p>{user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserPage;


import React, { useState } from "react";

const UserPage = () => {
  return (
    <div>
      <h1>Welcome to User Page</h1>
    </div>
  );
}

export default UserPage;
