import React from "react";
import "../styles/music.css"
import cover from "../images/neverRecover.jpg"
import rightNext from "../images/rightNext.png"
import Player from "../components/SongPlayer";
import Navtab from "../components/Navtab";
import { Link } from "react-router-dom";
import chatIcon from "../images/chatIcon.png"
import { useSelector } from "react-redux";

export default function Music(){
    
    let tokens = useSelector(state => state.tokens.value)

    return(
        <div>
            <div className="music-container">
            <h2 className="music-name">Rajpreet</h2>
            <div className="music-albumCover">
                <img src={cover} alt="Album cover" className="music-cover"/>
            </div>
            <Link to="/chat">
            <img src={chatIcon} alt="chat" className="music-chat"/>
            </Link>
            <img src={rightNext} alt="rightNext" className="music-rightNext"/>
            
            </div>

            <Player accessToken={tokens.accessToken} trackUri={["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}/> {/* change track based on song */}

            <Navtab/>

        </div>
    )
}