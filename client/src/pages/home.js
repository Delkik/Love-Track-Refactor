import Navtab from "../components/Navtab";
// import styles from '../styles/HomePage.module.css'
import { Link, useLocation } from "react-router-dom";
import "../styles/HomePage.css"
import settings from "../images/settings_button.png"
import match from "../images/matching_button.png"
import { useSelector } from "react-redux";

export default function HomePage(){
    const {state} = useLocation();
    // const user = useSelector(state => state.user.value)
    const tokens = useSelector(state => state.tokens.value)
    // console.log(user, tokens)
    console.log(tokens)

    return (
      	<div>
			<div className="header">
				<div className="header_item">
					<Link to="/settings">
						<img src={settings} alt="Settings" className="settings"/>
          </Link>
        </div>
			</div>
			<div className="titleBtn">
            <p>LoveTrack</p>
            </div>
            <div >
              <div className="matching">
                <img src={match} alt="Start Matching" />
              </div>
              <div className="matching_text">
                <p>Start Matching?</p>
              </div>
            </div>
			<Navtab/>
      	</div>  
	)
}