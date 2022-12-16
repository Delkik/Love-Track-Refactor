import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import NewUser from "./NewUser";
import { setUser } from "../redux/user";
import useAuth from "./useAuth"

export default function RedirectUser({code}) {
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    const [spotifyUserExists, setSpotifyUserExists] = useState(true);
    
    let userData = useSelector(state => state.user.value)

    const accessToken = useAuth(code);
    const dispatch = useDispatch();

    const [retry, setRetry] = useState(2)
    const [kretry, setKRetry] = useState(2)

    useEffect(() => {
        if (!accessToken) return
        if (retry === 0) {
            setSpotifyUserExists(false)
            return
        }
        fetch("http://localhost:5000/current_user", {
            method: "GET",
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json();
            setUserType(data.user.product)
            setUserId(data.user.id)
        })
        .catch(err => {
            setRetry(retry-1)
            console.log(retry)
        })
    }, [accessToken, retry])

    
    useEffect(() => {
        if (!accessToken || !userId) return
        
        fetch("http://localhost:5000/user", {
            method: "POST",
            body: userId,
            credentials:"omit"
        })
        .then(async res => {
            const data = await res.json();
            dispatch(setUser(data))
            userData = data
            setUserExists(data.user!==undefined)
        })
        .catch(err => {
            console.log(err)
        })
    }, [accessToken, userId])

    useEffect(() => {
        if (userType !== "premium"  || kretry === 0 || !userData.user){return}
        console.log("Dgbdgkfbijgfbi")
        fetch("http://localhost:5000/kmeans", {
            method: "POST",
            body: JSON.stringify(userData.user),
            credentials:"omit"
        })
        .then(async res => {
            const data = await res.json();
            let d = {...userData.user, cluster:data["kmeans"]}
            dispatch(setUser({user:d}))
            fetch("http://localhost:5000/update_user", {
                method: 'PUT',
                body: JSON.stringify(d),
                mode: 'cors',
            })
        })
        .catch(err => {
            console.log(err)
            setKRetry(kretry-1)
        })
    }, [userType, kretry, userData])

    if (spotifyUserExists===false){
        return <ErrorPage status={404} action={"No Spotify user found!"}/>
    }

    if (userExists===undefined){
        return <Loading action={"Gathering data on User"} />
    }

    // if (userType !== "premium"){
    //     return <ErrorPage status={400} action={"Come back when you have premium!"}/>
    // }

    if (userData.user){
        window.history.pushState({}, null, "/")
        return <Navigate to="/home"/>
    }
    else{
        return (<NewUser spotifyId={userId} code={code}/>)
    }
}