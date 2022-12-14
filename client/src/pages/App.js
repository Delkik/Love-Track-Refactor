import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from './home';
import Lyrics from './lyrics';
import Main from './main';
import Match from './match';
import Music from './music';
import Profile from './profile';
import Settings from './settings';
import Social from './social';
import '../App.css';

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/match" element={<Match/>} />
            <Route path="/social" element={<Social/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/music" element={<Music/>} />
            <Route path="/lyrics" element = {<Lyrics/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
