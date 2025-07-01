import { Link } from 'react-router-dom';
import "../../Styles/Nopage.css";
function Nopage(){
    return(
        <div className="no-page-container">
            <div className="no-page">
                <p className='four-zero-four'>404</p>
                <p className='page-not-found'>PAGE NOT FOUND</p>
                <p className='emoji'>🥺</p>
                <Link to= "/" className='neon-btn link-default'>Go to Dashboard</Link>
            </div>
        </div>
    )
}

export default Nopage;