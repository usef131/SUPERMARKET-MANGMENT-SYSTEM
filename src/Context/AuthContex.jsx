import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useManagers } from "../Hooks/useManagers";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const url = "http://localhost:3000/Users";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { data = [] } = useManagers(url);

  const [currentUser, setCurrentUser] = useState(null);

  // ================= CHECK MANAGER =================
  const CheckManager = (Email, Password, role) => {
    const exist = data.find(
      (user) =>
        user.email === Email &&
        user.password === Password &&
        user.role === role
    );

    if (exist) {
      // Save current logged user
      setCurrentUser(exist);

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(exist));

      // Navigate to Home
      navigate("/ManagerHomePage");

      return true;
    } else {
      alert("Invalid Email or Password or Role");

      return false;
    }
  };

  // ================= LOGOUT =================
  const Logout = () => {
    setCurrentUser(null);

    localStorage.removeItem("user");

    navigate("/");
  };

  const values = {
    CheckManager,
    Logout,
    currentUser
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};