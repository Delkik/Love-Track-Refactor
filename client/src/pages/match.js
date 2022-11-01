import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/match.css"

export default function Match(){
	// const [data, setData] = useState();
	const [pythonData, setPythonData] = useState();

    const {state} = useLocation();
    const data = state
    console.log(data)

    const users = [
        {name:"Lana Rose", picture:"hi", preview:"DTF? (Down to Fish)"},
        {name:"Andrew Tate", picture:"hi", preview:"DTF? (Down to Fish)"},
        {name:"Monica Vernandez", picture:"hi", preview:"DTF? (Down to Fish)"},
        {name:"Alia Suave", picture:"hi", preview:"DTF? (Down to Fish)"},
        {name:"Shostam Barvav", picture:"hi", preview:"DTF? (Down to Fish)"},
        {name:"Justin Williams", picture:"hi", preview:"DTF? (Down to Fish)"}
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
        <div className='screenSettings'>
            <div className='match-header'>
            <div className='left'>
                <p>MATCHES</p>
            </div>
            </div>
            <div className='chats'>
                {
                    users.map((chat) => {
                    return (
                        <div className='chat'>
                            <table>
                                <tr>
                                    <td rowSpan={2}> {chat.picture}</td>
                                    <td className='name'>{chat.name}</td>
                                </tr>
                                <tr>
                                    <td className='message'>{chat.preview}</td>
                                </tr>
                            </table>
                        </div>
                    )
                    })
                }
            </div>
        </div>
            <Navtab data={data}/>
        </div>
    )
}