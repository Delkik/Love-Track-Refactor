import { useEffect, useState } from "react";
import useAuth from "./useAuth"
import NewUser from "./NewUser";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user";
import Loading from "./Loading";

export default function RedirectUser({code}) {
    const [userType, setUserType] = useState();
    const [userExists, setUserExists] = useState();
    // const [userData, setUserData] = useState();
    let userData = useSelector(state => state.user.value)
    // const accessToken = useAuth(code);
    const auth_data = useAuth(code)
    const accessToken = auth_data[0]
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(auth_data[1]);
    const [retry, setRetry] = useState(2)
    const [kretry, setKRetry] = useState(2)

    console.log("this isss the user id before i enter useEffect my g")
        console.log(userId)
    useEffect(() => {
    
        console.log("this isss the auth data my g")
        console.log(auth_data)
        console.log("this isss the access toke my babes")
        console.log(accessToken)
        console.log("this isss the authdata[1] my babes")
        console.log(auth_data[1])
        if (!accessToken || retry === 0) return
        fetch("http://localhost:5000/current_user", {
            method: "POST",
            body: auth_data[1],
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json();
            console.log("current user data yurrr")
            console.log(data)
            setUserType(data.user.product)
            setUserId(data.id)
        })
        .catch(err => {
            setRetry(retry-1)
            // window.location = '/'
        })
    }, [accessToken, retry])

    
    useEffect(() => {
        console.log("gulag time in user route userid")
        console.log(userId)
        if (!accessToken) return
        
        fetch("http://localhost:5000/user", {
            method: "POST",
            body: auth_data[1],
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
    }, [accessToken])

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
        return (<NewUser spotifyId={auth_data[1]} code={code}/>)
    }
}