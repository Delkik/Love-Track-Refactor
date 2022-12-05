import React, { useState } from "react";
import "../styles/music.css"
import cover from "../images/neverRecover.jpg"
import rightNext from "../images/rightNext.png"
import Player from "../components/SongPlayer";
import Navtab from "../components/Navtab";
import { Link, useNavigate } from "react-router-dom";
import chatIcon from "../images/chatIcon.png"
import { useSelector } from "react-redux";
import io from "socket.io-client"
import Chat from "../components/ChatBox";


let socket = io.connect("http://127.0.0.1:5000")

export default function Music(){
    
    let tokens = useSelector(state => state.tokens.value)
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [socketI, setSocket] = useState("")

    const onClick = () => {
        setClicked(true)
        const socket = io("localhost:5000/", {
            transports: ["websocket"],
            cors: {
              origin: "http://localhost:3000/",
            },
          });  
        setSocket(socket)
    }

    return(
        <div>
            {!clicked ? 
            <div className="music-container">
            <h2 className="music-name">Rajpreet</h2>
            <div className="music-albumCover">
                <img src={cover} alt="Album cover" className="music-cover"/>
            </div>
            {/* <Link to="/chat"> */}
            <img 
                src={chatIcon} 
                alt="chat" 
                className="music-chat" 
                onClick={() => onClick()}/>
            {/* </Link> */}
            <img src={rightNext} alt="rightNext" className="music-rightNext"/>
            
            </div>
            :
            <Chat socket = {socketI}/>
            }
            <Player accessToken={tokens.accessToken} trackUri={["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}/>

        </div>
    )
}