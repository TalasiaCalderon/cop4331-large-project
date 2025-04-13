import { useCallback, useRef } from "react";
import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import Toggle from "../components/Toggle";
import "../styles/splash-page.css";

// Functional component for the splash page (login/signup screen)
const SplashPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Adds the 'active' class to the splash page container to show the Signup form
  const handleSignupClick = useCallback((): void => {
    containerRef.current?.classList.add("active");
  }, []);

  // Removes the 'active' class to show the Login form
  const handleLoginClick = useCallback((): void => {
    containerRef.current?.classList.remove("active");
  }, []);

  return (
    <main ref={containerRef} className="splash-page" role="main" aria-label="Authentication screen">

      {/* Form section containing both login and signup forms */}
      <section className="splash-page__forms" aria-labelledby="auth-forms">
        <LoginForm />
        <SignupForm />
      </section>

      {/* Toggle component to switch between login and signup views */}
      <Toggle
        onSignupClick={handleSignupClick}
        onLoginClick={handleLoginClick}
      />
    </main>
  );
};

export default SplashPage;
