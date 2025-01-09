import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { CoordinateProvider } from "./contexts/CoordinateContext";
import { UserProvider } from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CoordinateProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Authentication />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </CoordinateProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);