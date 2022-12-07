import Navtab from "../components/Navtab";
// import styles from '../styles/HomePage.module.css'
import { Link } from "react-router-dom";
import "../styles/HomePage.css"
import settings from "../images/settings_button.png"
import match from "../images/matching_button.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setSongs } from "../redux/songs";

export default function HomePage(){
    // const user = useSelector(state => state.user.value)
    const navigate = useNavigate();
    const tokens = useSelector(state => state.tokens.value)
    // console.log(user, tokens)
    console.log(tokens)
    useEffect(() => {
      fetch("http://localhost:5000/user_tracks", {
            method: "GET",
            credentials:"include",
        }).then(async res => {
            const data = await res.json()
            dispatch(setSongs(data))
            // console.log(tracks)
        }).catch(error=>{
            console.log(error)
          })
    }, []);

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
              <button className="matching" onClick={(event) => {navigate("/lyrics")}}>
                <img src={match} alt="Start Matching" />
              </button>
              <div className="matching_text">
                <p>Start Matching?</p>
              </div>
            </div>
			<Navtab/>
      	</div>  
	)
}