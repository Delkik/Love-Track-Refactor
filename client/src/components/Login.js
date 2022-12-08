import '../App.css';
import '../css/login.css'
import {Link} from "react-router-dom";
import loginButton from '../images/login_button.png'
import titleButton from '../images/title.png'

function Login() {
  return (
    <div className='screen'>
      <div className='screenSettings' >
        <div className='alignment'>
          <div className='titleBtn' id=''>
            <img src={titleButton} alt='Title Button' />
          </div>
          <div className='loginBtn'>
          <Link to='/newuser01'>
            <img src={loginButton} alt='Login Button' />
          </Link>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default Login;