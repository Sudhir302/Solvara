import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

function Qrimage(){

    let[image, setImage] = useState(null);
    let[qrLink, setQrLink] = useState("Select Image");
    let[loading, setLoading] = useState(false);

    const imageHandler = (e)=>{
        console.log(e);
        setImage(e.target.files[0]);
    }

    const submitHandler = async(e)=>{
        try {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();
            formData.append("qrImage", image);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/qr/image`, formData, {withCredentials: true})
            setQrLink(response.data.image)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    
    return(
    <form onSubmit={submitHandler} className="qr-container">
        <div>
            <input type= "file" onChange={imageHandler} required />
            <button className="neon-btn" disabled={loading} >{loading ? "Generating" : "Generate"}</button>
        </div>
        <QRCode value={qrLink} />
    </form>
    )
}

export default Qrimage;