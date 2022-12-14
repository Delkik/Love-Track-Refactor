import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Navtab from "../components/Navtab";
import "../styles/match.css"

export default function Match(){
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

    return (
        <div>
            <Navbar/>
            <div className='screenSettings'>
                <div className='match-header'>
                    <h2>MATCHES</h2>
                </div>
                <div className='chats'>
                    { users.length ?
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
                        }) : 
                        <div className="social-empty">
                            <h2>Nothing to see here!</h2>
                            <p>Get started by matching with others!!</p>
                        </div> 
                    }
                </div>
            </div>
            <Navtab/>
        </div>
    )
}