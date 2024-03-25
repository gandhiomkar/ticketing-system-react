import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
        <p>
          Welcome to my simple React home page! This is a basic example of a
          React project.
        </p>
        <img src="https://via.placeholder.com/300" alt="Placeholder" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/userdash">userdash</Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
