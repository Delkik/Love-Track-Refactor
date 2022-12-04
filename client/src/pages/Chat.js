import { Link, useLocation } from "react-router-dom";
import { useEffect , useState} from 'react'
import io from "socket.io-client"
import "../styles/chat.css"
import Navtab from "../components/Navtab";


let endPoint = "http://127.0.0.1:5000"
let socket = io.connect("http://127.0.0.1:5000")

function Chat() {
  const {state} = useLocation();
    const data = state
    const [messages, setMessages] = useState([{ms:"Hello and Welcome", sender:"Imtiaz"}, {ms:"no stop talking", sender:"Sanjida"}, {ms:"don't tell me what to do", sender:"Imtiaz"}, {ms:"naurrr", sender:"Sanjida"}, {ms:"So when you wanna go out?", sender:"Imtiaz"}, {ms:"You way too gassed up boy", sender:"Sanjida"}])
    const [message, setMessage] = useState("")
    const [joinedRoom, setJoined] = useState(false);

    useEffect(() => {
      const socket = io("localhost:5000/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });  
      socket.on("connect", (data) => {
        console.log(data);
      });
     
    }, []);

    useEffect(() => {
      socket.on("my_response", (data) => {
        setMessages([...messages, data]);
      });
    }, [socket, messages]);

    const onChange = e => {
      setMessage(e.target.value)
    }

    const onClick = () => {
      if (message !== ""){
        const messageData = {
          ms:message,
          sender: "Imtiaz"
        };

        socket.emit("message", messageData)
        if(joinedRoom == false){
          console.log("im about to join")
          socket.emit("join", "1235")
          setJoined(true)
        }
        setMessage("")
        console.log("this is where i wanna be")
      }else{
        console.log("ck outta here")

      }
    }

    return (
      <div>
        <h1 className='nameTitle'>Sanjida</h1>
        <div className="chatBox">
          {messages.map(msg => (msg.sender === "Imtiaz" ? <div className='left'><p className = "left2">{msg.sender} : {msg.ms}</p></div>: <div className='right'><p className = "right2">{msg.sender} : {msg.ms}</p></div>))}
          </div>
          
          <div className='inputField'>
          <input value = {message} name = "message" onChange={e => onChange(e)} />
          <button onClick={() => onClick()}>Send!</button>
          </div>

          <Navtab data={data}/>
      </div>  
      );
}

export default Chat;