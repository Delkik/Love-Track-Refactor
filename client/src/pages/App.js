import '../App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Main from './main';

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
