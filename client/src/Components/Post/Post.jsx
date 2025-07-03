import { useEffect, useState } from "react";
import "../../Styles/Post.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post(){

    let [posts, setPosts] = useState([]);
    let[likes, setLikes] = useState({});


    const {userId} = useParams();

    const likeHandler = async(postId)=>{
        try {
            console.log(postId)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/post/${postId}/like`, {userId}, {withCredentials:true});
            const totalLike = res.data.totalLike;
            setLikes((curr)=>({
                ...curr,
                [postId]: totalLike,
        }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const postHandler = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/post`, {withCredentials: true});
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

    useEffect(() => {
        const initialLike = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/post/like/all-post`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    setLikes(res.data.likes); // { postId: count }
                }
            } catch (error) {
                console.log(error);
            }
        };

        initialLike();
    }, [userId]);

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
                            <p id="like" onClick={()=>likeHandler(post._id)}><i className="fa-solid fa-thumbs-up"></i><strong>{likes[post._id] || 0}</strong></p>
                            <p id="comment"><i className="fa-solid fa-comment"></i><strong>Comment</strong></p>
                        </div>
                    </div>)
                )
            }
        </div>
    )
}

export default Post;


