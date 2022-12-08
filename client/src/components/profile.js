import '../App.css';
import '../css/profile.css'
import love_track_logo from '../images/love_track_logo.png'
import profile from '../images/profile.png'
import upload_icon from '../images/upload_icon.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'
import {Link} from "react-router-dom";

function Profile() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='icon'>
         <img src={love_track_logo} alt='title icon' />
        </div>
        <div style={{ backgroundImage: `url(${profile})` }} className='profile-pic'>
          <input type='file' id='input-file' name='Image Uploader' style={{ backgroundImage: `url(${upload_icon})` }} />
        </div>
        <div>
          <div className='pro'>
              <span>
              User Name
              </span>
              <span>
              ,
              </span>
              <span>
              Age
              </span>
          </div>
          <p className='designation'> Designation</p>
          <p className='companyName'> Company Name</p>
        </div>
        <div className='about'>
          <h3>About me</h3>
          <p>About me paragraph.... </p>
        </div>
        <div className='interests'>
          <h3>My Interests</h3>
          <p>Interest 01</p> 
          <p>Interest 02</p>
          <p>Interest 03</p>
        </div>
        <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_profile'>
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

export default Profile;