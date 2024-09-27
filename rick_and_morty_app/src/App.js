import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Detail from "./pages/Detail"
import './App.css';

function App() {
  return (
    <Router>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/char/:char_id' element={<Detail />} />
      </Routes>

    </Router>
  );
}

export default App;
