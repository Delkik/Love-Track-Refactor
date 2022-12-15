import React, { useEffect, useState } from "react";
import "../styles/music.css"
import rightNext from "../images/rightNext.png"
import Player from "../components/SongPlayer";
import { useNavigate } from "react-router-dom";
import chatIcon from "../images/chatIcon.png"
import { useSelector } from "react-redux";
import io from "socket.io-client"
import Chat from "../components/ChatBox";
import { Navigate } from "react-router-dom";
import filled from "../images/filled_social_media_button.png"
import social from "../images/social_media_button.png"



export default function Music(){
    let tokens = useSelector(state => state.tokens.value)
    let user_data = useSelector(state => state.user.value)
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const [fav, setFav] = useState(false)
    const [tracks, setTracks] = useState(useSelector(state => state.songs.value))
    const [socketI, setSocket] = useState("")
    const [potUsers, setPot] = useState(useSelector(state => state.potentials.value))
    const [me, setMe] = useState(useSelector(state => state.user.value))
    const [trackTime, setTime] = useState(tracks[0]["duration"])
    const [dip, setDip] = useState(1)


    const onClick = () => {
        setClicked(true)
        console.log("kgbvijdbf")
        console.log(me["user"]["name"])

        const socket = io("localhost:5000/", {
            transports: ["websocket"],
            cors: {
              origin: "http://localhost:3000/",
            },
          });  
        setSocket(socket)
    }

    const favClick = () => {
        if (fav){
            setFav(false)
        }else{
            setFav(true)
        }
    }

    useEffect(() => {
        // console.log("music page tracks")
        // console.log(tracks)
        const interval = setTimeout(() => {
            navigate("/home",)
        }, trackTime-500);
         return () => clearInterval(interval)
        // if(dip){
        //     navigate("/home",)
        // }
    }, [])
    const onClickX = () =>{
        setClicked(false)
        navigate("/home",)
    }


    if (Object.keys(user_data).length === 0){
        return <Navigate to="/"/>
    }


    return(
        <div>
            {!clicked ? 
            <div className="music-container">
            {/* <input type="text" placeholder='John...' onChange = {(event) => {setUsername(event.target.value)}}/> */}
            <h2 className="music-name">{potUsers[0]["name"]}, {potUsers[0]["age"]}</h2>
            <div className="music-albumCover">
                <img src={tracks[0]['image']} alt="Album cover" className="music-cover"/>
                <p className="songName">{tracks[0]['name']}</p>
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
            <Chat name = {user_data["user"]["name"]} matchedName = {potUsers[0]["name"]} ownerId = {user_data["user"]["spotify_id"]} matchedId = {potUsers[0]["spotify_id"]} duration = {tracks[0]['duration']}/>
            {/* <img className = "xButton" onClick={() => onClickX()} src={xButton} alt="White Button"/> */}
            <img onClick = {() => favClick()} className="like" src = {fav ? filled : social} />
            </div>
            }

            <div style={{visibility: "hidden"}}>
            <Player dip = {dip} accessToken={tokens.accessToken} trackUri={[tracks[0]["uri"]]} duration = {tracks[0]['duration']}/>
            </div>
        </div>
    )
}