import "../styles/newUser.css"
import React, {useState} from "react";
import "../styles/interests.css"
import love_track_logo from "../images/love_track_logo.png"
import Interest from "./Interest";


export default function NewUser2({childToParent}){
    const [interests, setInterests] = useState(['cars', 'toys', 'fashion', 'food', 'drawing']);

    const [chosenInterests, setChosen] = useState([])
    const [clickedAlrdy, setClicked] = useState([])
   
    return(

        <div className="screen">
            <div className='titleBtn' id='titleButton'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>
            <Interest func = {setChosen} interest={interests}/>

            {/* <ul className = "wrapList">
                {l.map((interest) => {
                    console.log(interest)
                    return(
                        <Interest onClick={tap} interest={interest}/>
                    )
                })}
            </ul> */}

            <button className="previous-button" onClick={() => {
                childToParent({},-1)
            }}>
                P R E V I O U S
            </button>
          <button className="next-button" onClick={() => {
                console.log(chosenInterests)
                // childToParent(
                //     {
                //         test:2
                //     },1
                //     )
            }}>
                N E X T
            </button>


        </div>


    )

}
