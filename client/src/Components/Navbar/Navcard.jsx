import { Link } from "react-router-dom";
import "../../Styles/Navcard.css";

function Navcard({name, path}){
    return(
        <div className="nav-card-container">
            <Link to={path} className="remove-default">{name}</Link>
        </div>
    )
}

export default Navcard;