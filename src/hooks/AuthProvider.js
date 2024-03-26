import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", password: "", token: "" });
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(user);
  //     console.log(token);
  //   }, [user, token]);

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res) {
        setUser({
          id: res.user.id,
          email: res.user.email,
          password: res.user.password,
          role: res.user.role,
        });

        setToken({ token: res.token });

        localStorage.setItem("site", res.token);
        switch (res.user.role) {
          case "user":
            navigate("/userdash");
            break;
          case "techsupport":
            navigate("/techsupportdash");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            break;
        }

        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res) {
        console.log(res);
        return;
      }
      throw new Error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, registerAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
