import '../App.css';
import '../css/home.css'
import {Link} from "react-router-dom";
import settings from '../images/settings_button.png'
import profile from '../images/profile.png'
import titleButton from '../images/title.png'
import matching from '../images/matching_button.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'

function Home() {
  return (
  <div className='screen'>
    <div className='screenSettings'>
      <div className='header'>
        <div className='setting'>
          <Link to='/settings' >
            <img src={settings} alt='Setting Button' />
          </Link>
        </div>
        <div className='profile'>
          <Link to='/profile' >
            <img src={profile} alt='Profile Button' />
          </Link>
        </div>
      </div>
      <div className='titleBtn'>
          <img src={titleButton} alt='Title Button' />
      </div>
      <div >
        <div className='matching'>
          <Link to='/findlyric'>
            <img src={matching} alt='Matching Button' />
          </Link>
        </div>
        <div className='matching_text'>
        <p>Start Matching?</p>
        </div>
      </div>
      <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_home'>
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

export default Home;