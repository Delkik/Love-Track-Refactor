import Navtab from "../components/Navtab";
import { useDispatch, useSelector } from "react-redux";
import "../styles/profile.css"
import { useState } from "react";
import { setUser } from "../redux/user";
import Navbar from "../components/Navbar";
import love_track_logo from "../images/love_track_logo.png"
import { Navigate } from "react-router-dom";
var parse = require('html-react-parser');

export default function Profile(){

    let user = useSelector(state => state.user.value)
    const [image, setImage] = useState()
    const dispatch = useDispatch()

    if (Object.keys(user).length === 0){
        return <Navigate to="/"/>
    }


	console.log(user)

    const interests = [
        "Gaming",
        "Tennis",
        "Racing",
        "Fishing",
        "Water",
        "Water",
        "Water",
        "Water",
        "Water",
        "Water",
    ]

    function handleChange(event) {
        setImage(event.target.files[0])
    }

    const fileHandler = (e) => {
        console.log(image)
        let formData = new FormData();
        formData.append("file",image)
        formData.append('fileName', image.name);
        if (image.type.slice(0,5) !== "image"){
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

            let d = {...user.user,profile_img:data["link"]}
            // console.log(d)
            dispatch(setUser({user:d}))
            fetch("http://localhost:5000/update_user", {
                method: 'PUT',
                body: JSON.stringify(d),
                mode: 'cors',
            })
                
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Navbar/>
            <div className="profile-screen">

                <div className="profile-main">
                    <div className="PLEASE">
                        <img src={user.user.profile_img} className='profile-pic'/>
                        <input type='file' id='input-file' accept="image/*" name='Image Uploader' onChange={handleChange}/>
                        <button type="submit" onClick={fileHandler}>Upload</button>
                    </div>
                    <div className="pain">
                        <div className='pro'>
                            {user.user.name}, {user.user.age}
                        </div>
                        <div className="profile-title">
                            {
                                user.user.occupation ? user.user.occupation : 
                                user.user.school ? "Student" : "Home"
                            }
                            <br/>   
                            {
                                user.user.job ? user.user.job : 
                                user.user.school ? user.user.school : "Unemployed"
                            }
                        </div>
                    </div>
                    <div className='about'>
                        <h3>About me</h3>
                        <p>{user.user.description === undefined || user.user.description === "" ? "Write something here!" : parse(user.user.description.replaceAll("\n","<br/>"))}<br/></p>
                    </div>
                    <div className='profile-interests'>
                        <h3>My Interests</h3>
                        {
                            interests.map((interest, idx) => {
                                return (<p key={idx}>{interest}</p>)
                            })
                        }
                    </div>
                </div>
			</div>
            <Navtab/>
        </div>
    )
}