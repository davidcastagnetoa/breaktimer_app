import React from "react";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./syntax-highlighting.css";

import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import NotFoundPage from "./components/NotFoundPage";

// Authentification OAuth Client Side
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { MicrosoftAuthRedirect } from "./components/MicrosoftAuthRedirect";

// Google Provider Data
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// console.debug("clientID for GoogleOAuthProvider is: " + clientId);

function App() {
  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    // </GoogleOAuthProvider>
  );
}

export default App;
