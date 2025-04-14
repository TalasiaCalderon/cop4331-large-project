import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardUI() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('User');

    useEffect(() => {
        const _ud = localStorage.getItem('user_data');

        if (_ud === null) {
            navigate('/'); // Redirect to login if no user data
        } else {
            try {
                const ud = JSON.parse(_ud);
                if (ud.firstName) {
                    setUsername(ud.firstName);
                }
            } catch (error) {
                console.error('Invalid user data in localStorage:', error);
                navigate('/'); // Redirect if JSON is broken
            }
        }
    }, [navigate]);

    function handleLogout(): void {
        localStorage.removeItem('user_data');
        navigate('/login');
    }

    function goToPuzzles(type: string): void {
        if (type === 'math') {
            navigate('/puzzles/math');
        } else if (type === 'english') {
            navigate('/puzzles/english');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome, <span className="text-blue-600">{username}</span>!
                </h1>
                <p className="mb-6 text-gray-600">Choose a puzzle category to begin:</p>

                <div className="flex flex-col gap-4 mb-6">
                    <button
                        onClick={() => goToPuzzles('math')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                    >
                        🧮 Math Puzzles
                    </button>
                    <button
                        onClick={() => goToPuzzles('english')}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                    >
                        📚 English Puzzles
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 underline hover:text-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardUI;
