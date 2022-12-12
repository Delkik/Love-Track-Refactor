import { useEffect, useState } from "react";
import useAuth from "./useAuth"
import NewUser from "./NewUser";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";
import Loading from "./Loading";

export default function RedirectUser({code}) {
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    // const [userData, setUserData] = useState();
    let userData = useSelector(state => state.user.value)
    const accessToken = useAuth(code);
    const dispatch = useDispatch();

    const [retry, setRetry] = useState(2)
    const [kretry, setKRetry] = useState(2)

    useEffect(() => {
        if (!accessToken || retry === 0) return
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
            // window.location = '/'
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
            setUserExists(data.user!==undefined)
        })
        .catch(err => {
            console.log(err)
        })
    }, [accessToken, userId])

    useEffect(() => {
        if (userType !== "premium"  || kretry === 0){return}
        console.log(userData)
        fetch("http://localhost:5000/kmeans", {
            method: "POST",
            body: JSON.stringify(userData.user),
            credentials:"omit"
        })
        .then(async res => {
            const data = await res.json();
            // dispatch(setUser(data))
            // setUserExists(data.user!==undefined)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
            // console.log(retry)
            console.log(userData)
            setKRetry(kretry-1)
        })
    }, [userType, kretry])

    // Render loading screen or something
    if (userExists===undefined){
        return <Loading action={"Gathering data on User"} />
    }

    // if (userType !== "premium"){
    //     return <div>BRUH</div>
    // }

    if (userData.user){
        window.history.pushState({}, null, "/")
        return <Navigate to="/home"/>
    }
    else{
        return (<NewUser spotifyId={userId} code={code}/>)
    }
}