import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import AdminPanel from './components/admin';

function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/admin/:page' element={<AdminPanel />}/>
      </Routes>
    </Router>
  );
}

export default App;
