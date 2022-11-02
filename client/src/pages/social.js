import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Social(){
    const {state} = useLocation();
    const data = state
    console.log(data)

    return (
        <div>
            hi im live
            <Navtab data={data}/>
        </div>
    )
}