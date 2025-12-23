import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faUserTie,
  faBriefcase,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { sendDataToSignup } from "../../services/auth-services";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [accountType, setAccountType] = useState("user");
  const [isExistError, setisExistError] = useState(null);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  async function handleSignup(values) {
    try {
      const response = await sendDataToSignup(values);
      console.log(response)
      if (response.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/verifycode", {state:{email: formik.values.email}});
        }, 2000);
      }
      console.log(response);
    } catch (error) {
      toast.error("Username and Email already Exist");
    }
  }

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 char ")
      .max(15, "Username must be at most 15 char"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    passwordConfirm: yup
      .string()
      .required("Confirm Password is required")
      .oneOf(
        [yup.ref("password")],
        "Password and ConfrimPassword should be the same"
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      skills: ["Node.js", "MongoDB", "React.js", "Next.js", "MERN_stack"],
    },
    validationSchema,
    onSubmit: handleSignup,
  });
 

  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-4">
      <div className="px-4">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                Create an account
              </h2>
              <p className="text-xs text-gray-600">
                Start your journey with us today.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-2" onSubmit={formik.handleSubmit}>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute mt-3 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    placeholder="johndoe"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <p className="text-red-500">* {formik.errors.username}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute mt-5 left-0 pl-4 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500">* {formik.errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute mt-5 left-0 pl-4 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500">* {formik.errors.password}</p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute mt-5 left-0 pl-4 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm && (
                      <p className="text-red-500">
                        * {formik.errors.passwordConfirm}
                      </p>
                    )}
                </div>
              </div>

              {/* Account Type */}
              {/* <div className="pt-1">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">
                  Account Type
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType("user")}
                    className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                      accountType === "user"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          accountType === "user"
                            ? "bg-gradient-to-br from-primary-500 to-primary-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className={`text-xl ${
                            accountType === "user"
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-semibold ${
                          accountType === "user"
                            ? "text-primary-600"
                            : "text-gray-700"
                        }`}
                      >
                        User
                      </span>
                      <p className="text-xs text-gray-500 text-center">
                        Apply to opportunities
                      </p>
                    </div>
                    {accountType === "user" && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-white text-xs"
                        />
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("manager")}
                    className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
                      accountType === "manager"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          accountType === "manager"
                            ? "bg-gradient-to-br from-primary-500 to-primary-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className={`text-xl ${
                            accountType === "manager"
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-semibold ${
                          accountType === "manager"
                            ? "text-primary-600"
                            : "text-gray-700"
                        }`}
                      >
                        Manager
                      </span>
                      <p className="text-xs text-gray-500 text-center">
                        Post opportunities & hire
                      </p>
                    </div>
                    {accountType === "manager" && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-white text-xs"
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div> */}

              <button
                type="submit"
                className="w-full group px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Create Account
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <a
                href="/login"
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Login
              </a>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="hidden lg:block relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 p-6 lg:p-8 xl:p-10 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                Join the SkillMatch Community
              </h1>
              <p className="text-sm text-white/90 mb-4 leading-relaxed">
                Create your profile, showcase your skills, and find the perfect
                opportunities to grow your career.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
