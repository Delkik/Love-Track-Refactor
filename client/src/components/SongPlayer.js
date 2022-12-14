import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({accessToken, trackUri}){
    if(!accessToken) return null
    return (
        <SpotifyPlayer
            token={accessToken}
            play={true}
            uris = {trackUri}
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