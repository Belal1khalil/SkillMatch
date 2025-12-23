import { useLocation, useNavigate } from "react-router-dom";
import { ResendCode, verifyCode } from "../../services/auth-services";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useCountdown from "../../utils/useCountdown";

export default function VerifyCode() {
  const location = useLocation();
  const email = location.state?.email;
  const { minutes, secs, seconds, reset } = useCountdown(300); // 5 minutes
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email,
      code: ["", "", "", "", "", ""],
    },
    onSubmit: async (values) => {
      const finalCode = values.code.join("");

      if (finalCode.length < 6) {
        toast.error("Please enter full 6-digit code");
        return;
      }

      try {
        const response = await verifyCode({
          email: values.email,
          code: finalCode,
        });
        if (response.success) {
          toast.success("Email verified successfully ");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        toast.error("Invalid or expired code ");
      }
    },
  });

  async function handleResend() {
    if (seconds !== 0) return;
    try {
      const reponse = await ResendCode({
        email,
      });
      console.log(reponse);
      reset();
    } catch (error) {
      toast.error(error);
    }

    // toast.success("Verification code resent 📩");
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel (Same Design) */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <h1 className="text-4xl font-extrabold leading-tight">
            Verify Your Email
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-sm">
            We have sent a 6-digit verification code to your Gmail.
          </p>
        </div>

        {/* Right Content */}
        <div className="p-8 md:p-12">
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <p className="text-sm text-gray-500">SkillMatch</p>
                <h2 className="text-2xl font-bold">Verify Code</h2>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Enter the 6-digit code sent to
            </p>
            <p className="font-medium text-gray-800 mb-6">{email}</p>

            {/* Code Inputs (Same Design) */}
            <div className="flex justify-between gap-3 mb-6">
              {formik.values.code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newCode = [...formik.values.code];
                    newCode[index] = e.target.value.replace(/\D/, "");
                    formik.setFieldValue("code", newCode);
                    if (e.target.value && e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus();
                    }
                  }}
                  className="w-full max-w-[48px] h-12 text-center text-xl rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>

            {/* Actions (Timer + Resend) */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Didn’t receive the code?
                <span
                  onClick={handleResend}
                  className={`ms-2 font-semibold underline ${
                    seconds === 0
                      ? "text-blue-600 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Resend
                </span>
              </p>

              <span className="text-xs text-gray-400">
                {minutes}:{secs}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow"
            >
              Verify & Continue
            </button>

            <div className="text-center text-sm text-gray-500 mt-6">
              <a href="#" className="underline">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
