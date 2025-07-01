import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

import "../../Styles/ProfileDetails.css";
import { toast } from "react-toastify";

function ProfileDetails(){
    
    let[getProfileImg, setGetProfileImg] = useState(null);
    let[username, setUsername] = useState("Solvora");

    const {userId} = useParams();

    useEffect(()=>{
        const userHandler = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/details`, {withCredentials: true});
                if(!response){
                    toast.error("unable to fetch data");
                }
                setGetProfileImg(response.data.user.profilePicture);
                setUsername(response.data.user.userName)
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.message);
            }
        };
        userHandler();
    }, [userId])


    return(
        <div className="profile-details-container">
            <div className="profile-home-img">
                <img src={getProfileImg} alt="Profile img" />
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
                <Link to = {`/profile/${userId}/update/profile`}><button className="neon-btn">Edit Profile</button></Link>
            </div>
        </div>
    );
}

export default ProfileDetails;