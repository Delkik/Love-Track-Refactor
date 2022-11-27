import { useLocation, useSearchParams } from "react-router-dom";
import Login from "../components/Login";
import {useEffect} from 'react'
import RedirectUser from "../components/RedirectUser";
import HomePage from "./home"
import { useSelector } from "react-redux"


export default function Main(){

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    return (code?<RedirectUser code={code}/>:<HomePage/>)
    
}

