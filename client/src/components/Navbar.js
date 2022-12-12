import love_track_logo from '../images/love_track_logo.png'
import settings from "../images/settings_button.png"
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

export default function Navbar(){
    return(
        <div className="navbar-main">
            <div className='navbar-item'>
                <div className='navbar-icon'>
                    <img src={love_track_logo} alt='title icon' />
                </div>
            </div>
            <div className='navbar-item settings-icon'>
                <Link to="/settings">
                    <img src={settings} alt="Settings" className="settings"/>
                </Link>
            </div>
        </div>
    )
}