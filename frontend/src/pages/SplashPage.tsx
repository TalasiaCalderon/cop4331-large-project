import { useCallback } from "react";
import React from "react";

import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import Toggle from "../components/Toggle";
import "../components/Forms/forms.css";

const SplashPage: React.FC = () => {
  const handleSignupClick = useCallback((): void => {
    const container = document.getElementById("splash-page");
    container?.classList.add("active");
  }, []);

  const handleLoginClick = useCallback((): void => {
    const container = document.getElementById("splash-page");
    container?.classList.remove("active");
  }, []);

  return (
    <div id="splash-page" className="splash-page">
      <div className="splash-page__forms">
        <LoginForm />
        <SignupForm />
      </div>
      <Toggle
        onSignupClick={handleSignupClick}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default SplashPage;
