import Navbar from "../../Components/Navbar/Navbar";
import CoverPicture from "./CoverPicture";
import ProfileDetails from "./ProfileDetails";
import UserPost from "../../Components/Post/UserPost";

import "../../Styles/ProfileHome.css";

function ProfileHome(){
    return(
        <div className="profile-home-container">
            <div className="profilehome-navbar">
                <Navbar />
            </div>
            <div className="combined-profilehome">
                <div className="profilehome-coverpicture">
                    <CoverPicture />
                </div>
                <div className="profilehome-profiledetails">
                    <ProfileDetails />
                </div>
            </div>
            <div className="profilehome-posts">
                <UserPost />
            </div>
        </div>
    )
}

export default ProfileHome;