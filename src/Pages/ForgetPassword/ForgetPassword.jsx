import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { forgetPassword } from "../../services/auth-services";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
export default function ForgetPassword() {
  const [isExistError, SetIsExistError] = useState(null);
  const navigate = useNavigate();

  async function handleForgetPassword(values) {
    try {
      const response = await forgetPassword(values);
      if (response.success) {
        toast.success(" Recovery code sent to your email");
        setTimeout(() => {
          navigate("/verifyResetCode", {
            state: { email: formik.values.email },
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      SetIsExistError(error);
    }
  }
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid Email Format"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  });

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6 ">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <h1 className="text-4xl font-extrabold leading-tight">
            Forgot Your Password?
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-sm">
            Don't worry! It happens. Please enter the email address associated
            with your account.
          </p>
        </div>

        {/* Right Content */}
        <div className="p-8 md:p-12">
          <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <p className="text-sm text-gray-500">SkillMatch</p>
                <h2 className="text-2xl font-bold">Reset Password</h2>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Enter your email to receive a reset link.
            </p>

            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute mt-3.5 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 mt-2">* {formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition-colors"
            >
              Send Reset code
            </button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-6">
              <Link
                to="/login"
                className="underline hover:text-blue-600 transition-colors"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
