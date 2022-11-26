import Navtab from "../components/Navtab";
import { useSelector } from "react-redux";

export default function Settings(){

    let data = useSelector(state => state.user.value)

    return (
        <div>
            <div className='screenSettings'>
        <div className='icon'>
         {/* <img src={love_track_logo} alt='title icon' /> */}
         <p className='break'></p>
         <p>Settings</p>         
        </div>
        <div className='location'>
          {/* <img src={location} alt='Location Icon' /> */}
          <p>Location</p>
        </div>
        <div className='name'>
          {/* <img src={name} alt='Name Icon' /> */}
          <p>Name</p>
        </div>
        <div className='gender'>
          {/* <img src={gender} alt='Gender Icon' /> */}
          <p>Gender</p>
        </div>
        <div className='bio'>
          {/* <img src={bio} alt='Bio Icon' /> */}
          <p>Bio</p>
        </div>

      </div>
            <Navtab/>
        </div>
    )
}