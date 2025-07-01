import { useState } from "react";
import "../../Styles/Intro.css"
import axios from "axios";

function Intro(){
    let [question, setQuestion] = useState("Why programmers doesn't like light");
    let [punchline, setPunchline] = useState("Because Light attract Bugs");
    let [loading, setLoading] = useState("Generate")

    const jokeAPI = "https://official-joke-api.appspot.com/jokes/random";

    const jokeHandler = async()=>{
        try {
            setLoading("Generating")
            const res = await axios.get(jokeAPI);
            if(!res){
                console.log("unable to fetch");
            }
            setQuestion(res.data.setup);
            setPunchline(res.data.punchline);
        } catch (error) {
            console.error(error);
            setQuestion("Oops!")
            setPunchline("Something went wrong")
        }
        finally{
            setLoading("Generate");
        }
    }
    return(
        <div className="profile-intro ">
            <h1>RANDOM JOKES</h1>
            <p className="setup">Setup: {question}</p>
            <p className="punchline">Punchline: {punchline}</p>
            <button className="neon-btn" onClick={jokeHandler} type="button" disabled={loading === "Generating..."} >{loading}</button>
        </div>
    )
}


export default Intro;