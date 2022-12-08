import '../App.css';
import '../css/talking01.css';
import chat_button_talking from '../images/chat_button_talking.png'
import settings from '../images/settings.png'
import skip_next_button from '../images/skip-next_button.png'
import skip_rewind_button from '../images/skip-rewind_button.png'
import track_pic from '../images/track_pic.png'
import social_media_button from '../images/social_media_button.png'
import vector from '../images/vector.png'

//import {Link} from "react-router-dom";

function Talking01() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='header_talking'>
          <div className='left_talking'>
            <img src={vector} alt='Vector img' />
          </div>
          <div className='right_talking'>
            <img src={settings} alt='Settings Button on Talking 01' />
          </div>
        </div>
        <div className='track_pic'>
          <img src={track_pic} alt='Track pic' />
        </div>
        <div className='track_details'>
          <div className='track_content'>
            <h3>Sanjida Bhyiyan</h3>
            <p>Gangsta's Paradise</p>
          </div>
          <div className='chat_button'>
            <img src={social_media_button} alt='Social Media Button' />
          </div>
        </div>
        <div className='progress'>
          <progress id="seekbar" value="0" max="1"></progress>
        </div>
        <div className='controls'>
          <img src={skip_rewind_button} alt='Rewind Button' />
          <img src={chat_button_talking} alt='Chat Button' />
          <img src={skip_next_button} alt='Next Button' />
        </div>
        <div className='footer'>
          <p>iPhone 14</p>
        </div>
      </div>
    </div>    
  );
}

export default Talking01;