import "../styles/newUser.css"
import React, {useState} from "react";
import "../styles/interests.css"
import love_track_logo from "../images/love_track_logo.png"
import Interest from "./Interest";


var l = ['cars', 'toys', 'fashion', 'food', 'drawing', 'Wax sealing', 'Video Games'];
var cN = "ting"
var count = 1
export default function NewUser2({childToParent}){
    const [interests, setInterests] = useState([]);

    const [listInterests, setInterest] = useState([])
    const [clickedAlrdy, setClicked] = useState([])
    const tap = (e) => {
        console.log(listInterests)
        cN = "ting"
        count = 1
        if (clickedAlrdy.includes(e.target.className)){
            let int = [...listInterests]
            clickedAlrdy.splice(clickedAlrdy.indexOf(e.target.className), 1)
            int.splice(int.indexOf(e.target.textContent), 1)
            setInterest(int)
            e.target.style.backgroundColor = '#0D0D0D'
            e.target.style.color = 'white'
        }else{
            setClicked(clickedAlrdy.concat(e.target.className))
            console.log(e.target.textContent)
            setInterest([...listInterests,e.target.textContent])
            console.log(listInterests)
            e.target.style.backgroundColor = 'white'
            e.target.style.color = '#0D0D0D'

        }        
    }
    return(

        <div className="screen">
            <div className='titleBtn' id='titleButton'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>


            <ul className = "wrapList">
                {l.map((interest) => {
                    console.log(interest)
                    return(
                        <Interest onClick={tap} interest={interest}/>
                    )
                })}
            </ul>

            <button className="next-button" onClick={() => {
                childToParent({},-1)
            }}>
                Previous
            </button>
          <button className="next-button" onClick={() => {
                childToParent(
                    {
                        test:2
                    },1
                    )
            }}>
                N E X T
            </button>


        </div>


    )

}
