import Navtab from "../components/Navtab";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/settings.css'
import location from '../images/location_logo.png'
import name from '../images/name_logo.png'
import gender from '../images/gender_logo.png'
import bio from '../images/bio_logo.png'
import love_track_logo from '../images/love_track_logo.png'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';


import {Link} from "react-router-dom";

export default function Settings(){
    const {state} = useLocation();
    const [value, setValue] = useState(0)
    const [newName, setName] = useState("")
    const [newGender, setGender] = useState("")
  
    const data = state
    console.log(data)

    const onChangeValue = (e) => {
      setGender(e.target.value)
      console.log(newGender)
    }
    return (
      <div>
        <div className='icon'>
          <img src={love_track_logo} alt='title icon' />     
        </div>
        <p className="title">Settings</p>    
      <div className='screen'>
        
        <div className='options'>
          <img src={location} alt='Location Icon' />
          <p>Distance</p>
        </div>
        <RangeSlider
            value={value}
            onChange={changeEvent => setValue(changeEvent.target.value)}
          />

        
        <div className='options'>
          <img src={name} alt='Name Icon' />
          <p>Name</p>
        </div>
        <input type="text" name="name" />
        <div className='options'>
          <img src={gender} alt='Gender Icon' />
          <p>Gender</p>
        </div>
        <div onChange = {onChangeValue}>
        <input type="radio" value="Male" name="gender" /> Male
        <input type="radio" value="Female" name="gender" /> Female
        </div>

        <div className='options'>
          <img src={bio} alt='Bio Icon' />
          <p>Bio</p>
        </div>

        <textarea />
      
      
      </div>
      <Navtab data={data}/>
      </div>
    )
}