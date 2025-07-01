import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../../Styles/UpdateProfile.css";

function UpdateProfile(){

    let[profileImg, setProfileImg] = useState(null);
    let[username, setUsername] = useState("");
    let[loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {userId} = useParams();

    const handleUsername = (e)=>{
        console.log(e.target.value)
        setUsername(e.target.value);
    }

    const handlerProfileImg = (e)=>{
        setProfileImg(e.target.files[0])
    }

    const handleUserDetails = async(e)=>{
        setLoading(true);
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("profileImg", profileImg);
            formData.append("username", username);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/Update/profile`, formData, {withCredentials: true});
            if(!response){
                toast.error("update failed")
            }
            toast.success("Updated Successfully")
            navigate(`/profile/${userId}/home`)
            
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        const getProfileInfo = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/details`, {withCredentials: true});
                const user = response.data.user;
                setUsername(user.userName)
            } catch (err) {
                console.log(err)
            }
        }
        getProfileInfo();
    },[])


    return(
    <div className="profile-container ">
        <h1>Update Your Profile & Username</h1>
        <form onSubmit={handleUserDetails} className="form-container">
            <input type="text" name="username" value={username} onChange={handleUsername} required />
            <input type="file" name="" onChange={handlerProfileImg} required />            
            <button className="neon-btn" type="submit"> {loading? "updating": "Update"}</button>
        </form>
    </div>
    )
}

export default UpdateProfile;