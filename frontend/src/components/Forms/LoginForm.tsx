import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import React from "react";
import "../../styles/forms.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent form submission/reload
    navigate("/home");
  };

  return (
    <section className="login-form">
      <form className="form" name="login-form" onSubmit={handleSubmit}>
        <h1 className="form__header">Log in</h1>

        <input
          className="form__field"
          type="text"
          placeholder="Username"
          aria-label="Username"
          autoComplete="username"
        />

        <div className="form__password-container">
          <input
            className="form__field"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
          />
        </div>

        <button
          id="login-btn"
          className="form__submit-btn"
          type="submit"
        >
          Log in
        </button>

        <p className="form__error-status" role="alert"></p>
      </form>

      <p className="form__divider">
        <span>OR</span>
      </p>

      <div className="form__social-icons">
        <button 
          className="form__icon"
          type="button"
          aria-label="Log in with Facebook"
        >
          <FaFacebookF />
          FACEBOOK
        </button>

        <button 
          className="form__icon"
          type="button"
          aria-label="Log in with Google"
        >
          <FaGoogle />
          GOOGLE
        </button>
      </div>
      <p className="form__terms">
        By signing in to our application, you agree to our Terms and Privacy
        Policy.
      </p>
    </section>
  );
};

export default LoginForm;
