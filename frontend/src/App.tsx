import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import EnglishQuiz from './pages/EnglishQuiz';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
	<Route path="/english" element={<EnglishQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
