import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import React from "react";
import "../../styles/forms.css";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission/reload
    navigate("/home");
  };

  return (
    <section className="signup-form">
      <form className="form">
        <h1 className="form__header">Sign up</h1>

        <div style={{ display: "flex", gap: 20 }}>
          <input className="form__field" type="text" placeholder="Name" />
          <input className="form__field" type="text" placeholder="Username" />
        </div>

        <input className="form__field" type="email" placeholder="Email" />

        <div className="form__password-container">
          <input
            className="form__field"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          id="submit-btn"
          className="form__submit-btn"
          onClick={handleClick}
        >
          Sign up
        </button>
        <p className="form__error-status"></p>
      </form>

      <p className="form__divider">
        <span>OR</span>
      </p>

      <div className="form__social-icons">
        <button className="form__icon">
          <FaFacebookF />
          FACEBOOK
        </button>

        <button className="form__icon">
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
