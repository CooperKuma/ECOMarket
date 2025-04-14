// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./modules/home/pages/HomePage";
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from "./modules/auth/pages/RegisterPage";
import Dashboard from "./modules/dashboard/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
    </>
  );
}

export default App;
