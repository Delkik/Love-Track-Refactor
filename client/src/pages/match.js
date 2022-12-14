import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "../styles/match.css"
import { Navigate } from "react-router-dom";
import Chat from "../components/ChatBox";


export default function Match(){
	// const [data, setData] = useState();
	const [pythonData, setPythonData] = useState();
    let data = useSelector(state => state.user.value)
    const [userD, setD]  = useState(useSelector(state => state.user.value))
    const [showChat, setShow] = useState(false)
    const [matchedInfo, setInfo] = useState()

    useEffect(() => {
        console.log("this is the user data")
        console.log(userD)
    }, [])

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

	// useEffect(() =>{
	// 	fetch(process.env.REDIRECT+"api/kmeans", {
    //         method: "POST",
    //         body: JSON.stringify(terminalPayload, function(k, v) { return v === undefined ? "" : v; })
    //     })
    //     .then(async res => {
    //         const data = await res.json();
	// 		setPythonData(data)
    //         console.log(data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
	// }, [])
    

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
                    { users.length ?
                        users.map((chat, idx) => {
                        return (
                            <div key={idx} className='chat'>
                                <table>
                                    <tbody onClick={() => checkInfo(chat)}>
                                        <tr>
                                            <td rowSpan={2}> <img className="match-image" src={chat.picture} alt="hi"></img></td>
                                            <td className='name'>{chat.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='message'>{chat.preview}</td>
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
                <div><Chat name = {"Imtiaz"} matchedName = {matchedInfo["name"]} theType = {"matches"} func = {setShow}/></div>}
            </div>
            <Navtab/>
        </div>
    )
}