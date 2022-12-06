import { useLocation, useSearchParams } from "react-router-dom";
import Login from "../components/Login";
import RedirectUser from "../components/RedirectUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function Main(){

    let tokens = useSelector(state => state.tokens.value)

    if (tokens){
        return <RedirectUser code={tokens.accessToken}/>
    }

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    return (code?<RedirectUser code={code}/>:<Login/>)
    
}