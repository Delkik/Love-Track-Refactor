import './App.css';
import Login from './components/login.js'
import Chat from './components/chat.js'
import FindLyric from './components/findlyric.js'
import Home from './components/home.js'
import Library from './components/library.js'
import NewUser01 from './components/newuser01.js'
import NewUser02 from './components/newuser02.js'
import NewUser03 from './components/newuser03.js'
import Profile from './components/profile.js'
import Settings from './components/settings.js'
import SocialMedia from './components/socialmedia.js'
import Talking01 from './components/talking01.js'
import Talking02 from './components/talking02.js'
import Waiting from './components/waiting.js'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/chat' element={<Chat />} />
        <Route exact path='/findlyric' element={<FindLyric />} />
        <Route exact path='/library' element={ <Library />} />
        <Route exact path='/newuser01' element={<NewUser01 />} />
        <Route exact path='/newuser02' element={<NewUser02 />} />
        <Route exact path='/newuser03' element={<NewUser03 />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/settings' element={<Settings />} />
        <Route exact path='/socialmedia' element={<SocialMedia />} />
        <Route exact path='/talking01' element={<Talking01 />} />
        <Route exact path='/talking02' element={<Talking02 />} />
        <Route exact path='/waiting' element={ <Waiting />} />
      </Routes>
    </Router>
  );
}
export default App;
