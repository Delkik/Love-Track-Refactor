import '../App.css';
import '../css/talking02.css';
import vector from '../images/vector.png'
import settings from '../images/settings.png'
import chatp1 from '../images/chatp1.png'
import skip_next_button from '../images/skip-next_button.png'
import social_media_button from '../images/social_media_button.png'
import track_pic from '../images/track_pic.png'
import music_bar from '../images/music_bar.png'
//import {Link} from "react-router-dom";

function Talking02() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='header_talking02'>
          <div className='left_talking02'>
            <img src={vector} alt='Vector img' />
          </div>
          <div className='right_talking02'>
            <img src={settings} alt='Settings Button on Talking 01' />
          </div>
        </div>
        <p className='name_talking02'>Sanjida</p>
        <div className='blank'>
        </div>
        <div className='received_message'>
          <img src={chatp1} alt='Chat pic 01' />
          <p>Do you own a Beemar?</p>
        </div>
        <div className='sent_message'>
          <p>No.</p>
        </div>
        <div className='received_message'>
          <img src={chatp1} alt='Chat pic 01' />
          <p>I love you</p>
        </div>
        <div className='footer_talking02' style={{ backgroundImage: `url(${music_bar})` }}>
          <img src={track_pic} alt='' />
          <div>
            <p>Sanjida Bhyiyan - Gangsta's Paradise</p>
            <p id='green'>iPhone 14</p>
          </div>
          <img src={social_media_button} alt='' />
          <img src={skip_next_button} alt='' />
        </div>
        <progress id="seekbar02" value="10" max="100"></progress>
      </div>
    </div>    
  );
}

export default Talking02;