import { useCallback, useEffect, useState } from "react"
import SpotifyPlayer, { CallbackState, STATUS} from "react-spotify-web-playback"

export default function Player({dip, accessToken, trackUri, duration}){
    const [pro, setPro] = useState()
    useEffect((type, ...state) => {
        console.log("this is the postition of song")
        //console.log(state.position)
        console.log(state.position)
    },[pro])
    if(!accessToken) return null
    return (
        <SpotifyPlayer
            token={accessToken}
            autoPlay = {true}
            uris = {trackUri}
            initialVolume = {dip}
            callback = {state => {console.log(state.progressMs)}}
            styles={{
                activeColor: '#fff',
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                sliderHandleBorderRadius: 0,
                sliderHeight: 0,
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}
            />
    )
}