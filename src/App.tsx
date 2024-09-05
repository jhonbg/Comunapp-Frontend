import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App
