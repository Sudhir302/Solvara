import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {toast} from 'react-toastify';
import "../../Styles/Signup.css";
import axios from "axios";

function Signup(){
    let [userDetails, setUserDetails] = useState({userName: "", userEmail: "", userPassword: ""});
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserDetails = (e)=>{
        setUserDetails((curr)=>(
            {...curr,
            [e.target.name]: e.target.value}
        ))
        console.log(userDetails);
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Creating Account...");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/signup`, userDetails, {withCredentials: true});
            toast.update(toastId, {render: response.data.message, type: "success", isLoading: false, autoClose: 2000})
            navigate("/login");
        } catch (error){
            console.error(error);
            toast.update(toastId, {type: "error", render: error.response.data.message, autoClose: 2000, isLoading: false});
        } finally{
            setLoading(false);
        }
    }
    return(
        <div className="signup-container">
            <form className="form-container" onSubmit={submitHandler}>
                <input type="text" name="userName" id="user-name" placeholder="Your Full Name" onChange={handleUserDetails} value={userDetails.userName} required/>
                <input type="email" name="userEmail" id="user-email" placeholder="Your Email" onChange={handleUserDetails} value={userDetails.userEmail} required/>
                <input type="password" name="userPassword" id="user-password" placeholder="Your Password" onChange={handleUserDetails} value={userDetails.userPassword} required />
                <button type='submit' className='click-btn' disabled = {loading}>{loading ? "Creating..." : "Signup"}</button>
                <hr />
                <Link to= "/login" className='link-default green-btn'>Already Have Account</Link>
            </form>
        </div>
    )
}

export default Signup;