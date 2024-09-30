import './App.css';
import Contacts from './components/contacts/index';
import Edit from './components/contacts/Edit';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    
      <div className="container">
      <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Contacts />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </Router>
      </div>
    </div>
    
  );
}

export default App;
