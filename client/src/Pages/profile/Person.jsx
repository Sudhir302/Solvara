import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import UserPost from "../../Components/Post/UserPost";

import { Link } from "react-router-dom";

function Person(){
    const {userId} = useParams();

    let[profileImg, setProfileImg] = useState(null);
    let[username, setUsername] = useState("");
    let[coverImg, setCoverImg] = useState(null);

    useEffect(()=>{
        const personHandler = async ()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/details`, {withCredentials: true})
                const coverRes = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/coverImg`, {withCredentials: true});
                if(!res || !coverRes){
                    console.log("couldn't fetch data");
                }
                setProfileImg(res.data.user.profilePicture);
                setUsername(res.data.user.userName);
                setCoverImg(coverRes.data.coverImg);
            } catch (error) {
                console.error(error);
            }
        }

        personHandler();
    },[userId]);
    return(
        <div className="person-container profile-home-container">
            <div className="profilehome-navbar">
                <Navbar />
            </div>
            <div className="combined-profilehome">
                <div className="cover-img profilehome-coverpicture">
                    <img src={coverImg} alt="CoverImg" />
                </div>
                <div className="profile-details-container profilehome-profiledetails">
                    <div className="profile-home-img">
                        <img src={profileImg} alt="Profile img" />
                        <p id="username">
                            <strong>{username}</strong>
                        </p>
                    </div>
                    <div className="profile-details">
                        <p id="followers">
                            <strong>10</strong>
                            <br />Followers
                        </p>
                        <p id="following">
                            <strong>9</strong> 
                            <br />Following
                        </p>
                        <Link to = "/under/development"><button className="neon-btn">Follow</button></Link>
                    </div>
                </div>
                <div className="profilehome-posts">
                    <UserPost />
                </div>
            </div>
        </div>
    )
}

export default Person;