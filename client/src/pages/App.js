import '../App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Main from './main';
import HomePage from './home';
import Match from './match';

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/match" element={<Match/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
