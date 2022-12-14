import spotify from "../images/spotify-logo.png"
import "../styles/Login.css"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=80a880567794471f984b65c54380f4c4&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20streaming"

export default function Login(){

    return (
        <div className="container">

            <main className="main">
                <div className="title">
                    <h1>LoveTrack</h1>
                </div>

                <a href={AUTH_URL}>
                <div className="login">
                    <div className="loginbutton">
                        <img src={spotify} alt="Spotify Logo" width="32" height="32"/>
                        <div id="logtext">LOG IN WITH SPOTIFY</div>
                    </div>
                </div>
                </a>
                
            </main>
        </div>
    )
}