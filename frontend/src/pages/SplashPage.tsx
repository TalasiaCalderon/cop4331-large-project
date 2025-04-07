import { useCallback } from "react";
import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import Toggle from "../components/Toggle";
import "../styles/splash-page.css";

// Functional component for the splash page (login/signup screen)
const SplashPage: React.FC = () => {

  // Adds the 'active' class to the splash page container to show the Signup form
  const handleSignupClick = useCallback((): void => {
    const container = document.getElementById("splash-page");
    container?.classList.add("active");
  }, []);

  // Removes the 'active' class to show the Login form
  const handleLoginClick = useCallback((): void => {
    const container = document.getElementById("splash-page");
    container?.classList.remove("active");
  }, []);

  return (
    <div id="splash-page" className="splash-page">

      {/* Form section containing both login and signup forms */}
      <div className="splash-page__forms">
        <LoginForm />
        <SignupForm />
      </div>

      {/* Toggle component to switch between login and signup views */}
      <Toggle
        onSignupClick={handleSignupClick}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default SplashPage;
