import '../App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Main from './main';
import HomePage from './home';
import Match from './match';
import Social from './social';
import Profile from './profile';
import Music from './Music';
import Chat from './Chat'
import Settings from './settings';

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
            <Route path="/music" element={<Music/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
