import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../../Styles/ProfileImage.css";

function ProfileImage(){
    
    let [profileImg, setProfileImg] = useState(undefined);

    useEffect(()=>{
        const getProfileImg = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/me`, {withCredentials: true});
                setProfileImg(res.data.profileImg)
            } catch (err) {
                console.error(err);
            }
        }
        getProfileImg();
    },[]);

    return(
        <img src={profileImg} className="logo" />
    )
}

export default ProfileImage;










{/* <img src="/S.png" alt="logo" className="logo" onClick={refreshPage} /> */}
    // const refreshPage = ()=>{
    //     window.location.reload();
    // }