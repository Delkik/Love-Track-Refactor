import { json, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../components/ChatBox";
import Navbar from "../components/Navbar";
import Navtab from "../components/Navtab";
import "../styles/match.css"

export default function Match(){
    let data = useSelector(state => state.user.value)
    const [showChat, setShow] = useState(false)
    const [matchedInfo, setInfo] = useState()
    const [allChats, setChats] =useState([])

    useEffect(()=>{
        console.log(data)
        fetch("http://localhost:5000/chats", {
            method:"POST",
            body:data.user.spotify_id,
            credentials:"include"
          }).then(async res => {
             const data = await res.json()
             setChats(data)
        }).catch(error=>{
            console.log(error)
          })    
        },[])

    const checkInfo = (chat) => {
        console.log("i am being clicked")
        setInfo(chat)
        setShow(true)
        console.log(matchedInfo)
    }

    if (Object.keys(data).length === 0){
        return <Navigate to="/"/>
    }

    const users = [
        {name:"Lana Rose", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)", userId: 142},
        {name:"Andrew Tate", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)",  userId: 143},
        {name:"Monica Vernandez", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)",  userId: 144},
        {name:"Alia Suave", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)",  userId: 145},
        {name:"Shostam Barvav", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)",  userId: 146},
        {name:"Justin Williams", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)",  userId: 147}
    ]

    return (
        <div>
            <Navbar/>
            <div className='screenSettings'>
            {!showChat ?
            <div>
                <div className='match-header'>
                    <h2>MATCHES</h2>
                </div>
                
                <div className='chats'>
                    { allChats.length ?
                        allChats.map((chat, idx) => {
                        return (
                            <div key={idx} className='chat'>
                                <table>
                                    <tbody onClick={() => checkInfo(chat)}>
                                        <tr>
                                            <td rowSpan={2}> <img className="match-image" src={chat.picture} alt="hi"></img></td>
                                            <td className='name'>{chat.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='message'>{chat.history[chat.history.length-1]["ms"]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                        }) : 
                        <div className="social-empty">
                            <h2>Nothing to see here!</h2>
                            <p>Get started by matching with others!!</p>
                        </div> 
                    }
                </div> </div>:
                <div><Chat name = {data.user.name} matchedName = {matchedInfo["name"]}  matchedPic = {matchedInfo["picture"]} ownerId = {data.user.spotify_id} theType = {"matches"} func = {setShow} history = {matchedInfo["history"]}/></div>}
            </div>
            <Navtab/>
        </div>
    )
}