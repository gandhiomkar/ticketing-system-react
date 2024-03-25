import React from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
