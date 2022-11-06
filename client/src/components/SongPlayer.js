import {useState, useEffect} from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({accessToken, trackUri}){
    return (
        <SpotifyPlayer
            token={accessToken}
            play={true}
            uris = {trackUri}
            />
    )
}