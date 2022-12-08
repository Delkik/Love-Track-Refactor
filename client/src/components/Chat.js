import '../App.css';
import '../css/chat.css'
import profile_pic from '../images/profile.png'
import img1 from '../images/match1.png'
import img2 from '../images/match2.png'
import img3 from '../images/match3.png'
import img4 from '../images/match4.png'
import img5 from '../images/match5.png'
import background from '../images/nav_bar.png'
import home from '../images/home_button.png'
import chat from '../images/chat_button.png'
import social_media from '../images/social_media_button.png'
import {Link} from 'react-router-dom'

function Chat() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='header'>
          <div className='left'>
            <p>MATCHES</p>
          </div>
          <div className='right'>
            <img src={profile_pic} alt='profile pic' />
          </div>
        </div>
        <div className='chats'>
          <div className='chat'>
            <table>
              <tr>
                <td rowSpan={2}> <img src={img1} alt='' /></td>
                <td className='name'> Lana Rose</td>
              </tr>
              <tr>
                <td className='message'>Smd</td>
              </tr>
            </table>
          </div>
          <div className='chat'>
            <table>
              <tr>
                <td rowSpan={2}> <img src={img2} alt='' /></td>
                <td className='name'> Rob Shob</td>
              </tr>
              <tr>
                <td className='message'>You ate vindallo last night?</td>
              </tr>
            </table>
          </div>
          <div className='chat'>
            <table>
              <tr>
                <td rowSpan={2}> <img src={img3} alt='' /></td>
                <td className='name'> Maria Vernandez</td>
              </tr>
              <tr>
                <td className='message'>Wanna link?</td>
              </tr>
            </table>
          </div>
          <div className='chat'>
            <table>
              <tr>
                <td rowSpan={2}> <img src={img4} alt='' /></td>
                <td className='name'> Alia Suave</td>
              </tr>
              <tr>
                <td className='message'>I hate you</td>
              </tr>
            </table>
          </div>
          <div className='chat'>
            <table>
              <tr>
                <td rowSpan={2}> <img src={img5} alt='' /></td>
                <td className='name'> Shostam Barvav</td>
              </tr>
              <tr>
                <td className='message'>Buy me curry</td>
              </tr>
            </table>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${background})` }} className='nav_bar_chat'>
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

export default Chat;