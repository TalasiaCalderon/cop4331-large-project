import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
