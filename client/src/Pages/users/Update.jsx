import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../Styles/Update.css";
import axios from 'axios';

function Update(){
    let [userDetails, setUserDetails] = useState({userEmail: "", userPassword: ""});
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const userDetailsHandler = (e)=>{
        setUserDetails((curr)=>(
            {
                ...curr,
                [e.target.name]: e.target.value
            }
        ))
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Updating...");
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/update/password`, userDetails, {withCredentials: true});
            setUserDetails({userEmail: "", userPassword: ""})
            navigate("/login")
            toast.update(toastId, {render: response.data.message, type: "success", autoClose: 2000, isLoading: false});
        } catch (error) {
            console.error(error);
            toast.update(toastId, {render: error.response.data.message, type: "error", autoClose: 2000, isLoading: false});
        } finally{
            setLoading(false);
        }
    }
    return(
        <div className="update-container">
            <form className='form-container' onSubmit={submitHandler}>
                <input type="email" name="userEmail" id="userEmail" placeholder='Registered Email' value={userDetails.userEmail} onChange={userDetailsHandler} required/>
                <input type="password" name="userPassword" id="userPassword" placeholder='Enter new password' value={userDetails.userPassword} onChange={userDetailsHandler} required />
                <button type='submit' className='click-btn'>Update password</button>
                <hr />
                <Link to="/login" className='link-default'>Already have Account</Link>
                <Link to= "/signup" className='link-default green-btn'>Create new Account</Link>
            </form>
        </div>
    )
}

export default Update;