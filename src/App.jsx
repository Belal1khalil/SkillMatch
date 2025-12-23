import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/SignUP/Signup";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AuthProvider from "./Components/Context/AuthContext";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Discover from "./Pages/Discover/Discover";
import RecommenedJobs from "./Pages/RecommendedJobs/RecommenedJobs";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "forgot-password", element: <ForgetPassword /> },
        { path: "verifyResetCode", element: <VerifyResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "profile", element:
          <ProtectedRoute>
             <Profile />
          </ProtectedRoute>
          
          },
        { path: "discover", element: <Discover /> },
        { path: "recommended", element: <ProtectedRoute>
           <RecommenedJobs />
        </ProtectedRoute> },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />

        <ToastContainer
          position="top-right"
          closeButton={false}
          autoClose={3000}
          closeOnClick={true}
        />
      </AuthProvider>
    </>
  );
}
