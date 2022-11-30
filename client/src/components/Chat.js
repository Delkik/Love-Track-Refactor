import io from 'socket.io-client' //used to establish connection from front end to backend
import React, {useState} from 'react';
import Chat from './chatBox';
import styles from '/styles/chatBox.css'

const socket = io.connect("http://localhost:5001");

function ChatPage(){
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        console.log("i have been clicked");
        if(username !== "" && room !== ""){
            socket.emit("join_room", room);
        }
    };
    return (
    <div>
        <h3>Testing chat for good peeps</h3>
        <input type="text" placeholder='John...' onChange = {(event) => {setUsername(event.target.value)}}/>
        <input type="text" placeholder = "Room ID" onChange = {(event) => {setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Join a room</button>
        <Chat className = {styles.whole} socket={socket} username = {username} room = {room}/>
    </div>


    )
}

export default ChatPage;