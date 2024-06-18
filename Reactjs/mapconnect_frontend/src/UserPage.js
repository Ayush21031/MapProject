import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const { userToken, userData, fetchUserData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      console.log("Fetching data in UserPage");
      fetchUserData();
    }
  }, [userToken, fetchUserData]);

  if (!userData) {
    // setUserData({message: "Unauthorized!"});
    return(
      <div>
        <h1>Please Login First</h1>
        <button className="please-login" onClick={() => navigate("/login")}>Login</button>
      </div>
    )
  }
  if(userData.message === "Unauthorized!") {
    navigate("/login");
  }

  return (
    <div className="main-div">
      {/* <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
      <p>Email: {userData.email}</p> */}
      <div className="all-columns">
        <div className="function-button-column">

        </div>
        <div className="chatlist-column">

        </div>
        <div className="chat-column">
          
        </div>
      </div>
    </div>
  );
}

export default UserPage;




