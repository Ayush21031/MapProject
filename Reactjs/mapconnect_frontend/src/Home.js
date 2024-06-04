// import { Link } from "react-router-dom";

// function Home(){
//     return(
//         <div>
//             <h1>Welcome to Home</h1>
//             <button><Link to = "/login">Visit Login</Link></button>
//         </div>
//     );
// }
// export default Home;

import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS file

function Home() {
  return (
    <div>
      <div className="home-content">
        <h1>Welcome To MapConnect</h1>
        <p>Project in Development Phase</p>
        <Link to="/login" className="login-link">
          <button className="login">Try it ↗️</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;