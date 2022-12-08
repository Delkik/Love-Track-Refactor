import '../App.css';
import '../css/newuser02.css'
import {Link} from "react-router-dom";
import NextButton from '../images/next_button.png'

function NewUser02() {
  return (
    <div className='screen'>
      <div className='screenSettings'>
        <div className='interestsDiv'>
          <h1>
            Interests
          </h1>
        </div>
        <div className='formDiv'>
          <form>
            <input type="button" name="btnCars" value='Cars' />
            <input type="button" name="btnCars" value='Gym' /> <br /><br />
            <input type="button" name="btnCars" value='Wealth' />
            <input type="button" name="btnCars" value='Property' /> <br /><br />
            <input type="button" name="btnCars" value='Party Life' />
            <input type="button" name="btnCars" value='STEM' /> <br /><br />
            <input type="button" name="btnCars" value='Books' />
            <input type="button" name="btnCars" value='Family' /> <br /><br />
            <input type="button" name="btnCars" value='Old Love' />
            <input type="button" name="btnCars" value='Food' /> <br /><br />
            <input type="button" name="btnCars" value='Skin Care' />
            <input type="button" name="btnCars" value='Traveling' /> <br /><br />
            <input type="button" name="btnCars" value='Religion' />

          </form>
        </div>
        <div className='formNext'>
          <Link to='/newuser03'>
            <img src={NextButton} alt='Next Button' />
          </Link>
        </div>
      </div>
    </div>    
    );
}

export default NewUser02;