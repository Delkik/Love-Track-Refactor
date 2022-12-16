import "../styles/newUser.css"
import React, {useState} from "react";
import "../styles/interests.css"
import love_track_logo from "../images/love_track_logo.png"
import Interest from "./Interest";


var l = ['cars', 'toys', 'fashion', 'food', 'drawing', 'Wax sealing', 'Video Games'];
var cN = "ting"
var count = 1
export default function NewUser2({childToParent}){
    const [interests, setInterests] = useState(l);

    const [chosenInterests, setChosen] = useState([])
    const [clickedAlrdy, setClicked] = useState([])

    return(

        <div className="screen">
            <div className='titleBtn' id='titleButton'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>
            <Interest func = {setChosen} interest={interests}/>

            <button className="next-button" onClick={() => {
                childToParent({},-1)
            }}>
                Previous
            </button>
          <button className="next-button" onClick={() => {
                childToParent(
                    {
                        interests:chosenInterests
                    },1
                    )
            }}>
                N E X T
            </button>


        </div>


    )

}
