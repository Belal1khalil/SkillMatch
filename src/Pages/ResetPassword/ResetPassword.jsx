import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowRight,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../../services/auth-services";
import logo from "../../assets/imgs/logo.png";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const resetCode = location?.state?.resetCode;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required("New Password is required")
      .matches(
        passwordRegex,
        "Password must be at least 8 characters, include one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: email || "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!email) {
        toast.error("Email is missing. Please restart the process.");
        return;
      }

      try {
        const response = await resetPassword({
          email: values.email,
          newPassword: values.newPassword,
          code: resetCode,
          passwordConfirm: values.confirmPassword,
        });
        console.log(response);
        if (response.success) {
          toast.success("Password reset successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(response?.data?.message || "Failed to reset password");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-12 px-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="SkillMatch" className="w-10 h-10" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                SkillMatch
              </h1>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 text-sm">
              Please enter your new password to secure your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                title="New Password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none focus:ring-4 focus:ring-primary-500/10 ${
                    formik.touched.newPassword && formik.errors.newPassword
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-100 bg-gray-50/50 focus:border-primary-500 focus:bg-white"
                  }`}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="mt-2 text-xs text-red-500 font-medium">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                title="Confirm Password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none focus:ring-4 focus:ring-primary-500/10 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-100 bg-gray-50/50 focus:border-primary-500 focus:bg-white"
                  }`}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500 font-medium">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <span>
                {formik.isSubmitting ? "Updating..." : "Update Password"}
              </span>
              {!formik.isSubmitting && (
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                />
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/login"
              className="text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors border-b border-transparent hover:border-primary-600"
            >
              Back to Sign In
            </a>
          </div>
        </div>

        {/* Right Side - Visual Panel */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 p-12 items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 shadow-inner">
              <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
            </div>
            <h3 className="text-4xl font-bold mb-6 leading-tight">
              Secure Your <br />
              Account
            </h3>
            <p className="text-primary-50 text-lg leading-relaxed mb-8 opacity-90">
              We take security seriously. Create a strong password to protect
              your professional profile and data.
            </p>
            <ul className="space-y-4">
              {[
                "Use 8 or more characters",
                "Include uppercase letters",
                "Add numbers and symbols",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
