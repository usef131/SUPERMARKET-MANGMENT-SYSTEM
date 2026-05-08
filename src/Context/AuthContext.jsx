import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useManagers } from "../Hooks/useManagers";
import Swal from "sweetalert2";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const url = "http://localhost:3000/Users";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { data = [] } = useManagers(url);

  const [currentUser, setCurrentUser] = useState(null);

  // ================= CHECK USER =================
  const CheckUser = (Email, Password, role) => {
    const managerExist = data.find(
      (manager) =>
        manager.email === Email &&
        manager.password === Password &&
        manager.role === role && role === "manager"
    );

    const cashierExist = data.find(
      (cashier) =>
        cashier.email === Email &&
        cashier.password === Password &&
        cashier.role === role && role === "cashier"
    );

    if (managerExist || cashierExist) {
      // Save current logged user
      setCurrentUser(managerExist || cashierExist);

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(managerExist || cashierExist));

      if(managerExist) {
        // Navigate to Home
        navigate("/ManagerHomePage");
      } else {
        navigate("/CashierHomePage");
      }

      return true;
    } else {
      alert("Invalid Email or Password or Role");

      return false;
    }
  };


  // ================= LOGOUT =================
  const Logout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      setCurrentUser(null);
      localStorage.removeItem("user");
      navigate("/");
    }
  });
};

  const values = {
    CheckUser,
    Logout,
    currentUser
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};