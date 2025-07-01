import { useEffect, useState } from "react";
import "../../Styles/Contact.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Contact(){

    let[people, setPeople] = useState([]);
    let[search, setSearch] = useState("");

    const {userId} = useParams();

    const inputHandler = (e)=>{
        setSearch(e.target.value);
    }

    useEffect(()=>{
        const contactHandler = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI_DEVELOPMENT}/profile/${userId}/show/people`, {withCredentials: true})
                if(!res){
                    console.log("Couldn't Fetch data");
                }
                setPeople(res.data.people);
            } catch (error) {
                console.log(error);
            }
        }

        contactHandler();
    }, [userId])

    const searchedUser = people.filter((person)=>(
        person.userName.toLowerCase().includes(search.toLowerCase())
    ))

    return(
        <div className="contact-container">
            <form className="search" onSubmit={(e)=>(e.preventDefault())}>
                <input type="text" name="search" id="search" placeholder="Search User" onChange={inputHandler} value={search} />
                <button type="submit" className="neon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className="people-container">
                {
                    searchedUser.map((person)=>(
                        <Link to={`/person/${person._id}`} className="remove-default" key={person._id}>
                            <div className="people" >
                                <img src={person.profilePicture} alt="" className="logo"/>
                                <p className="username">{person.userName}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Contact;