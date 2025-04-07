import React from 'react';

interface ToggleProps {
    onSignupClick: () => void;
    onLoginClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ onSignupClick, onLoginClick }) => {
    return (
        <div className="toggle-container">
            <div className="toggle">
            <div className="toggle__left">
                <h1>Welcome back!</h1>
                <p>Add tagline here</p>
                <button className="hidden" id="login" onClick={onLoginClick}>
                Login
                </button>
            </div>

            <div className="toggle__right">
                <h1>Welcome!</h1>
                <p>Add tagline here</p>
                <button className="hidden" id="signup" onClick={onSignupClick}>
                Sign Up
                </button>
            </div>
            </div>
        </div>
    );
};

export default Toggle;
