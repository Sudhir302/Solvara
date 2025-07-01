import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Styles/Login.css";
import axios from "axios";


function Login(){
    let [userDetails, setUserDetails] = useState({userEmail: "", userPassword: ""});
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const userDetailsHandler = (e)=>{
        setUserDetails((curr)=>({
            ...curr,
            [e.target.name]: e.target.value
        }));
    }
    
    const submithandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Sigining in...")
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/signin`, userDetails, {withCredentials: true});
            setUserDetails({userEmail: "", userPassword: ""});
            toast.update(toastId, {render: response.data.message, type: "success", isLoading: false, autoClose: 2000});
            navigate(`/profile/${response.data.userId}`);
        } catch (error) {
            console.log(error);
            toast.update(toastId, {render: error.response.data.message, type: "error", isLoading: false, autoClose: 2000})
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="signin-container">
            <form className="form-container" onSubmit={submithandler}>
                <input type="email" name="userEmail" id="user-email" placeholder="Your Email" value={userDetails.userEmail} onChange={userDetailsHandler} required />
                <input type="password" name="userPassword" id="user-password" placeholder="Your Password" value={userDetails.userPassword} onChange={userDetailsHandler} required />
                <button type='submit' className="click-btn" disabled = {loading}>{loading ? "Signing in" : "Login"}</button>
                <hr />
                <Link to= "/update/password" className="link-default" >Forgot Password</Link>
                <Link to= "/signup" className="link-default green-btn">Create new account</Link>
            </form>
        </div>
    )
}
export default Login;