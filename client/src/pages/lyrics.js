import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lyrics.css"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Navtab from "../components/Navtab";
import { setPosts } from "../redux/posts";

export default function Lyrics(){
    let user_data = useSelector(state => state.user.value)
    let posts = useSelector(state => state.posts.value)

    const [lyrics, setLyrics] = useState({lyric:""})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeValue = (e) => {
        fetch("http://127.0.0.1:5000/get_song_words").then(async res => {
            const data = await res.json()
            setLyrics(data)
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const onPost = (e) => {
        const post_data = {
            user:user_data.user.spotify_id,
            lyric:lyrics.lyric,
            song:lyrics.song,
            likes:0,
            comments:[],
            post_id:uuidv4(),
            profile_img:user_data.user.profile_img
        }
        fetch("http://localhost:5000/posts", {
            method: "POST",
            body: JSON.stringify(post_data),
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json()
            dispatch(setPosts([...posts,post_data]))
            alert("Check out your lyrics in the Posts section!")
            onChangeValue()
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        onChangeValue()
      }, []);

    return(
        <div>
            <h2 className="titleHub">Lyrics Hub!</h2>
            <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
            <p className = "lyrics">{lyrics.lyric}</p>
            <h4 className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</h4>
            <h4 className = "likeLyric" onClick={(event) => {onPost(event)}}>Show off the Lyric!</h4>
            <h4 className = "nextPage" onClick={() => {navigate("/music")}}>Start matching!!</h4>
            <Navtab/>
        </div>
    )
    
}
