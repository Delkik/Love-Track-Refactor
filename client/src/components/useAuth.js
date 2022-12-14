import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTokens } from "../redux/tokens";


export default function useAuth(code){
    const dispatch = useDispatch()
    let tokens = useSelector(state => state.tokens.value)
    const [id, setId] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/spotify", {
            method: 'POST',
            body: code,
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json()
            dispatch(setTokens({accessToken: data.accessToken, refreshToken: data.refreshToken, expiresIn: data.expiresIn}))           
        })
        .catch(err => {
            console.log(err)
        })
    }, [code])

    useEffect(() => {
        if (!tokens.refreshToken || !tokens.expiresIn) return
        
        const interval = setInterval(async () => {
            fetch("http://localhost:5000/refresh", {
                method: 'POST',
                body: id,
                credentials:"include"
            })
            .then(async res => {
                const data = await res.json()
                dispatch(setTokens({accessToken: data.accessToken, refreshToken: tokens.refreshToken, expiresIn: data.expiresIn}))        
            })
            .catch(err => {
                window.location = '/'
            })

        }, (tokens.expiresIn - 60) * 1000)
        
        return () => clearInterval(interval);

    }, [tokens.refreshToken, tokens.expiresIn])

    return [tokens.accessToken, id]
}