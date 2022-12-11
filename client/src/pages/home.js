import Navtab from "../components/Navtab";
import { Link, Navigate } from "react-router-dom";
import "../styles/HomePage.css"
import settings from "../images/settings_button.png"
import match from "../images/matching_button.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import love_track_logo from '../images/love_track_logo.png'

export default function HomePage(){
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate();
    const tokens = useSelector(state => state.tokens.value)
    // console.log(user, tokens)
    console.log(tokens)

    if (Object.keys(user).length === 0){
      return <Navigate to="/"/>
    }

    return (
      <div>
        <div className="header">
          <div className="header_item">
            <Link to="/settings">
              <img src={settings} alt="Settings" className="settings"/>
            </Link>
          </div>
        </div>
        <div className='titleBtn' id='titleBtn'>
          <img className="logo" src={love_track_logo}/>
          <h1>LoveTrack</h1>
        </div>
        <div>
          <div className="matching">
            <img src={match} alt="Start Matching"  onClick={(event) => {navigate("/lyrics")}}/>
          </div>
          <div className="matching_text">
            <p>Start Matching?</p>
          </div>
        </div>
			<Navtab/>
      </div>   
	)
}