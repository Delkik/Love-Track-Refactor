import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lyrics.css"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Navtab from "../components/Navtab";
import { Navigate } from "react-router-dom";
import { setPosts } from "../redux/posts";
import { setPotential } from "../redux/potentialMatches";
import { setUser } from "../redux/user";
import ClimbingBoxLoader from "react-spinners/HashLoader"

const TIMER_MAX= 60000


export default function Lyrics(){
    const [timerCount, setCounter] = useState(0)
    let interval = undefined
    let user_data = useSelector(state => state.user.value)
    let posts = useSelector(state => state.posts.value)
    const [lyrics, setLyrics] = useState({lyric:"", song: ""})
    const [retry, setRetry] = useState(10)
    const [matchLoad, setLoader] = useState(false)
    const [currentUser, setcurrentUser] = useState(useSelector(state => state.user.value))
    const [regColor, setregColor] = useState("blue")
    const [postColor, setpostColor] = useState("red")
    const [matchColor, setmatchColor] = useState("green")
    const [loading, setLoading] = useState(false)
    const [tracks, setTracks] = useState(useSelector(state => state.songs.value))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeValue = (e) => {
        setLoading(true)
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
            if(!data["lyric"]){
                setLyrics({lyric: "Hmm seems like no lyrics were found. Like more songs on your Spotify account and try again!", song: "You because you're our most prized user!"})
            }else{
                setLyrics(data)
            }
            console.log(lyrics)
            setLoading(false)
        }).catch(error=>{
            console.log(error)
        })

    }

    useEffect(() =>{
        if(retry == 0 || !matchLoad){
            return
        }
        fetch("http://localhost:5000/match", {
            method:"POST",
            body:JSON.stringify(user_data.user),
            credentials:"include"
        }).then(async res => {
            let newData = {
                ...user_data.user,
                isActive:true
            }
            dispatch(setUser({user: newData}))
            fetch("http://localhost:5000/update_user", {
                method: 'PUT',
                body: JSON.stringify(newData),
                mode: 'cors',
            })
            const data = await res.json()
            console.log("these are all the users")
            console.log(data["user"])
            console.log("this is me: ")
            console.log(user_data.user)
            //console.log(data["users"][0]["name"])
            console.log("lurocs page data")
            console.log(data)
            dispatch(setPotential(data["user"]))
            // navigate('/music')
            // setUsers(data["users"])
            navigate("/music")
        }).catch(error=>{
            setRetry(retry-1)            
        })
    }, [retry, matchLoad])
    const onStartMatching = (e) => {
        
        setLoader(true)
        let newData = {
            ...user_data.user,
            isActive:true
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
        console.log("is active update")
        console.log(user_data)
        // navigate("/music")
    }

    useEffect(() => {
        console.log("im the bummy dummy")
        console.log(timerCount, TIMER_MAX)
        if(timerCount >= TIMER_MAX){
            
            return () => 
            {
                alert("No active users try again later!")
                clearInterval(interval)
                navigate('/home')
            }

            
        }
        return () => clearInterval(interval)
    }, [timerCount])

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
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        if(!loading){
            setregColor("blue")
            setpostColor("red")
            // setmatchColor("green")
        }else{
            setregColor("grey")
            setpostColor("grey")
            // setmatchColor("grey")
        }
    }, [loading]);

    if (Object.keys(user_data).length === 0){
        return <Navigate to="/"/>
    }
    return(
        <div>
            {!matchLoad ?
            <>
            <h2 className="titleHub">Lyrics Hub!</h2>
            <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
            {loading ? 
            <div className="loader">
            <ClimbingBoxLoader color={"white"}/>
            </div>:<div>
            <h5>Lyrics:</h5>
            <p className = "lyrics">{lyrics.lyric}</p>
            <h5>Song Name:</h5>
            <p className="lyrics">{lyrics.song}</p>
            </div>}

            <div className="buttonsYur">
            <button disabled={loading} style={{background: regColor}}className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</button>
     
            <button disabled={loading} style={{background: postColor}}className = "likeLyric" onClick={(event) => {onPost(event)}}>Show off the Lyric!</button>
            <button style={{background: matchColor}}className = "nextPage" onClick={onStartMatching}>Start matching!!</button>
            </div>
            <Navtab/>
            </>:
            <>
            {/* <LoadingMatches/> */}
                <h2 className="titleHub">Lyrics Hub!</h2>
                <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
                {loading ? 
                <div className="loader">
                <ClimbingBoxLoader color={"white"}/>
                </div>:<div>
                <h5>Lyrics:</h5>
                <p className = "lyrics">{lyrics.lyric}</p>
                <h5>Song Name:</h5>
                <p className="lyrics">{lyrics.song}</p>
                </div>}

                <div className="buttonsYur">
                <button disabled={loading} style={{background: regColor}}className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</button>
        
                <button disabled={loading} style={{background: postColor}}className = "likeLyric" onClick={(event) => {onPost(event)}}>Show off the Lyric!</button>
                <button style={{background: "grey"}}className = "nextPage">Start matching!!</button>
                </div>
            </>
            }
        </div>
    )
    
}