// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./modules/home/pages/HomePage";
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from "./modules/auth/Register/Pages/RegisterPage";
import DashboardMenu from "./modules/Menu/Pages/DashboardMenu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<DashboardMenu />} />        
        </Routes>
    </>
  );
}

export default App;
