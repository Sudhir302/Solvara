import {useParams} from "react-router-dom";
import axios from "axios"

import { useState } from "react";
import "../../Styles/Upload.css";
import { toast } from "react-toastify";

function Upload(){

    let[filename, setFilename] = useState("Select Image");
    let[postImg, setPostImg] = useState(null);
    let[postCaption, setPostCaption] = useState("");

    const {userId} = useParams();

    const postCaptionHandler = (e)=>{
        setPostCaption(e.target.value);
    }

    const postImgHandler = (e)=>{
        const file = e.target.files[0];
        console.log(file)
        if(file){
            setPostImg(file);
            setFilename(file.name)
        }

    }

    const postSubmitHandler = async(e)=>{
        e.preventDefault();
        setPostCaption("");
        setFilename("Select Image");
        try {
            const formData = new FormData();
            formData.append("postImg", postImg);
            formData.append("postCaption", postCaption);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/upload/post`, 
                formData, 
                {
                    withCredentials: true, 
                    headers:{"Content-Type": 'multipart/form-data'}
                }
            );

            if(!res){
                console.log("failed to post")
            }
            console.log(res);
            toast.success("Post Uploaded");
        } catch (error) {
            console.error(error);
            toast.error(error.res.data.message);
        }
    }


    return(
        <form className="upload-container" onSubmit={postSubmitHandler}>
            <label htmlFor="post"><i className="fa-solid fa-image"></i><br/><span>{filename}</span></label>
            <input type="file" name="postImg" id="post" onChange={postImgHandler} required/>
            <input type="text" name="caption" id="enter-caption" placeholder="Enter Caption" onChange={postCaptionHandler} value={postCaption} required />
            <button type="submit" className="neon-btn"><i className="fa-solid fa-cloud-arrow-up"></i></button>
        </form>
    )
}

export default Upload;