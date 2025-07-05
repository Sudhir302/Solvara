import Navcard from "./Navcard";
import ProfileImage from "./ProfileImage";
import Logout from "./Logout";
import "../../Styles/Navbar.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
    const { userId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    let[username,setUsername] = useState("")
    let[currentId, setCurrentId] = useState("")

    const slidebarHandler = () => {
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        const userHandler = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/details`, {withCredentials: true});
                if(!response){
                    console.log("no data found");
                }
                setUsername(response.data.user.userName)
                setCurrentId(response.data.currentId);
            } catch (error) {
               console.error(error);
               toast.error(error.response.data.message); 
            }
        }
        userHandler();
    },[userId])

    return (
        <div className="navbar-container">
            <div className="navbar">
                <Link to={`/profile/${currentId}/home`} className="small-profile">
                    <ProfileImage />
                </Link>

                <div className="home-container">
                    <Link to={`/profile/${currentId}`} className="nav-card-container">
                        <i className="fa-solid fa-house"></i>
                    </Link>
                    <Navcard name={<i className="fa-solid fa-video"></i>} path="/video" />
                    <Navcard name={<i className="fa-brands fa-facebook-messenger"></i>} path="/under/development" />
                    <Navcard name={<i className="fa-solid fa-store"></i>} path="/marketplace" />
                    <div className="clock">
                        <Navcard name={<i className="fa-solid fa-qrcode"></i>} path="/qr" />
                    </div>
                    <i className="fa-solid fa-bars nav-card-container" onClick={slidebarHandler}></i>
                </div>

                <div className="logout-nav"><Logout /></div>

                <div className={`mobile-nav ${isOpen ? "active" : "slidebar"}`}>
                    <i className="fa-solid fa-xmark" onClick={slidebarHandler}></i>
                    <Link to={`/profile/${userId}/home`}>
                        <ProfileImage />
                    </Link>
                    <p>{username || "Solvara"}</p>
                    <Link to={`/profile/${userId}/search/users`}>
                        <button className="neon-btn">Search User</button>
                    </Link>
                    <div className="mobile-logout">
                        <Logout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
