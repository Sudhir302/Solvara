import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Loading from "../Pages/users/Loading";

function Owner({children}){
    const {userId} = useParams();

    let[currentId, setCurrentId] = useState();
    let[loading, setLoading] = useState(true);

    useEffect(()=>{
        const authHandler = async ()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/details`, {withCredentials: true});

                if(!res){
                    console.log("could not fetch data");
                }
                setCurrentId(res.data.currentId);
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }
        }
        authHandler();
    },[])

    if(loading){
        return(
            <Loading />
        )
    }

    else{
        if(currentId === userId){
            return children;
        }
        else{
            return (
            <Navigate to="*" />
        )
        }
    }

}

export default Owner;