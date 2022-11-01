import { useEffect, useState } from "react";
import NewUser1 from "./NewUser1";
import NewUser2 from "./NewUser2";
import NewUser3 from "./NewUser3";
import { Navigate } from "react-router-dom";

export default function NewUser({spotifyId}){
    const [newPage, setNewPage] = useState(1);

    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});

    const childToParent = (childData, nextPage) => {
        if (newPage==1)
            setData1(childData)
        if (newPage==2)
            setData2(childData)
        if (newPage==3)
            setData3(childData)

        setNewPage(newPage+nextPage)

    }


    if (newPage==1){
        return(
            <>
                <NewUser1 childToParent={childToParent}/>
            </>
        )
    }
    else if (newPage==2){
        return(
            <>
                <NewUser2 childToParent={childToParent}/>
            </>
        )
    }
    else if (newPage==3){
        return(
            <>
                <NewUser3 childToParent={childToParent}/>
            </>
        )
    }
    else{
        
        const userData = Object.assign(Object.assign(data1,data2),data3)
        console.log(userData)
        Object.assign(userData,{spotify_id: spotifyId})
        fetch("http://localhost:5000/create_user", {
            method: "POST",
            body: JSON.stringify(userData, function(k, v) { return v === undefined ? "" : v; }),
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then(async res => {
            const data = await res.json();
            return <Navigate to="/home"/>
    })
        .catch(err => {
            console.log(err)
        })
    }
    return (<div>NewUser</div>)
}