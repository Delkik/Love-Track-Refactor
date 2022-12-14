import Login from "../components/Login";
import RedirectUser from "../components/RedirectUser";


export default function Main(){

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    return (code?<RedirectUser code={code}/>:<Login/>)
    
}