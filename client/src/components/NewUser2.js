import { useState } from 'react';
// import styles from '../styles/newUserSecond.module.css'
// import Style from '../styles/newUserSecond.module.css'

var l = ['cars', 'toys', 'fashion', 'food', 'drawing'];
var cN = "ting"
var count = 1
export default function NewUser2({childToParent}){
    const [interests, setInterests] = useState([]);
    
    const completed = () => {
        if (false){
          alert("Please fill in each box!")
          return false;
        }
        return true;

    }
    
    return (
        <div>
            {/* <div className={styles.titleBtn} id='titleButton'>
                <img src="/title.png" alt='Title Button'/>
            </div> */}

        
            <div className = "wrapList">
                {/* {l.map(function(object) { 
                    cN = cN + count
                    count+=1
                    return (
                        <><h2 className = {Style[`${cN}`]} type = "button">{object}</h2></>
                    );
                    
                    })} */}
                    Interests page
            </div>
    
          <button onClick={() => {
                if (completed()){
                childToParent(
                    {
                        test:2
                    },1
                    )
                }
            }}>
                Next
            </button>
            <button onClick={() => {
                if (completed()){
                childToParent({},-1)
                }
            }}>
                Previous
            </button>
        </div>
    
    // <div>Hi 2

    // </div>
    )
}