import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "../../Styles/Logout.css";

function Logout(){

    const navigate = useNavigate();

    const logoutHandle = async()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/logout`,{}, {withCredentials: true});
            if(!response){
                console.log("no response");
            }
            toast.success(response.data.message);
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
    }

    return (
        <button className='neon-btn click-btn logout' onClick={logoutHandle}>Logout</button>
    )
}

export default Logout;