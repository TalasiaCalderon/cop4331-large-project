import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import DashboardPage from './pages/DashboardPage';
import EnglishQuiz from './pages/EnglishQuiz';
import MathQuiz from './pages/MathQuiz';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
	<Route path="/english" element={<EnglishQuiz />} />
        <Route path="/math" element={<MathQuiz />} />
	</Routes>
    </Router>
  );
}

export default App;
