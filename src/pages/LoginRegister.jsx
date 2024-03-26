import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

function LoginPage() {
  const [currentView, setCurrentView] = useState("login");

  const handleSwitchView = () => {
    setCurrentView(currentView === "login" ? "register" : "login");
  };

  const switchToLogin = () => {
    setCurrentView("login"); // Switch to login view
  };

  return (
    <div>
      <h1>{currentView === "login" ? "Login" : "Register"}</h1>
      {currentView === "login" ? (
        <Login />
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
      <button onClick={handleSwitchView}>
        {currentView === "login" ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
}
export default LoginPage;
