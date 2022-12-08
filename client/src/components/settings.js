import '../App.css';
import '../css/settings.css'
import location from '../images/location_logo.png'
import name from '../images/name_logo.png'
import gender from '../images/gender_logo.png'
import bio from '../images/bio_logo.png'
import love_track_logo from '../images/love_track_logo.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'
import {Link} from "react-router-dom";

function Settings() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='icon'>
         <img src={love_track_logo} alt='title icon' />
         <p className='break'></p>
         <p>Settings</p>         
        </div>
        <div className='location'>
          <img src={location} alt='Location Icon' />
          <p>Location</p>
        </div>
        <div className='name_settings'>
          <img src={name} alt='Name Icon' />
          <p>Name</p>
        </div>
        <div className='gender'>
          <img src={gender} alt='Gender Icon' />
          <p>Gender</p>
        </div>
        <div className='bio'>
          <img src={bio} alt='Bio Icon' />
          <p>Bio</p>
        </div>
        <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_settings'>
        <Link to='/home'>
          <img src={home} alt='Home Button' />
        </Link>
        <Link to='/socialmedia'>
          <img src={social_media} alt='Social Media Button' />
        </Link>
        <Link to='/chat'>
          <img src={chat} alt='Chat Button' />
        </Link>

      </div>
      </div>
    </div>    
  );
}

export default Settings;