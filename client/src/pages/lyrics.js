import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lyrics.css"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Navtab from "../components/Navtab";
import { Navigate } from "react-router-dom";
import { setPosts } from "../redux/posts";
import { setPotential } from "../redux/potentialMatches";


export default function Lyrics(){
    let user_data = useSelector(state => state.user.value)
    let posts = useSelector(state => state.posts.value)
    const [lyrics, setLyrics] = useState({lyric:"", song: ""})
    const [users, setUsers] = useState()
    const [hide, setHide] = useState(true)
    const [tracks, setTracks] = useState(useSelector(state => state.songs.value))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeValue = (e) => {

        fetch("http://localhost:5000/get_song_words", {
            method:"POST",
            credentials:"include",
            body:JSON.stringify(tracks),
            headers: {
                'Content-Type':'application/json'
            },
        }).then(async res => {
            const data = await res.json()
            console.log(data,"LYRICS")
            setLyrics(data)
            console.log(lyrics)
        }).catch(error=>{
            console.log(error)
        })

    }

    const onStartMatching = (e) => {
        fetch("http://localhost:5000/get_all_users", {
            method:"GET",
            credentials:"include"
        }).then(async res => {
            const data = await res.json()
            console.log("these are all the users")
            console.log(data["allUsers"][0]["name"])
            dispatch(setPotential(data["allUsers"]))
            setUsers(data["allUsers"])
            navigate("/music")
        }).catch(error=>{
            console.log(error)
        })
            navigate("/music")
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

    useEffect(() => {
        if(lyrics.lyric){
            setHide(false)
        }else{
            setHide(true)
        }
    }, [lyrics.lyric]);

    if (Object.keys(user_data).length === 0){
        return <Navigate to="/"/>
    }
    console.log(lyrics)
    return(
        <div>
            <h2 className="titleHub">Lyrics Hub!</h2>
            <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
            <h5>Lyrics:</h5>
            <p className = "lyrics">{lyrics.lyric}</p>
            <h5>Song Name:</h5>
            <p className="lyrics">{lyrics.song}</p>
            <h4 className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</h4>
            {!hide ? <div>
            <h4 className = "likeLyric" onClick={(event) => {onPost(event)}}>Show off the Lyric!</h4>
            <h4 className = "nextPage" onClick={onStartMatching}>Start matching!!</h4></div>:<div></div>
            }
            <Navtab/>
        </div>
    )
    
}
