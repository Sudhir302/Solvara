import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Loading from "../Pages/users/Loading";
import { toast } from "react-toastify";



function Protected({children}){
    
    let[isAuthenticated, setIsAuthenticated] = useState(false);
    let[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

        const authCheck = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/user`, {withCredentials: true});
                if(!res){
                    toast.error("error fetching data")
                }
                setIsAuthenticated(res.data.success);
            } catch (err) {
                console.error(err);
            }
            finally{
                setIsLoading(false);
            }
        }

        authCheck();
    },[])

    if(isLoading){
        return(
            <Loading />
        )
    }
    else{
        return(
            isAuthenticated ? children : <Navigate to= "/" />
        )
    }
}

export default Protected;