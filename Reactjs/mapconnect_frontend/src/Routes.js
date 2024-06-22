// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import SignIn from "./SignIn";
// // import SignUp from "./SignUp";
// // import Home from "./Home";
// // import UserPage from "./UserPage";
// // import AuthorizedComponent from "./AuthorizedComponent";
// // import Room from "./Room";
// // import AuthRoute from "./AuthRoute";
// // const AppRoutes = () => {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<SignIn />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         {/* <Route path="/user" element={<UserPage />} />
// //         <Route path="/auth" element={<AuthorizedComponent />} />
// //         <Route path="/room" element={<Room />} /> */}
// //         <Route
// //           path="/user" element={
// //             <AuthRoute>
// //               <UserPage />
// //             </AuthRoute>
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default AppRoutes;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
// import Home from "./Home";
// import UserPage from "./UserPage";

// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/user" element={<UserPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import UserPage from "./users/UserPage";
import { UserProvider } from "./context/UserContext";
import { ContactProvider } from "./context/ContactContext";
import { MessageProvider } from "./context/MessageContext";

const AppRoutes = () => {
  return (
    <UserProvider>
      <ContactProvider>
        <MessageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </Router>
        </MessageProvider>
      </ContactProvider>
    </UserProvider>
  );
};

export default AppRoutes;
