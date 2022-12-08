import '../App.css';
import '../css/newuser01.css'
import titleButton from '../images/title.png'
import NextButton from '../images/next_button.png'
import {Link} from "react-router-dom";

function NewUser01() {
  return (
    <div className='screen'>
      <div className='screenSettings'>

        <div className='titleBtn' id='titleButton'>
          <img src={titleButton} alt='Title Button' />
        </div>

        <div>
          <h3 className='setGreen'>Welcome</h3>
        </div>

        <div className='formDiv'>
          <form>
            <label>First Name <br />
            <input type="text" name="name" />
            </label> <br />
            <label>Age<br />
            <input type="text" name="age" />
            </label><br /> 
            <label> Gender<br />
              <input type="radio" name="gender" id='rdGMale'  />Male
              <input type="radio" name="gender" id='rdGFemale' />Female
              <input type="radio" name="gender" id='rdGOther' />Other
            </label><br />
            <label>Sexual Orientation<br />
            <input type="text" name="sexualOrientation" />
            </label><br />

            <label> Type of Relationship?<br />
              <input type="radio" name="relationshipType" id='rdCasual'  />Casual
              <input type="radio" name="relationshipType" id='rdSerious' />Serious
            </label><br />
            <label> Looking For<br />
              <input type="radio" name="lookingFor" id='rdLMale'  />Male
              <input type="radio" name="lookingFor" id='rdLFemale' />Female
              <input type="radio" name="lookingFor" id='rdLOther' />Other
            </label>
          </form>
        </div>
        <div className='formNext'>
          <Link to='/newuser02'>
            <img src={NextButton} alt='Next Button' />
          </Link>
        </div>
      </div>
    </div>  
  );
}

export default NewUser01;