import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect , useState} from 'react'
import io from "socket.io-client"
import "../styles/chat.css"
import Navtab from "../components/Navtab";
import xButton from "../images/whiteXButton.png"
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user";


let endPoint = "http://127.0.0.1:5000"
let socket = io.connect("http://127.0.0.1:5000")
// {socket}

function Chat({name, matchedName, ownerId, matchedId, theType, func}) {
    const navigate = useNavigate()
    let user_data = useSelector(state => state.user.value)
    const {state} = useLocation();
    const data = state
    const [potUser, setPot] = useState(useSelector(state => state.potentials.value))
    const [messages, setMessages] = useState([{ms:"Hello and Welcome", sender:"Imtiaz"}, {ms:"no stop talking", sender:matchedName}, {ms:"don't tell me what to do", sender:"Imtiaz"}, {ms:"naurrr", sender:matchedName}, {ms:"So when you wanna go out?", sender:"Imtiaz"}, {ms:"You way too gassed up boy", sender:matchedName}])
    //const [messages, setMessages] = useState()
    const [message, setMessage] = useState("")
    const [joinedRoom, setJoined] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
      const socket = io("localhost:5000/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });  
    // console.log("this is the socket object")
    // console.log(socket)
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
        console.log(name)
        const messageData = {
          ms:message,
          sender: name
        };

        socket.emit("message", messageData)
        if(joinedRoom == false){
          console.log("im about to join")
          socket.emit("join", ownerId+matchedId)
          setJoined(true)
        }
        setMessage("")
        console.log("this is where i wanna be")
      }else{
        console.log("ck outta here")

      }
    }

    const onClickX = () =>{
      let newData = {
        ...user_data.user,
        isActive:false
      }
      dispatch(setUser({user: newData}))
      fetch("http://localhost:5000/update_user", {
          method: 'PUT',
          body: JSON.stringify(newData),
          mode: 'cors',
      })
      .then(async res => {
          const data = await res.json()
      })
      .catch(err => {
          console.log(err)
      })

      fetch("http://localhost:5000/addChat", {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({"name":ownerId+matchedId,"history":messages}),
            headers: {
                'Content-Type':'application/json'
            },
          }).then(async res => {
             const data = await res.json()
              console.log(data)
        }).catch(error=>{
            console.log(error)
          })
      socket.emit("leave", ownerId+matchedId)
      if(theType === "matches"){
        console.log("I am in matches type these tings")
       func(false)
      }else{
        navigate("/home",)
      }

      //console.log(potUsers)

  }

    return (
      <div>
        <img className = "xButton" onClick={() => onClickX()} src={xButton} alt="White Button"/>
        {/* <h1 className='nameTitle'>{potUser[0]["name"]}</h1> */}
        <h1 className='nameTitle'>{matchedName}</h1>
        <div className="chatBox">
          {/* {messages.map(msg => (msg.sender === potUser[0]["name"] ? <div className='left'><p className = "left2">{msg.sender} : {msg.ms}</p></div>: <div className='right'><p className = "right2">{msg.sender} : {msg.ms}</p></div>))} */}
          {messages.map(msg => (msg.sender === matchedName ? <div className='left'><p className = "left2">{msg.sender} : {msg.ms}</p></div>: <div className='right'><p className = "right2">{msg.sender} : {msg.ms}</p></div>))}
          </div>
          
          <div className='inputField'>
          <input value = {message} name = "message" onChange={e => onChange(e)} />
          <button onClick={() => onClick()}>Send!</button>
          </div>

          {/* <img className = "xButton" onClick={() => onClickX()} src={xButton} alt="White Button"/> */}
          {/* <Navtab data={data}/> */}
      </div>  
      );
}

export default Chat;