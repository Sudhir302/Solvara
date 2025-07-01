import Intronav from '../../Components/Navbar/Intronav';
import Technology from '../../Components/Dashboard/Technology';
import Features from '../../Components/Dashboard/Features';
import Footer from '../../Components/Dashboard/Footer';

import { Link } from 'react-router-dom';

import "../../Styles/Dashboard.css";
import Home from '../../Components/Dashboard/Home';

function Dashboard(){
    return(
        <div className="dashboard-container">
            <div className="nav-dash">
                <Intronav />
            </div>
            <div className="home-dash">
                <Home />
            </div>
            <div className="tech-dash">
                <Technology />
            </div>
            <div className="feature-dash ">
                <Features />
            </div>
            <div className="footer-dash">
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;