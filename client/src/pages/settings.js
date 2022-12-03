import Navtab from "../components/Navtab";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import '../styles/settings.css'
import location from '../images/location_logo.png'
import name from '../images/name_logo.png'
import gender from '../images/gender_logo.png'
import bio from '../images/bio_logo.png'
import love_track_logo from '../images/love_track_logo.png'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { setUser } from "../redux/user";
import { useNavigate } from "react-router-dom";

export default function Settings(){

    let data = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [value, setValue] = useState(data.user.locationRange === "" ? 0 : parseInt(data.user.locationRange,10))
    let [newName, setName] = useState(data.user.name)
    let [newGender, setGender] = useState(data.user.gender)
    let [newBio, setBio] = useState(data.user.bio)
  
    const onChangeValue = (e, func) => {
      func(e.target.value)
      console.log(e.target.value)
    }

    const onSave = (e) => {
      let newData = {...data.user,gender:newGender,name:newName,locationRange:value,bio:newBio}
      console.log(newData)

      dispatch(setUser({user: newData}))
      fetch("http://localhost:5000/update_user", {
        method: 'PUT',
        body: JSON.stringify(newData),
        mode: 'cors',
      })
      .then(async res => {
        const data = await res.json()
        console.log(data)
        
        navigate("/home")
        alert("Saved!")
            // window.history.pushState({}, null, "/")
            
      })
      .catch(err => {
          console.log(err)
          // window.location = '/'
      })
    }

    return (
      <div>
        <div className='icon'>
          <img src={love_track_logo} alt='title icon' />     
        </div>
        <p className="title">Settings</p>    
      <div className='screen'>
       
        <div className='options'>
          <img src={name} alt='Name Icon' />
          <p>Name</p>
        </div>
        <input type="text" name="name" defaultValue={data.user.name} onChange={event => setName(event.target.value)}/>
        <div className='options'>
          <img src={gender} alt='Gender Icon' />
          <p>Gender</p>
        </div>
        <div onChange = {event => setGender(event.target.value)}>
        <input type="radio" value="Male" name="gender" defaultChecked={data.user.gender === "Male"}/> Male
        <input type="radio" value="Female" name="gender" defaultChecked={data.user.gender === "Female"}/> Female
        </div>
  
        <div className='options'>
          <img src={bio} alt='Bio Icon' />
          <p>Bio</p>
        </div>
  
        <textarea defaultValue={data.user.bio} onChange={event => setBio(event.target.value)}/>
        <br/>

        <div className='options'>
          <img src={location} alt='Location Icon' />
          <p>Distance</p>
        </div>
        <RangeSlider
            value={value}
            // defaultValue={data.user.locationRange}
            onChange={changeEvent => setValue(changeEvent.target.value)}
          />

        <button className="settings-save" onClick={onSave}>
          Save
        </button>
      
      </div>
      <Navtab/>
      </div>
    )
}