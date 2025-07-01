import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"

import "../../Styles/CoverPicture.css";

function CoverPicture(){

    let[coverImg, setCoverImg] = useState(null);
    let[getCoverImg, setGetCoverImg] = useState(null);
    let[show, setShow] = useState(false);
    let[loading, setLoading] = useState(false);
    let[preview, setPreview] = useState(null);
    let[previewShow, setPreviewShow] = useState(false);

    const {userId} = useParams();

    const showHandler = ()=>{
        if(show){
            setShow(false);
        }
        else{
            setShow(true);
        }
    }

    const previewHandler = async()=>{
        if(previewShow){
            setPreviewShow(false);
        }
        else{
            setPreviewShow(true);
        }
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/coverImg`, {withCredentials: true});
            if(!res){
                console.log("no response");
            }
            setPreview(res.data.coverImg)
        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    const coverImgHandler = (e)=>{
        setCoverImg(e.target.files[0]);
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(!coverImg){
            toast.error("Select Image First");
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("coverImg", coverImg);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/coverImg`,
                formData,
                {
                    withCredentials: true,
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',
                    }
                }
            )
            if(!response){
                console.log("problem with the backend");
            }
            console.log(response);
            toast.success(response.data.message);
            
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
        finally{
            setLoading(false)
        }
            
    }

    useEffect(()=>{
        const getCoverImg = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/coverImg`, {withCredentials: true});
                if(!res){
                    console.log("no response from backend");
                }
                setGetCoverImg(res.data.coverImg);
            } catch (err) {
                console.error(err);
            }
        };
        getCoverImg();
    },[]);
    return(
        <div className="cover-container">
            <div className="cover-img">
                <img src={getCoverImg} alt="Cover Image" onClick={showHandler}/>
            </div>

            <form onSubmit={submitHandler} className="coverImg-form" style={{display: show ? "block" : "none"}}>
                <input type= "file" name="coverImg" id="coverImg" onChange={coverImgHandler} required/>
                <button type="submit" className="neon-btn" disabled= {loading} style={{background: loading? "green" : "blue"}}> {loading? "Updating" : "Update" }</button>
                <div className="preview" style={{display: previewShow?  "block" : "none"}}>
                    <img src={preview} alt="Preview" />
                </div>
                <button type="button" className="neon-btn" onClick={previewHandler}>Preview</button>
            </form>
        </div>
    )
}

export default CoverPicture;