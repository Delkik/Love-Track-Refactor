import { useEffect, useState } from "react";
import useAuth from "./useAuth"
import NewUser from "./NewUser";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";

export default function RedirectUser({code}) {
    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    // const [userData, setUserData] = useState();
    let userData = useSelector(state => state.user.value)
    const accessToken = useAuth(code);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!accessToken) return
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
            window.location = '/'
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
            dispatch(setUser(data))
            setUserExists(data.user!==undefined)
        })
        .catch(err => {
            console.log(err)
        })
    }, [accessToken, userId])

    useEffect(() => {
        if (userType !== "premium"){return}
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
        })
    }, [userType])

    // Render loading screen or something
    if (userExists===undefined){
        return <div>Gathering data on User...</div>
    }

    if (userType !== "premium"){
        return <div>BRUH</div>
    }

    if (userData.user){
        window.history.pushState({}, null, "/")
        return <Navigate to="/home"/>
    }
    else{
        return (<NewUser spotifyId={userId}/>)
    }
}