import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import React from "react";
import "../../styles/forms.css";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission/reload
    navigate("/dashboard");
  };

  return (
    <section className="signup-form">
      <form className="form" name="signup-form" onSubmit={handleSubmit}>
        <h1 className="form__header">Sign up</h1>

        <div style={{ display: "flex", gap: 20 }}>
          <input 
            className="form__field" 
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username" 
          />
        </div>

        <input
          className="form__field form__password-container"
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password"
        />

<input
          className="form__field form__password-container"
          type="password"
          name="password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
        />

        <button
          id="submit-btn"
          className="form__submit-btn"
          type="submit"
        >
          Sign up
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
          aria-label="Sign up with Facebook"
        >
          <FaFacebookF />
          FACEBOOK
        </button>

        <button 
          className="form__icon"
          type="button"
          aria-label="Sign up with Google"
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

export default SignupForm;
