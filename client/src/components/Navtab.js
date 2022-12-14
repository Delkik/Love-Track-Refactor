import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import chat from "../images/chat_button.png"
import home from "../images/home_button.png"
import social from "../images/social_media_button.png"
import "../styles/Navtab.css"

export default function Navtab(){
    let user_data = useSelector(state => state.user.value)
    const navigate = useNavigate();
    const passData = (event, path) =>{
        navigate(path)
    }
    
    return(
        <div>
            <div className="nav-main">
                <div className="nav-main_item" onClick = {(event) => {passData(event, "/home")}}>
                    <img src={home} alt="Home" />
                </div>

                <div className="nav-main_item" onClick = {(event) => {passData(event, "/match")}}>
                    <img src={chat} alt="chat" />
                </div>
                <div className="nav-main_item" onClick = {(event) => {passData(event, "/social")}}>
                    <img src={social} alt="social" />
                </div>
                <div className="nav-main_item" onClick = {(event) => {passData(event, "/profile")}}>
                    <img className="nav-profile_img" src={user_data.user.profile_img ? user_data.user.profile_img : "https://i.imgur.com/V4RclNb.png"} alt="Profile" />
                </div>

            </div>
        </div>
    )

}