import { useState } from "react";
import love_track_logo from "../images/love_track_logo.png"
import "../styles/newUser.css"

export default function NewUser1({childToParent}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [orientation, setOrientation] = useState("");
    const [relationshipType, setRelationshipType] = useState("");
    const [lookingFor, setLookingFor] = useState("");

    const completed = () => {
      if (!name || !age || !gender || !orientation || !relationshipType || !lookingFor){
        alert("Please fill in each box!")
        return false;
      }
      if (age < 18){
        alert("You must be 18 or older to use this app!")
        return false;
      }
      return true;
    }

    const OnChangeHandler = (event,func) => {
      func(event.target.value)
    }

    return (
        <div className='screen'>
          <div className='screenSettings'>
            <div className="top">
              <div className='titleBtn' id='titleButton'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
              </div>
      
              <div>
                <h3 className='setGreen'>W e l c o m e !</h3>
              </div>
            </div>
            
    
            <div className='formDiv'>
              <form>
                <label onChange={(event) => {OnChangeHandler(event, setName)}}>First Name <br />
                <input className="input-name" type="text" name="name" defaultValue={name}/>
                </label> <br />
                <label onChange={(event) => {OnChangeHandler(event, setAge)}}>Age<br />
                <input className="input-age" type="text" name="age" defaultValue={age}/>
                </label><br /> 
                <label onChange={(event) => {OnChangeHandler(event, setGender)}}> Gender<br />
                  <input type="radio" name="gender" id='rdGMale'  value="Male" />Male
                  <input type="radio" name="gender" id='rdGFemale' value="Female"/>Female
                  <input type="radio" name="gender" id='rdGOther' value="Other"/>Other
                </label><br />
                <label onChange={(event) => {OnChangeHandler(event, setOrientation)}}>Sexual Orientation<br />
                <input type="text" name="sexualOrientation" defaultValue={orientation}/>
                </label><br />
    
                <label onChange={(event) => {OnChangeHandler(event, setRelationshipType)}}> Type of Relationship?<br />
                  <input type="radio" name="relationshipType" id='rdCasual'  value="Casual"/>Casual
                  <input type="radio" name="relationshipType" id='rdSerious' value="Serious"/>Serious
                </label><br />
                <label onChange={(event) => {OnChangeHandler(event, setLookingFor)}}> Looking For<br />
                  <input type="radio" name="lookingFor" id='rdLMale'  value="Male"/>Male
                  <input type="radio" name="lookingFor" id='rdLFemale' value="Female"/>Female
                  <input type="radio" name="lookingFor" id='rdLOther' value="Other"/>Other
                  <input type="radio" name="lookingFor" id='rdLAny' value="Any"/>Any
                </label>
              </form>
            </div>
            <button className="next-button" onClick={() => {
              if (completed()){
                childToParent(
                  {
                    name:name,
                    age:age,
                    gender:gender,
                    lookingFor:lookingFor,
                    relationshipType:relationshipType,
                    orientation:orientation
                  }, 1)
              }
            }}>
                N E X T
            </button>
          </div>
        </div>  
      );
}