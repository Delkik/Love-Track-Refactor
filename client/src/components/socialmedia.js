import '../App.css';
import '../css/socialmedia.css'
import lyric_profile from '../images/lyric_profile.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'
import match1 from '../images/match1.png'
import match2 from '../images/match2.png'
import match3 from '../images/match3.png'
import match4 from '../images/match4.png'
import {Link} from "react-router-dom";
//          <img src={} alt='' />
function SocialMedia() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='header_socialmedia'>
            <Link to='/profile'>
              <img src={lyric_profile} alt='profile pic' />
            </Link>
        </div>
        <hr />
        <div className='chat_section'>
          <div className='chat_section_header'>
            <Link to='/profile'>
              <img src={match1} alt='Match 01 profile pic' />
            </Link>
            <p>
            “You told a story like shorty was feelin' you
            She told a story like she split the bill with you” (Never Recover- Drake)
            </p>
          </div>
          <div className='chat_section_footer'>
            <Link to='/socialmedia'>
              <img src={social_media} alt='Social Media Button' />
            </Link>
            <Link to='/chat'>
              <img src={chat} alt='Chat Button' />
            </Link>
          </div>
        </div>
        <hr />
        <div className='chat_section'>
          <div className='chat_section_header'>
            <Link to='/profile'>
              <img src={match2} alt='Match 02 profile pic' />
            </Link>
            <p>
            “Sephiroth” (One-Winged Angel)
            </p>
          </div>
          <div className='chat_section_footer'>
            <Link to='/socialmedia'>
              <img src={social_media} alt='Social Media Button' />
            </Link>
            <Link to='/chat'>
              <img src={chat} alt='Chat Button' />
            </Link>
          </div>
        </div>
        <hr />
        <div className='chat_section'>
          <div className='chat_section_header'>
            <Link to='/profile'>
              <img src={match3} alt='Match 03 profile pic' />
            </Link>
            <p>
            “Sephiroth” (One-Winged Angel)
            </p>
          </div>
          <div className='chat_section_footer'>
            <Link to='/socialmedia'>
              <img src={social_media} alt='Social Media Button' />
            </Link>
            <Link to='/chat'>
              <img src={chat} alt='Chat Button' />
            </Link>
          </div>
        </div>
        <hr />
        <div className='chat_section'>
          <div className='chat_section_header'>
            <Link to='/profile'>
              <img src={match4} alt='Match 04 profile pic' />
            </Link>
            <p>
            “Sephiroth” (One-Winged Angel)
            </p>
          </div>
          <div className='chat_section_footer'>
            <Link to='/socialmedia'>
              <img src={social_media} alt='Social Media Button' />
            </Link>
            <Link to='/chat'>
              <img src={chat} alt='Chat Button' />
            </Link>
          </div>
        </div>
        <hr />
        <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_socialmedia'>
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

export default SocialMedia;