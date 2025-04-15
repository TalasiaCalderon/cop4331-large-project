import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import "../../styles/forms.css";

type Props = {
  onSwitchToLogin: () => void;
};

const SignupForm: React.FC<Props> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: username, // assuming _id is same as username
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError("Username already exists or server error.");
      } else {
        setError("");
        onSwitchToLogin(); // Go back to login screen after successful signup
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Network error or server unreachable.");
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <input
          className="form__field form__password-container"
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="form__field form__password-container"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button id="submit-btn" className="form__submit-btn" type="submit">
          Sign up
        </button>

        {error && <p className="form__error-status" role="alert">{error}</p>}
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
