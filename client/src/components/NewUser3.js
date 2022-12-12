import { useState } from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import love_track_logo from "../images/love_track_logo.png"
import "../styles/newUser.css"

export default function NewUser3({childToParent}){
    const [occupation, setOccupation] = useState();
    const [job, setJob] = useState();
    const [school, setSchool] = useState();
    const [description, setDescription] = useState();
    const [favoriteColor, setFavoriteColor] = useState();
    const [location, setLocation] = useState();
    const [locationRange, setLocationRange] = useState(0);
    const [ageRange, setAgeRange] = useState();
    const [image, setImage] = useState();


    const completed = () => {
        // if (!occupation || !school || !description || !favoriteColor || !location || !locationRange || !ageRange){
        //   alert("Please fill in each box!")
        //   return false;
        // }
        return true;

    }

    function handleChange(event) {
      setImage(event.target.files[0])
    }

    const fileHandler = (event) => {
      console.log(event.target.files[0])
      let formData = new FormData();
      formData.append("file",event.target.files[0])
      formData.append('fileName', event.target.files[0].name);
      if (event.target.files[0].type.slice(0,5) !== "image"){
          return alert("File must be an image!")
      }
      console.log("wefuh")
      fetch("http://localhost:5000/upload", {
          method: 'POST',
          body: formData,
          mode: 'cors',
      })
      .then(async res => {
          const data = await res.json()
          if (data.code!=200){
              return alert("Invalid File!")
          }
          setImage(data["link"])
          console.log(data)
              
      })
      .catch(err => {
          console.log(err)
      })
  }

    const position = async () => {
      await navigator.geolocation.getCurrentPosition(
        position => { 
          console.log( {latitude: position.coords.latitude, 
          longitude: position.coords.longitude})
        }, 
        err => console.log(err)
      );
    }
    // position()
    
    const OnChangeHandler = (event,func) => {
      func(event.target.value)
    }

    return (
    
        <div className='screen'>
          <div className='titleBtn' id='titleButton'>
                <img className="logo" src={love_track_logo}/>
                <h1>LoveTrack</h1>
            </div>
        <div className='screenSettings'>
          <div className='formDiv'>
            <form>
              <label > Upload your Image <br />
              <input type='file' id='input-file' accept="image/*" name='Image Uploader' onChange={fileHandler}/>
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setOccupation)}}>Occupation <br />
              <input type="text" name="occupation" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setJob)}}>Company<br />
              <input type="text" name="jobTitle" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setSchool)}}>School<br />
              <input type="text" name="school" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setDescription)}}>Description<br />
              <textarea rows="6" cols="30" className="new-description"/>
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setFavoriteColor)}}>Favorite Color<br />
              <input type="text" name="color" />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setLocation)}}>Location<br />
              <input type="text" name="location" />
              <input type='button' name="locationBtn" value='find' />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setLocationRange)}}>Location Range<br />
              <RangeSlider
                value={locationRange}
                // defaultValue={data.user.locationRange}
                onChange={changeEvent => {setLocationRange(changeEvent.target.value)}}
              />
              </label> <br />
              <label onChange={(event) => {OnChangeHandler(event, setAgeRange)}}>Age Preference<br />
                <input type="text" name="agePreference" />
              </label> <br /> 
            </form>
          </div>
        </div>
    <button className="next-button" onClick={() => {
      if (completed()){
        childToParent({},-1)
      }
    }}>
        Previous 
    </button>
    <button className="next-button" onClick={() => {
        if (completed()){
          childToParent(
            {
                occupation: occupation,
                job: job,
                school: school,
                description: description,
                favoriteColor: favoriteColor,
                location: location,
                locationRange: locationRange,
                ageRange: ageRange,
                profile_img:image
            },1
            )
        }
      }}>
          Finish
      </button>
    </div>
    )
}