import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "../styles/match.css"
import { Navigate } from "react-router-dom";

export default function Match(){
	// const [data, setData] = useState();
	const [pythonData, setPythonData] = useState();
    let data = useSelector(state => state.user.value)

    if (Object.keys(data).length === 0){
        return <Navigate to="/"/>
    }

    const users = [
        {name:"Lana Rose", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"},
        {name:"Andrew Tate", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"},
        {name:"Monica Vernandez", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"},
        {name:"Alia Suave", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"},
        {name:"Shostam Barvav", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"},
        {name:"Justin Williams", picture:"https://i.imgur.com/oyW8sxm.jpg", preview:"DTF? (Down to Fish)"}
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
                <div className='match-header'>
                    <h2>MATCHES</h2>
                </div>
                <div className='chats'>
                    {
                        users.map((chat, idx) => {
                        return (
                            <div key={idx} className='chat'>
                                <table>
                                    <tbody>
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
                        })
                    }
                </div>
            </div>
            <Navtab/>
        </div>
    )
}