import { useEffect, useState } from "react";
import useAuth from "./useAuth"
import NewUser from "./NewUser";

export default function RedirectUser({code}) {
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    const [userData, setUserData] = useState();
    const accessToken = useAuth(code);

    // console.log(accessToken)

    // useEffect(() => {
    //     if (!accessToken) return
    //     fetch(process.env.REDIRECT+"api/current_user", {
    //         method: "POST",
    //         body: accessToken
    //     })
    //     .then(async res => {
    //         const data = await res.json();
    //         console.log(data)
    //         setUserType(data.user.product)
    //         setUserId(data.user.id)
    //     })
    // }, [accessToken])

    
    // useEffect(() => {
    //     if (!accessToken || !userId) return
        
    //     fetch(process.env.REDIRECT+"api/user", {
    //         method: "POST",
    //         body: userId
    //     })
    //     .then(async res => {
    //         const data = await res.json();
    //         setUserData(data.data)
    //         setUserExists(data.data!=undefined)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [accessToken, userId])

    // Render loading screen or something
    if (userExists==undefined){
        return <div>Gathering data on User...</div>
    }

    // look into conditional rendering to do this better
    if (userType != "premium"){
        return <div>BRUH</div>
    }

    if (userData){
        return "hi"
    }
    else{
        return (<NewUser spotifyId={userId}/>)
    }
}