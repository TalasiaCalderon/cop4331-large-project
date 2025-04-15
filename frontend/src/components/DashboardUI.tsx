import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function DashboardUI() {
    const navigate = useNavigate();

    let username: string = 'Default User';
    const _ud = localStorage.getItem('user_data');
    if (_ud) {
        try {
            const ud = JSON.parse(_ud);
            username = ud.firstName;
        } catch (err) {
            console.error('Invalid user_data in localStorage.');
        }
    }

    function handleLogout(): void {
        localStorage.removeItem('user_data');
        navigate('/');
    }

    function goToPuzzles(type: string): void {
        if (type === 'math') {
            navigate('/math');
        } else if (type === 'english') {
            navigate('/english');
        }
    }

    return (
        <div className="dashboard-wrapper">
            <button className="logout-button-top" onClick={handleLogout}>
                Logout
            </button>

            <div className="dashboard-header">
                <h1 className="dashboard-main-title">Train Rot</h1>
                <p className="dashboard-subtitle">
                    Undo years of brain rot with middle-school-level games!
                </p>
            </div>

            <div className="dashboard-card-container">
                <div className="dashboard-box">
                    <h2 className="dashboard-title">🧮 Math</h2>
                    <p className="dashboard-score">Score: None</p>
                    <button className="math-button" onClick={() => goToPuzzles('math')}>
                        Start Math Game
                    </button>
                </div>

                <div className="dashboard-box">
                    <h2 className="dashboard-title">📚 English</h2>
                    <p className="dashboard-score">Score: None</p>
                    <button className="english-button" onClick={() => goToPuzzles('english')}>
                        Start English Game
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardUI;
