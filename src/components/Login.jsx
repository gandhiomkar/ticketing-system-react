import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      auth.loginAction(formData);
      //console.log("Form data submitted:", formData);
      return;
    }
    alert("pleae provide a valid input");
    // Add your login logic here, such as sending a request to your server

    // You can use Axios or the Fetch API to send the data to your server for authentication
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label for="role">Choose a role:</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="techsupport">Tech Support</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
