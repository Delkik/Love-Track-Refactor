import '../App.css';
import '../css/newuser03.css'
//import ReactRanger from 'react-ranger'
import {Link} from "react-router-dom";
import FinishButton from '../images/finish_buton.png'

function NewUser03() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='formDiv03'>
          <form>
            <label> Upload your Image <br />
              <input type='file' name='image' accept='image/*' />
            </label> <br />
            <label>Occupation <br />
            <input type="text" name="occupation" />
            </label> <br />
            <label>School<br />
            <input type="text" name="school" />
            </label> <br />
            <label>Description<br />
            <input type="textarea" name="description" />
            </label> <br />
            <label>Favourite Color<br />
            <input type="text" name="color" />
            </label> <br />
            <label>Location<br />
            <input type="text" name="location" />
            <input type='button' name="locationBtn" value='find' />
            </label> <br />
            <label>Location Range<br />
              <input type="text" name="locationRange" />
            </label> <br />
            <label>Age Preference<br />
              <input type="text" name="agePreference" />
            </label> <br /> 
          </form>
        </div>
        <div className='finishBtn'>
          <Link to='/home'>
            <img src={FinishButton} alt='Finish Button' />
          </Link>
        </div>
      </div>
    </div>    
  );
}

export default NewUser03;