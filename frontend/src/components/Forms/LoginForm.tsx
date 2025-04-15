import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import React, { FormEvent, useState } from "react";
import "../../styles/forms.css";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: string | number;
  error: string;
};



const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    const loginData: LoginRequest = { username, password };
  
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data: LoginResponse = await res.json();
      console.log("Server response:", data);
  
      console.log(data.id);
      if (data.id && typeof data.id === "string" && isNaN(Number(data.id))) {
        const user = {
          id: data.id,
        };
  
        localStorage.setItem("user_data", JSON.stringify(user));
        setErrorMessage("");
        
        navigate("/dashboard");
      } else {
        setErrorMessage("Username or password is incorrect.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
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
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="form__password-container">
          <input
            className="form__field"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          id="login-btn"
          className="form__submit-btn"
          type="submit"
        >
          Log in
        </button>

        <p className="form__error-status" role="alert"> {errorMessage} </p>
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
