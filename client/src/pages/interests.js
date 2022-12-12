
// import Image from "next/image";
import {BrowserRouter, Route, Link} from "react-router-dom";
import React, {useState} from "react";
// import styles from './newUserSecond.module.css'
// import Style from './newUserSecond.module.css'
import "../styles/interest.css"
import Title from '../images/title.png'
import Next from '../images/next_button.png'


var l = ['cars', 'toys', 'fashion', 'food', 'drawing'];
var cN = "ting"
var count = 1
export default function Interests(){
    const [listInterests, setInterest] = useState([])
    const [clickedAlrdy, setClicked] = useState([])
    function tap (e) {
        cN = "ting"
        count = 1
        if (clickedAlrdy.includes(e.target.className)){
            clickedAlrdy.splice(clickedAlrdy.indexOf(e.target.className), 1)
            listInterests.splice(listInterests.indexOf(e.target.textContent), 1)
            e.target.style.backgroundColor = 'black'
            e.target.style.color = 'white'
        }else{
            setClicked(clickedAlrdy.concat(e.target.className))
            console.log(e.target.textContent)
            setInterest(listInterests.concat(e.target.textContent))
            console.log(listInterests)
            e.target.style.backgroundColor = 'white'
            e.target.style.color = 'black'

        }        
    }
    return(
         
        <div>
            <div className="titleBtn">
                <img src={Title} alt='Title Button'/>
            </div>

           
            <div className = "styles.wrapList">
          {l.map(function(object) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
              cN = cN + count
              console.log(cN)
              count+=1
              return (
                <><h2 onClick = {tap} className = {`${cN}`} type = "button">{object}</h2></>
              );
            })}
            </div>

            <div className="formNext">
              <img src={Next} alt='Next Button'/>
          </div>

        
        </div>


    )
}