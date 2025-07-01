import { Link } from "react-router-dom";

import "../../Styles/Intronav.css";

const handleLogoClick = ()=>{
    window.location.reload();
}

function Intronav(){
    return(
        <div className="intronav">
            <strong className="logo-name" onClick={handleLogoClick}>Solvara</strong>
            <div className="intronav-link">
                <a href="#home" className="underline">Home</a>
                <a href="#about" className="underline">About</a>
                <a href="#features" className="underline">Features</a>
                <Link to="/login" className="neon-btn">Log in</Link>
            </div>
        </div>
    )
}

export default Intronav;