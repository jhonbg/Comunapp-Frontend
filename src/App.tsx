import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginPage';
import Users from './pages/Users';
import Housing from './pages/housingpage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Housing' element={<Housing/>}/>
      </Routes>
    </Router>
  );
}

export default App
