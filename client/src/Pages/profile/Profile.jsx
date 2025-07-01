import Navbar from  "../../Components/Navbar/Navbar";
import Upload from "../../Components/Post/Upload";
import Post from "../../Components/Post/Post";

import "../../Styles/Profile.css"
import Contact from "./Contacts";
import Intro from "./Intro";

function Profile(){
    return(
        <div className="index-profile">
            <div className="profile-navbar">
                <Navbar />
            </div>
            <div className="profile-upload">
                <Upload />
            </div>
            <div className="profile-intro-post-contact">
                <div className="intro">
                    <Intro />
                </div>
                <div className="post">
                    <Post />
                </div>
                <div className="contact">
                    <Contact />
                </div>
            </div>
        </div>
    )
}

export default Profile;