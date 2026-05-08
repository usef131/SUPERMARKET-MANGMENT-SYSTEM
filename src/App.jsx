import Home from "./Home";
import ShowCart from "./Components/ShowCart";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Contact from "./Components/Contact";
import AddProduct from "./Components/AddProduct";
import DeleteProduct from "./Components/DeleteProduct";
import UpdateProductPage from "./Components/UpdateProductPage";
import UpdateProductLogic from "./Components/UpdateProductlogic";

import ManagerNavBar from "./MangerComponents/ManagerNavBar";
import CashierNavBar from "./CashierComponents/CashierNavBar";

import LoginPage from "./AuthPages/LoginPage";
import RegisterPage from "./AuthPages/RegisterPage";
import ManagerHomePage from "./MangerComponents/ManagerHomePage";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Authentication */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Manager */}
        <Route
          path="/ManagerHomePage"
          element={
            <>
              <ManagerNavBar />
              <ManagerHomePage />
            </>
          }
        />

        <Route
          path="/add-product"
          element={
            <>
              <ManagerNavBar />
              <AddProduct />
            </>
          }
        />

        <Route
          path="/delete-product"
          element={
            <>
              <ManagerNavBar />
              <DeleteProduct />
            </>
          }
        />

        <Route
          path="/update-product-page"
          element={
            <>
              <ManagerNavBar />
              <UpdateProductPage />
            </>
          }
        />

        <Route
          path="/update-product-logic/:id"
          element={
            <>
              <ManagerNavBar />
              <UpdateProductLogic />
            </>
          }
        />

        {/* Cashier */}
        <Route
          path="/CashierHomePage"
          element={
            <>
              <CashierNavBar />
              <Home />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <CashierNavBar />
              <ShowCart />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <CashierNavBar />
              <Contact />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;