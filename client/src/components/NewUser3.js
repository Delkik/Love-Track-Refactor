import { useState } from "react";

export default function NewUser3({childToParent}){
    const [occupation, setOccupation] = useState();
    const [school, setSchool] = useState();
    const [description, setDescription] = useState();
    const [favoriteColor, setFavoriteColor] = useState();
    const [location, setLocation] = useState();
    const [locationRange, setLocationRange] = useState();
    const [ageRange, setAgeRange] = useState();


    const completed = () => {
        // if (!occupation || !school || !description || !favoriteColor || !location || !locationRange || !ageRange){
        //   alert("Please fill in each box!")
        //   return false;
        // }
        return true;

    }
    
    const OnChangeHandler = (event,func) => {
      func(event.target.value)
    }

    return (
    
        <div className='screen'>
        <div className='screenSettings'>
          <div className='formDiv'>
            <form>
              <label > Upload your Image <br />
                <input type='file' name='image' accept='image/*' />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setOccupation)}}>Occupation <br />
              <input type="text" name="occupation" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setSchool)}}>School<br />
              <input type="text" name="school" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setDescription)}}>Description<br />
              <input type="textarea" name="description" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setFavoriteColor)}}>Favorite Color<br />
              <input type="text" name="color" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setLocation)}}>Location<br />
              <input type="text" name="location" />
              <input type='button' name="locationBtn" value='find' />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setLocationRange)}}>Location Range<br />
                <input type="text" name="locationRange" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setAgeRange)}}>Age Preference<br />
                <input type="text" name="agePreference" />
              </label> <br /> 
            </form>
          </div>
        </div>
    <button onClick={() => {
        if (completed()){
          childToParent(
            {
                occupation: occupation,
                school: school,
                description: description,
                favoriteColor: favoriteColor,
                location: location,
                locationRange: locationRange,
                ageRange: ageRange
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
    )
}