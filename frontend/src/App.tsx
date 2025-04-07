import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import './App.css'

function App() {

  return (
    <Router >
      <Routes>
        <Route path="/" element={<SplashPage />} />
      </Routes>
    </Router>
  )
}

export default App
