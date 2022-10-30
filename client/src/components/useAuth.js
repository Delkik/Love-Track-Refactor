import React, { useEffect, useState } from "react";


export default function useAuth(code){
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    var fetch_count = 0
    useEffect(() => {
        fetch("http://127.0.0.1:5000/spotify", {
            method: 'POST',
            body: code
        })
        .then(async res => {
            const data = await res.json()
            // console.log(data)
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            setExpiresIn(data.expiresIn)
            // window.history.pushState({}, null, "/")
        })
        .catch(err => {
            window.location = '/'
        })
        fetch_count +=1
    }, [code])

    var refresh_count = 0
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        
        const interval = setInterval(async () => {
            fetch("http://127.0.0.1:5000/refresh", {
                method: 'POST',
                body: refreshToken
            })
            .then(async res => {
                const data = await res.json()
                // console.log(data)
                setAccessToken(data.accessToken)
                setExpiresIn(data.expiresIn)
            })
            .catch(err => {
                window.location = '/'
            })
            
            // refresh_count+=1

        }, (expiresIn - 60) * 1000)
        
        return () => clearInterval(interval);

    }, [refreshToken, expiresIn])

    return accessToken
}