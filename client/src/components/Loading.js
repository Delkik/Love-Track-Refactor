import { useEffect, useState } from "react";
import "../styles/loading.css"
import love_track_logo from "../images/love_track_logo.png"


function Loading({action}) {

    const [quote,setQuote] = useState({quote:"",author:""})

    const quotes = [
        {quote:"One good thing about music, when it hits you, you feel no pain.",author:"Bob Marley"},
        {quote:"Music expresses that which cannot be said and on which it is impossible to be silent.", author:"Victor Hugo"},
        {quote:"Without music, life would be a mistake.",author:"Friedrich Nietzsche"},
    ]

    useEffect(()=>{
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    },[])
    return (
        <div className="loading-main">
            <div className='titleBtn' id='titleBtn'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>
            <div className="quote">
                <h1>{quote.quote}</h1>
                <h3>- {quote.author}</h3>
            </div>
            {action}...
        </div>
    );
}

export default Loading;