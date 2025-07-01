import { Link } from "react-router-dom";

import "../../Styles/Home.css"

function Home(){
    return(
        <section id="home" className="home">
            <p className="headline">Connect. Share. Discover.</p>
            <p className="sub-headline">A Social platform to connect with friends, share your stories, and build communities</p>
            <Link to = "/signup" className= "link-default neon-btn click-btn">Get Started</Link>
        </section>
    )
}

export default Home;