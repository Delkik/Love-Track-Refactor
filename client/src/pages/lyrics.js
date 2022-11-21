import { useEffect, useState } from "react";
import "../styles/lyrics.css"




export default function Lyrics(){
    const [lyrics, setLyrics] = useState("Tumi shonar pakhi...")

    const onChangeValue = (e) => {
        fetch("http://localhost:5000/get_lyrics", {
            method: "GET"
        })
        .then(async res => {
            const data = await res.json();
            setLyrics(data)
            return data
        }).catch(error=>{
            console.log(error)
          })
        console.log("im being clicked i think?")
        console.log(lyrics)
      }

        return(
            <div>
                <h2 className="titleHub">Lyrics Hub!</h2>
                <p className="mainMess"> Here you can choose a one liner lyric which will display to other users of this app. They can heart your lyrics and vice versa as you will be able to scroll through their lyrics too</p>
                <p className = "lyrics">{lyrics}</p>
                <h4 className = "regenerate" onClick={onChangeValue}>Regenerate Lyrics</h4>
                <h4 className = "nextPage">Start matching!!</h4>

            </div>
        )
    
}
