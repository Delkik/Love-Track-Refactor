import ClimbingBoxLoader from "react-spinners/HashLoader"
import { useEffect, useState } from "react";
import "../styles/loading.css"
import { useNavigate } from "react-router-dom";



export default function LoadingMatches(){
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setTimeout(() => {
            navigate("/music",)
            setLoading(false)
        }, 4000);
         return () => clearInterval(interval)
    }, [])

    return(
        <div>
            <h2 className="matchMessage">Hold tight! Finding someone special happens once in a lifetime...</h2>
            <div className="loader">
            <ClimbingBoxLoader color={"white"}/>
            </div>

        </div>

    )


}