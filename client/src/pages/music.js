import React, { useState } from "react";
import "../styles/music.css"
import cover from "../images/neverRecover.jpg"
import rightNext from "../images/rightNext.png"
import Player from "../components/SongPlayer";
import Navtab from "../components/Navtab";
import { Link, useNavigate } from "react-router-dom";
import chatIcon from "../images/chatIcon.png"
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import Chat from "../components/ChatBox";
import xButton from "../images/whiteXButton.png"




//  let socket = io.connect("http://127.0.0.1:5000")

export default function Music(){
    const dispatch = useDispatch()
    let tokens = useSelector(state => state.tokens.value)
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [leftChat, setLeftChat] = useState(false)
    const [tracks, setTracks] = useState(useSelector(state => state.songs.value))
    const [socketI, setSocket] = useState("")
    const [potUsers, setPot] = useState(useSelector(state => state.potentials.value))
    const [userName, setUsername] = useState("")

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

    const onClickX = () =>{
        setClicked(false)
        setLeftChat(true)
        dispatch(setChat(true))
        navigate("/home",)

        //console.log(potUsers)

    }

    return(
        <div>
            {!clicked ? 
            <div className="music-container">
            <input type="text" placeholder='John...' onChange = {(event) => {setUsername(event.target.value)}}/>
            <h2 className="music-name">{potUsers[0]["name"]}</h2>
            <div className="music-albumCover">
                <img src={tracks[0]['i']} alt="Album cover" className="music-cover"/>
                <p>Song Name: {tracks[0]['n']}</p>
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
            <div>
            {/* <Chat socket = {socketI}/> */}
            <Chat name = {userName}/>
            {/* <img className = "xButton" onClick={() => onClickX()} src={xButton} alt="White Button"/> */}
            </div>
            }
            <Player accessToken={tokens.accessToken} trackUri={["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}/>

        </div>
    )
}