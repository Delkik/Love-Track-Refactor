import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback"

export default function Social(){
    const {state} = useLocation();
    const data = state
    console.log(data)

    return (
        <div>
            <SpotifyPlayer
            token={data.accessToken}
            play={true}
            uris = {["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}
            />
            <Navtab data={data}/>
        </div>
    )
}