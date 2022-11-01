// import styles from '../styles/navtab.module.css';
import "../styles/Navtab.css"
import home from "../images/home_button.png"
import chat from "../images/chat_button.png"
import social from "../images/social_media_button.png"
import profile from "../images/justin.png"
import { useNavigate } from "react-router-dom"

export default function Navtab({data}){
    const navigate = useNavigate();
    const passData = (event, path) =>{
        navigate(path,{state: data})
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
                <div className="nav-main_item" // onClick = {(event) => {passData(event, "/social")}}
                >
                    <img src={social} alt="social" />
                </div>
                <div className="nav-main_item"
                // onClick = {(event) => {passData(event, "/profile")}}
                >
                    <img className="nav-profile_img" src={profile} alt="Profile" />
                </div>

            </div>
        </div>
    )

}