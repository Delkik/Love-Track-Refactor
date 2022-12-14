import love_track_logo from "../images/love_track_logo.png"
import "../styles/loading.css"


function ErrorPage({action, status}) {

    return (
        <div className="loading-main">
            <div className='titleBtn' id='titleBtn'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>
            <div className="quote">
                <h1>{status}</h1>
                <h3>{action}</h3>
            </div>
        </div>
    );
}

export default ErrorPage;