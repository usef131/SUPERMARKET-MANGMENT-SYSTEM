import Navigation from "./Components/Navigation"
import Home from "./Home"
import ShowCart from "./Components/ShowCart"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Contact from "./Components/Contact";
import AddProduct from "./Components/AddProduct";
import DeleteProduct from "./Components/DeleteProduct";
function App() {

  return (
    <>
      <ToastContainer />

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShowCart />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
        </Routes>
   
    </>
  )
}

export default App
