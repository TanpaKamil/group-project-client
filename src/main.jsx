import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Login from "./pages/Login";
import Home from "./pages/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Authentication />}>

          <Route path="/" element={<Home />} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
