import { useEffect, useState } from "react";
import "../../Styles/Post.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post(){

    let [posts, setPosts] = useState([]);

    const {userId} = useParams()

    useEffect(()=>{
        const postHandler = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/post`, {withCredentials: true})
                if(!res){
                    console.log("failed to fetch post");
                }
                setPosts(res.data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        postHandler();
    },[userId])

    return(
        <div className="post-father-container">
            {
                posts.map((post)=>(
                    <div className="post-container" key={post._id}>
                        <div className="profile-name">
                            <img src={post.userId.profilePicture} alt="profile" className="logo" />
                            <p><strong>{post.userId.userName}</strong></p>
                        </div>
                        <p id="caption">{post.caption}</p>
                        <div className="user-post">
                            <img src={post.postImg} alt="User Post" />
                        </div>
                        <div className="cmnt-like">
                            <p id="like"><i className="fa-solid fa-thumbs-up"></i><strong>Like</strong></p>
                            <p id="comment"><i className="fa-solid fa-comment"></i><strong>Comment</strong></p>
                        </div>
                    </div>)
                )
            }
        </div>
    )
}

export default Post;


