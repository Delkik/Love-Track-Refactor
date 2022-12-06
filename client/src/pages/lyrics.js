import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lyrics.css"





export default function Lyrics(){
    const [lyrics, setLyrics] = useState()
    const [tracks, setTracks] = useState()
    const navigate = useNavigate()

    const onChangeValue = (e) => {
        // fetch("http://127.0.0.1:5000/get_song_words").then(async res => {
        //     const data = await res.json()
        //     setLyrics(data.lyric)
        // }).catch(error=>{
        //     console.log(error)
        //   })

        fetch("http://127.0.0.1:5000/user_tracks").then(async res => {
            const data = await res.json()
            setTracks(data)
            console.log("this is the tracks data")
            console.log(data)
            // console.log(tracks)
        }).catch(error=>{
            console.log(error)
          })

        //   fetch("http://127.0.0.1:5000/get_song_words", {
        //     body:
        //   }).then(async res => {
        //     const data = await res.json()
        //     setLyrics(data.lyric)
        // }).catch(error=>{
        //     console.log(error)
        //   })
       
      }
    //   onChangeValue()
        return(
            <div>
                <h2 className="titleHub">Lyrics Hub!</h2>
                <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
                <p className = "lyrics">{lyrics}</p>
                <h4 className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</h4>
                <h4 className = "nextPage" onClick={() => {navigate("/music")}}>Start matching!!</h4>

            </div>
        )
    
}
