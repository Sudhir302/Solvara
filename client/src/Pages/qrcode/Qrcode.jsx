import { Outlet, Link } from "react-router-dom";

import "../../Styles/Qrcode.css"

function Qrcode(){
    return(
        <div className="qr-code">
            <h1>Generate Text from Text or Image</h1>
            <nav className="qr-nav">
                <Link to= "/qr/image">From Image</Link>
                <Link to ="/qr/text">From Text</Link>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default Qrcode;