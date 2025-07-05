import { useState } from "react"
import QR from "react-qr-code"

function Qrtext(){
    let[text, setText] = useState("");

    const textHandler = (e)=>{
        setText(e.target.value);
    }
    return(
        <form onSubmit={(e)=> e.preventDefault()} className="qr-container">
            <div>
                <input type="text" name="qr-text" id="qr-text" value={text} onChange={textHandler} placeholder="Enter Text" className="text-input" />
            </div>
            <QR value= {text || "Type text to Generate Qr"} />
        </form>
    )
}

export default Qrtext;