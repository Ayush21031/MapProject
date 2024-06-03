import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Welcome to Home</h1>
            <button><Link to = "/login">Visit Login</Link></button>
        </div>
    );
}
export default Home;