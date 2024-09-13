import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginPage';
import Users from './pages/Users';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Users' element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App
