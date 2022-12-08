import '../App.css';
import '../css/findlyric.css'
import lyric_profile from '../images/lyric_profile.png'
import settings_button from '../images/settings_button.png'
import confirm_button from '../images/confirm_button.png'
import search_button from '../images/searching_button.png'
import find_new from '../images/find_new.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'
import {Link} from "react-router-dom";

function FindLyric() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='header_lyric'>
        <Link to='/settings'>
          <img src={settings_button} alt='Settings pic' />
        </Link>
        <Link to='/profile'>
          <img src={lyric_profile} alt='profile pic' />
        </Link>
        </div>
        <div style={{ backgroundImage: `url(${search_button})` }} className='searching'>
            <p><b>Searching for a Love Track...</b></p>
        </div>
        <div className='lyric'>
          <p>Lyric:</p>
          <p>
            "You told a story like shorty was feelin' you"
            <br />
            She told a story like she split the bill with you"
          </p>
        </div>
        <div className='song'>
          <p>Song:</p>
          <p>Never Recover - Drake</p>
        </div>
        <div className='buttons'>
          <div style={{ backgroundImage: `url(${confirm_button})` }}>
            <p>Confirm</p>
          </div>
          <br />
          <div style={{ backgroundImage: `url(${find_new})` }}>
            <p>Find New</p>
          </div>
        </div>
        <div>

        </div>
        <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_findlyric'>
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

export default FindLyric;