import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/match.css"
import alia from "../images/alia.png"
import shakirah from "../images/shakirah.png"
import deepika from "../images/deepika.png"
import jahnvi from "../images/jahnvi.jpg"
import samantha from "../images/samantha.png"
import chad from "../images/chad.png"

export default function Match(){
	// const [data, setData] = useState();
	const [pythonData, setPythonData] = useState();

    const {state} = useLocation();
    const data = state
    console.log(data)

    const users = [
        {name:"Lana Rose", picture:<img src={alia} alt="Album cover" className="alia"/>, preview:"Do you think this will..."},
        {name:"Shakira Cortez", picture:<img src={shakirah} alt="Album cover" className="shakirah"/>, preview:"Baila conmi?"},
        {name:"Monica Vernandez", picture:<img src={deepika} alt="Album cover" className="deepika"/>, preview:"You suck!"},
        {name:"Alia Suave", picture:<img src={jahnvi} alt="Album cover" className="jahnvi"/>, preview:"Hey babes :)"},
        {name:"Shostam Barvav", picture:<img src={samantha} alt="Album cover" className="samantha"/>, preview:"I rlly miss you..."},
        {name:"Justin Williams", picture:<img src={chad} alt="Album cover" className="chad"/>, preview:"hey brudda"}
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
                                    <td rowSpan={2}> {chat.picture} </td>
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