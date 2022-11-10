import {useState, useEffect} from "react"
import SpotifyPlayer from "react-spotify-web-playback"


export default function Player({accessToken, trackUri}){
    if(!accessToken) return null
    return (
        <SpotifyPlayer
            token={"AQDZSriaRVbcwZ4DrbqKJhCZzZ0L1Bqq6BrTlkPtyfXDlwfQqqFrXdm6LsNoGZkxNr3uTZrtu0ScpbM8J77QZ-wOBBNCEqk7HHkCuFpPzZk1F_izXOHo0TJank0P58o0DHIEeJAA4hYkTPqxC0ec1X7_FSsdXEMGkTuGp_EIL8sEoPQOQkeDlyRV0tnYamTxvAGplUPuZG5XlfXC0Z5rApjzt1buiRupCp3oDud1nRtEZA__yZtbHSS_L4LhMcZEs2GJoTlgbcnLZvtOqK5Mhujn3YSBplp_W25vQIYwFlBk_YmWkgABQqNiDwNV9QOg6GkVMsmclGPuQWk"}
            play={true}
            uris = {["spotify:track:6S3JlDAGk3uu3NtZbPnuhS"]}
            />
    )
}