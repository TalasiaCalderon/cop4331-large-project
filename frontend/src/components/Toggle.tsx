import React from "react";
import "../styles/toggle.css";

interface ToggleProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ onSignupClick, onLoginClick }) => {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle__left">
          <h1>Returning?</h1>
          <p>Login and pick up where you left off</p>
          <button
            className="toggle__btn hidden"
            id="login"
            type="button"
            aria-label="Log in"
            onClick={onLoginClick}
          >
            Login
          </button>
        </div>

        <div className="toggle__right">
          <h1>New Here?</h1>
          <p>Register and start a new adventure</p>
          <button
            className="toggle__btn hidden"
            id="signup"
            type="button"
            aria-label="Sign up"
            onClick={onSignupClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
