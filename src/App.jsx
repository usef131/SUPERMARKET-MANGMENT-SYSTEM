import Navigation from "./Components/Navigation";
import Home from "./Home";
import ShowCart from "./Components/ShowCart";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Contact from "./Components/Contact";
import AddProduct from "./Components/AddProduct";
import DeleteProduct from "./Components/DeleteProduct";
import UpdateProductPage from "./Components/UpdateProductPage";
import UpdateProductLogic from "./Components/UpdateProductlogic";
import ManagerNavBar from "./MangerComponents/ManagerNavBar"
import ViewAllProducts from "./MangerComponents/ViewAllProducts";
import LoginPage from "./AuthPages/LoginPage";
import RegisterPage from "./AuthPages/RegisterPage";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>

        {/* Authentication Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Manager Routes */}
        <Route
          path="/*"
          element={
            <>
              <ManagerNavBar />

              <Routes>
                <Route path="/View-Product" element={<ViewAllProducts />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/delete-product" element={<DeleteProduct />} />
                <Route path="/update-product-page" element={<UpdateProductPage />} />
                <Route
                  path="/update-product-logic/:id"
                  element={<UpdateProductLogic />}
                />
              </Routes>
            </>
          }
        />
        {/* Cahsier routes */}
        <Route
          path="/*"
          element={
            <>
              <Navigation />

              <Routes>

                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<ShowCart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/delete-product" element={<DeleteProduct />} />
                <Route
                  path="/update-product-page"
                  element={<UpdateProductPage />}
                />
                <Route
                  path="/update-product-logic/:id"
                  element={<UpdateProductLogic />}
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;