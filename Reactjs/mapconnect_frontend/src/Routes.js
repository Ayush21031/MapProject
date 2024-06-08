import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import UserPage from './UserPage';
import AuthorizedComponent from './AuthorizedComponent';
import Room from './Room';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserPage/>}/>
        <Route path="/auth" element={<AuthorizedComponent/>}/>
        <Route path="/room" element={<Room/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
