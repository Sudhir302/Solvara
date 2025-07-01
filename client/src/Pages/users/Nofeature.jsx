import { Link } from "react-router-dom";

function Nofeature(){
    return(
        <div className="no-page-container">
            <div className="no-page">
                <p className='four-zero-four' style={{fontSize: "4.5rem"}}>Feature</p>
                <p className='page-not-found'>Under Development</p>
                <p className='emoji'>🥺</p>
                <Link to= "/" className='neon-btn link-default'>Go to Dashboard</Link>
            </div>
        </div>
    )
}

export default Nofeature;