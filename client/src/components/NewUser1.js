import { useState } from "react";

export default function NewUser1({childToParent}) {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [orientation, setOrientation] = useState();
    const [relationshipType, setRelationshipType] = useState();
    const [lookingFor, setLookingFor] = useState();

    const completed = () => {
    //   if (!name || !age || !gender || !orientation || !relationshipType || !lookingFor){
    //     alert("Please fill in each box!")
    //     return false;
    //   }
    //   if (age < 18){
    //     alert("You must be 18 or older to use this app!")
    //     return false;
    //   }
      return true;
      // if (!age){
      //   alert("Please enter an age!")
      //   return false;
      // }
      // if (!gender){
      //   alert("Please enter your gender!")
      //   return false;
      // }
      // if (!name){
      //   alert("Please enter a name!")
      //   return false;
      // }
      // if (!name){
      //   alert("Please enter a name!")
      //   return false;
      // }
      // if (!name){
      //   alert("Please enter a name!")
      //   return false;
      // }
    }

    const OnChangeHandler = (event,func) => {
      // console.log(event.target.value)
      func(event.target.value)
    }

    return (
        <div className='screen'>
          <div className='screenSettings'>
    
            <div className='titleBtn' id='titleButton'>
              <h1>LoveTrack</h1>
            </div>
    
            <div>
              <h3 className='setGreen'>Welcome</h3>
            </div>
    
            <div className='formDiv'>
              <form>
                <label onChange={(event) => {OnChangeHandler(event, setName)}}>First Name <br />
                <input type="text" name="name"/>
                </label> <br />
                <label onChange={(event) => {OnChangeHandler(event, setAge)}}>Age<br />
                <input type="text" name="age" />
                </label><br /> 
                <label onChange={(event) => {OnChangeHandler(event, setGender)}}> Gender<br />
                  <input type="radio" name="gender" id='rdGMale'  value="Male"/>Male
                  <input type="radio" name="gender" id='rdGFemale' value="Female"/>Female
                  <input type="radio" name="gender" id='rdGOther' value="Other"/>Other
                </label><br />
                <label onChange={(event) => {OnChangeHandler(event, setOrientation)}}>Sexual Orientation<br />
                <input type="text" name="sexualOrientation" />
                </label><br />
    
                <label onChange={(event) => {OnChangeHandler(event, setRelationshipType)}}> Type of Relationship?<br />
                  <input type="radio" name="relationshipType" id='rdCasual'  value="Casual"/>Casual
                  <input type="radio" name="relationshipType" id='rdSerious' value="Serious"/>Serious
                </label><br />
                <label onChange={(event) => {OnChangeHandler(event, setLookingFor)}}> Looking For<br />
                  <input type="radio" name="lookingFor" id='rdLMale'  value="Male"/>Male
                  <input type="radio" name="lookingFor" id='rdLFemale' value="Female"/>Female
                  <input type="radio" name="lookingFor" id='rdLOther' value="Other"/>Other
                </label>
              </form>
            </div>
            <button onClick={() => {
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
                Next
            </button>
          </div>
        </div>  
      );
}