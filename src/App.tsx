import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginPage';
import Users from './pages/Users';
import Housing from './pages/housingpage';
import Certificates from './pages/certificatespage'
import Teams from './pages/teamspage';
import { UserProvider } from './UserContext';


const App: React.FC=() =>{
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/Users' element={<Users />} />
          <Route path='/Housing' element={<Housing/>}/>
          <Route path='/Certificates' element={<Certificates/>}/>
          <Route path='/Teams' element={<Teams/>}/>
        </Routes>
      </Router>
    </UserProvider>  
  );
}

export default App
