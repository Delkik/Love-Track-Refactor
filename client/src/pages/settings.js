import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import bio from '../images/bio_logo.png'
import gender from '../images/gender_logo.png'
import location from '../images/location_logo.png'
import love_track_logo from '../images/love_track_logo.png'
import name from '../images/name_logo.png'
import Navtab from "../components/Navtab";
import { setUser } from "../redux/user";
import '../styles/settings.css'

export default function Settings(){

    let data = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [value, setValue] = useState()
    let [newName, setName] = useState()
    let [newGender, setGender] = useState()
    let [newBio, setBio] = useState()
    let [age, setAge] = useState()
    let [occupation, setOccupation] = useState()
    let [company, setCompany] = useState()
    let [school, setSchool] = useState()
    let [orientation, setOrientation] = useState()
    let [favorite, setFavorite] = useState()
    let [type, setType] = useState()
    let [lookingFor, setLooking] = useState()
  
    useEffect(()=>{
      if (Object.keys(data).length === 0){
        return <Navigate to="/"/>
      }
      setValue(data.user.locationRange)
      setName(data.user.name)
      setGender(data.user.gender)
      setBio(data.user.description)
      setAge(data.user.age)
      setOccupation(data.user.occupation)
      setCompany(data.user.job)
      setSchool(data.user.school)
      setOrientation(data.user.orientation)
      setFavorite(data.user.favoriteColor)
      setType(data.user.relationshipType)
      setLooking(data.user.lookingFor)
    },[])

    const onSave = (e) => {

      let newData = {
        ...data.user,
        gender:newGender,
        name:newName,
        locationRange:value,
        description:newBio,
        age:age,
        occupation:occupation,
        favoriteColor:favorite,
        job:company,
        relationshipType:type,
        orientation:orientation,
        lookingFor:lookingFor,
        school:school
      }

      if (!newName || !age || !orientation || !type || !newGender || !lookingFor){
        return alert("Please fill in the required information!")
      }

      dispatch(setUser({user: newData}))
      fetch("http://localhost:5000/update_user", {
        method: 'PUT',
        body: JSON.stringify(newData),
        mode: 'cors',
      })
      .then(async res => {
        const data = await res.json()
        navigate("/home")
        alert("Saved!")
            
      })
      .catch(err => {
          console.log(err)
      })
    }

    return (
      <div className="haha">
        <div className='icon'>
          <img src={love_track_logo} alt='title icon' />     
        </div>
        <p className="title">Settings</p>    
        <div className='settings-main'>
          <div className="formDiv">
            
            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Name*</p>
            </div>
            <input type="text" name="name" defaultValue={data.user.name} onChange={event => setName(event.target.value)}/>
            
            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Age*</p>
            </div>
            <input type="text" name="age" defaultValue={data.user.age} onChange={event => setAge(event.target.value)}/>

            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Occupation</p>
            </div>
            <input type="text" name="name" defaultValue={data.user.occupation} onChange={event => setOccupation(event.target.value)}/>
            
            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Company</p>
            </div>
            <input type="text" name="name" defaultValue={data.user.job} onChange={event => setCompany(event.target.value)}/>
            
            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>School</p>
            </div>
            <input type="text" name="name" defaultValue={data.user.school} onChange={event => setSchool(event.target.value)}/>

            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Orientation*</p>
            </div>
            <input type="text" name="orientation" defaultValue={data.user.orientation} onChange={event => setOrientation(event.target.value)}/>

            <div className='options'>
              <img src={name} alt='Name Icon' />
              <p>Favorite Color</p>
            </div>
            <input type="text" name="favorite" defaultValue={data.user.favoriteColor} onChange={event => setFavorite(event.target.value)}/>

            <div className='options'>
              <img src={gender} alt='Gender Icon' />
              <p>Relationship Type*</p>
            </div>
            <div onChange = {event => setType(event.target.value)}>
              <input type="radio" value="Casual" name="rel" defaultChecked={data.user.relationshipType === "Casual"}/> Casual
              <input type="radio" value="Serious" name="rel" defaultChecked={data.user.relationshipType === "Serious"}/> Serious
            </div>

            <div className='options'>
              <img src={gender} alt='Gender Icon' />
              <p>Gender*</p>
            </div>
            <div onChange = {event => setGender(event.target.value)}>
              <input type="radio" value="Male" name="gender" defaultChecked={data.user.gender === "Male"}/> Male
              <input type="radio" value="Female" name="gender" defaultChecked={data.user.gender === "Female"}/> Female
              <input type="radio" value="Other" name="gender" defaultChecked={data.user.gender === "Other"}/> Other
            </div>
    
            <div className='options'>
              <img src={gender} alt='Gender Icon' />
              <p>Looking For*</p>
            </div>
            <div onChange = {event => setLooking(event.target.value)}>
              <input type="radio" value="Male" name="looking" defaultChecked={data.user.lookingFor === "Male"}/> Male
              <input type="radio" value="Female" name="looking" defaultChecked={data.user.lookingFor === "Female"}/> Female
              <input type="radio" value="Other" name="looking" defaultChecked={data.user.lookingFor === "Other"}/> Other
              <input type="radio" value="Any" name="looking" defaultChecked={data.user.lookingFor === "Any"}/> Any
            </div>

            <div className='options'>
              <img src={bio} alt='Bio Icon' />
              <p>Bio</p>
            </div>
            <textarea rows="6" cols="30" className="new-description" defaultValue={data.user.description} onChange={event => setBio(event.target.value)}/>
            <br/>

            <div className='options'>
              <img src={location} alt='Location Icon' />
              <p>Distance: {
                value === "0" ? "<0": 
                value === "100" ? "100+":
                value
                } miles</p>
            </div>
            <RangeSlider
                value={data.user.locationRange}
                onChange={changeEvent => setValue(changeEvent.target.value)}
              />

            <button className="settings-button next-button" onClick={onSave}>
              Save
            </button>
          
          </div>
        </div>
        <Navtab/>
      </div>
    )
}