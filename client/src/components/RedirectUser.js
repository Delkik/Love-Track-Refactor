import { useEffect, useState } from "react";
import useAuth from "./useAuth"
import NewUser from "./NewUser";
import { Navigate } from "react-router-dom";

export default function RedirectUser({code}) {
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    const [userData, setUserData] = useState();
    const accessToken = useAuth(code);

    useEffect(() => {
        if (!accessToken) return
        fetch("http://localhost:5000/current_user", {
            method: "GET",
            credentials:"include",
        })
        .then(async res => {
            const data = await res.json();
            setUserType(data.user.product)
            setUserId(data.user.id)
        })
    }, [accessToken])

    
    useEffect(() => {
        if (!accessToken || !userId) return
        
        fetch("http://localhost:5000/user", {
            method: "POST",
            body: userId,
            credentials:"omit"
        })
        .then(async res => {
            const data = await res.json();
            setUserData(data.user)
            setUserExists(data.user!=undefined)
        })
        .catch(err => {
            console.log(err)
        })
    }, [accessToken, userId])

    // Render loading screen or something
    if (userExists==undefined){
        return <div>Gathering data on User...</div>
    }

    if (userType != "premium"){
        return <div>BRUH</div>
    }

    
    if (userData){
        Object.assign(userData,{accessToken:accessToken})
        window.history.pushState({}, null, "/")
        return <Navigate to="/home" state={userData}/>
    }
    else{
        return (<NewUser spotifyId={userId}/>)
    }
}