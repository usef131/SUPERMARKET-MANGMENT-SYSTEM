import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "@popperjs/core/dist/umd/popper.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css"
import App from './App.jsx'
import CartProvider from "./Context/ProductContext.jsx";
import {AuthProvider} from './Context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
)