import Navtab from "../components/Navtab";
import { useDispatch, useSelector } from "react-redux";
import "../styles/profile.css"
import { useState } from "react";
import { setUser } from "../redux/user";

export default function Profile(){

    let user = useSelector(state => state.user.value)
    const [image, setImage] = useState()
    const dispatch = useDispatch()
	console.log(user)

    const interests = [
        "Gaming",
        "Tennis",
        "Racing",
        "Fishing",
        "Water",
    ]

    function handleChange(event) {
        setImage(event.target.files[0])
      }

    const fileHandler = (e) => {
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

            let d = user.user
            Object.assign(d,{profile_img:data["link"]})
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
            <div className='screenSettings'>

				{/* <div> */}
                    {/* <div className='icon'>
                        <img src={love_track_logo} alt='title icon' />
                    </div> */}
                    <div >
                        <img src={user.user.profile_img} className='profile-pic'/>
                        {/* <input type='file' id='input-file' name='Image Uploader' style={{ backgroundImage: `url(${upload_icon})` }} />
                    </div> */}
				    <form onSubmit={fileHandler}>
                        <input type='file' id='input-file' accept=".png,.jpg,.jpeg" name='Image Uploader' onChange={handleChange}/>
                        <button type="submit">Upload</button>
                    </form>
                    </div>
				{/* </div> */}
				<div>
				<div className='pro'>
					<span>
					{user.user.name}
					</span>
					<span>
					, 
					</span>
					<span>
					{user.user.age}
					</span>
				</div>
				<p className='occupation'> {user.user.occupation ? user.user.occupation : "Occupation"}</p>
				<p className='companyName'> {user.user.occupation ? user.user.occupation : "Company"}</p>
				</div>
				<div className='about'>
                    <h3>About me</h3>
                    <p>{user.user.bio === undefined || user.user.bio === "" ? "Write something here!" : user.user.bio}</p>
                </div>
                <div className='interests'>
                    <h3>My Interests</h3>
                    {
                        interests.map((interest, idx) => {
                            return (<p key={idx}>{interest}</p>)
                        })
                    }
				</div>
			</div>
            <Navtab/>
        </div>
    )
}