import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { sendDataToLogin } from "../../services/auth-services";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Context/AuthContext";

export default function Login() {
  const [isExistError, setIsExistError] = useState(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(values) {
    try {
      const response = await sendDataToLogin(values);


      if (response.success) {
        formik.values.email = "";
        formik.values.password = "";
        toast.success(` Welcome ${response.data.data.user.username}`);
        setToken(response?.data?.token);
        if (values.rememberMe) {
          localStorage.setItem("userToken", response?.data?.token);
        } else {
          sessionStorage.setItem("userToken", response?.data?.token);
        }
        setTimeout(() => {
          navigate("/dashboard" , {state:{ email:response.data.data.user.email }});
        }, 2000);
      }
  
    } catch (error) {
      console.log(error);
      setIsExistError(error.error?.response.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: handleLogin,
  });

  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-20">
      <div className="px-4">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Right Side - Welcome */}
          <div className="hidden lg:block relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 p-6 lg:p-8 xl:p-10 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                Discover <br /> Opportunities That Match Your Skills
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed ">
                Connecting creative professionals with <br /> freelance jobs,
                courses, and tools to elevate their careers.
              </p>
            </div>
          </div>

          {/* Left Side - Form */}
          <div className="p-4 lg:p-6 xl:p-8">
            {/* Logo & Header */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <img src={logo} alt="SkillMatch" className="w-8 h-8" />
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  SkillMatch
                </h1>
              </div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-1">
                Login to your account
              </h2>
              <p className="text-sm text-gray-600">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-2" onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm  font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute mt-4 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {isExistError && (
                    <p className="text-red-500 mt-2">* {isExistError}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm  font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className=" text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Sign In
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-3 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
              </span>
              <a
                href="/signup"
                className="text-sm ms-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
