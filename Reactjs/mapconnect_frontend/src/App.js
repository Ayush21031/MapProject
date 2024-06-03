import React from 'react';
import AppRoutes from './Routes';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* link login/signup button to login route */}
      {/* <button>Login/Signup</button> */}
      <AppRoutes />
    </div>
  );
}

export default App;
