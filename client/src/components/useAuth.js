import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../redux/tokens";


export default function useAuth(code){
    const dispatch = useDispatch()
    let tokens = useSelector(state => state.tokens.value)
    // console.log(code)

    var fetch_count = 0
    useEffect(() => {
        console.log(code)
        fetch("http://localhost:5000/spotify", {
            method: 'POST',
            body: code,
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json()
            dispatch(setTokens({accessToken: data.accessToken, refreshToken: data.refreshToken, expiresIn: data.expiresIn}))
            // window.history.pushState({}, null, "/")
            
        })
        .catch(err => {
            console.log(err)
            // window.location = '/'
        })
        fetch_count +=1
    }, [code])
    var refresh_count = 0
    useEffect(() => {
        if (!tokens.refreshToken || !tokens.expiresIn) return
        
        const interval = setInterval(async () => {
            fetch("http://localhost:5000/refresh", {
                method: 'POST',
                body: tokens.refreshToken,
                credentials:"include"
            })
            .then(async res => {
                const data = await res.json()
                console.log(tokens)
                // console.log(data)
                dispatch(setTokens({accessToken: data.accessToken, refreshToken: tokens.refreshToken, expiresIn: data.expiresIn}))        
            })
            .catch(err => {
                window.location = '/'
            })

        }, (tokens.expiresIn - 60) * 1000)
        
        return () => clearInterval(interval);

    }, [tokens.refreshToken, tokens.expiresIn])

    return tokens.accessToken
}