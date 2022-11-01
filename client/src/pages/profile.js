import { useRouter } from "next/router";
import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";

export default function Profile(){
	// const [data, setData] = useState();

	// useEffect(() => {
	// 	if (JSON.stringify(terminalPayload)!="{}"){
	// 		setData(terminalPayload)
	// 	}
	// 	else{
	// 		router.push("/")
	// 	}
	// }, [terminalPayload])


    return (
        <div>
            <div className='screenSettings'>

				<div className='profile-pic'>
				<input type='file' id='input-file' name='Image Uploader'  />
				</div>
				<div>
				<div className='pro'>
					<span>
					{terminalPayload.name}
					</span>
					<span>
					, 
					</span>
					<span>
					{terminalPayload.age}
					</span>
				</div>
				<p className='occupation'> {terminalPayload.occupation ? terminalPayload.occupation : "Occupation"}</p>
				<p className='companyName'> {terminalPayload.occupation ? terminalPayload.occupation : "Company"}</p>
				</div>
				<div className='about'>
				<h3>About me</h3>
				<p>Write something here! </p>
				</div>
				<div className='interests'>
				<h3>My Interests</h3>
				<p>Interest 01</p> 
				<p>Interest 02</p>
				<p>Interest 03</p>
				</div>
			</div>
            <Navtab data={data}/>
        </div>
    )
}