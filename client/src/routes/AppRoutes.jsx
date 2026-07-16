import { Routes, Route } from "react-router-dom";

//import Home from "../pages/Home/Home";
import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
//import Register from "../pages/Register/Register";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound/Notfound";
import Chat from "../pages/chat/Chat";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/chat/:repositoryId" element={<Chat />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
