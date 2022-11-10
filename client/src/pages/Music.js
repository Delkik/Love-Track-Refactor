import React from "react";
import "../styles/music.css"
import cover from "../images/neverRecover.jpg"
import rightNext from "../images/rightNext.png"
import Player from "../components/SongPlayer";
import Cookies from 'universal-cookie';
import SpotifyPlayer from "react-spotify-web-playback"
import Navtab from "../components/Navtab";
import { Link, useLocation } from "react-router-dom";
import chatIcon from "../images/chatIcon.png"




const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=80a880567794471f984b65c54380f4c4&response_type=code&redirect_uri=http://localhost:3000/#/music&scope=user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Music(){
    const {state} = useLocation();
    const data = state
    const cookies = new Cookies()
    const params = new URLSearchParams(window.location.search)
    //const code = params.get("code")
    const code = "AQBTFdX4WaZab9MODjeBiUAKA39cM8fKaeQ4p4RerZsQWZlZAQNGnXCQ639hQoWP2TnMawAWjd2zXd5ifO-gfBipUxBp1FIf8TV77U5bYlOhdPyo8NaByEhRWgEDssZZEWOtw6cFcink2OdOytTjnLsdsGjq9vzIN88"
   
    console.log(code)

    return(
        <div>
            <div className="container">
            <h2 className="name">Rajpreet</h2>
            <a href={AUTH_URL}>
            <div className="albumCover">
                <img src={cover} alt="Album cover" className="cover"/>
            </div>
            </a>
            <Link to="/chat">
            <img src={chatIcon} alt="chat" className="chat"/>
            </Link>
            <img src={rightNext} alt="rightNext" className="rightNext"/>
            
            </div>

            <SpotifyPlayer
            token={"AQBblbIevkCjbl5Vo_o2BwZszYw1uQkwxQen7Ew4FyAzr9ehjAuJWnMJGuyqiyDCRynSptrOz0FFaoVyTHuj8iZNG_s5u8jvqQQpicXusGPEGIdmr7TPuiUNeWrvAiO2FuLvTr_7YLQt4iVR4mXbUB3EU2c4ZnOg70LvZHPs_34eRZPKGmr9cMCaCMPrk-oBhmik8qHphHsRCoE6Mb0sgCJ9sabllaeQ9aTpjmePMKvzqn_Am-_knM0083EJtT1uIXvWF0f1hHntgZt_E585AstkJ_NkHpsqUzll53JTTFsdbLHqW794kGqGdzX2ICmBOeyLqN7gEXsTWb3dGFeKxqsQa5iEnw"}
            play={true}
            uris = {["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}
            />

            <Navtab data={data}/>

        </div>
    )
}
