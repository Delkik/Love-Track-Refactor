import "../styles/interest.css"
import React, {useState} from "react";

var cN = "ting"
var count = 1
export default function Interest({interest, func}){
    const [listInterests, setInterest] = useState([])
    const [clickedAlrdy, setClicked] = useState([])
    const tap = (e) => {
        cN = "ting"
        count = 1
        if (clickedAlrdy.includes(e.target.className)){
            clickedAlrdy.splice(clickedAlrdy.indexOf(e.target.className), 1)
            listInterests.splice(listInterests.indexOf(e.target.textContent), 1)
            func(listInterests)
            e.target.style.backgroundColor = 'black'
            e.target.style.color = 'white'
        }else{
            setClicked(clickedAlrdy.concat(e.target.className))
            console.log(e.target.textContent)
            setInterest(listInterests.concat(e.target.textContent))
            console.log(listInterests)
            func(listInterests)
            e.target.style.backgroundColor = 'white'
            e.target.style.color = 'black'
        }          
    }

    return(
        <div className="interests">
            {interest.map(function(object) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
              cN = cN + count
              console.log(cN)
              count+=1
              return (
                <><h2 key = {`${cN}`} onClick = {tap} className = {`${cN}`} type = "button">{object}</h2></>
              );
            })}
        </div>
    )
}