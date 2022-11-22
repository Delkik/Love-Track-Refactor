import Navtab from "../components/Navtab";
import { useSelector } from "react-redux";
import "../styles/profile.css"

export default function Profile(){

    let data = useSelector(state => state.user.value)
	console.log(data)

    const interests = [
        "Gaming",
        "Tennis",
        "Racing",
        "Fishing",
        "Water",
    ]


    return (
        <div>
            <div className='screenSettings'>

				<div className='profile-pic'>
				<input type='file' id='input-file' name='Image Uploader'  />
				</div>
				<div>
				<div className='pro'>
					<span>
					{data.user.name}
					</span>
					<span>
					, 
					</span>
					<span>
					{data.user.age}
					</span>
				</div>
				<p className='occupation'> {data.occupation ? data.occupation : "Occupation"}</p>
				<p className='companyName'> {data.occupation ? data.occupation : "Company"}</p>
				</div>
				<div className='about'>
                    <h3>About me</h3>
                    <p>Write something here! </p>
                </div>
                <div className='interests'>
                    <h3>My Interests</h3>
                    {
                        interests.map((interest) => {
                            return (<p>{interest}</p>)
                        })
                    }
				</div>
			</div>
            <Navtab/>
        </div>
    )
}