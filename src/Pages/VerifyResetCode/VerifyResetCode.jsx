import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyResetCode, forgetPassword } from "../../services/auth-services";
import useCountdown from "../../utils/useCountdown";

export default function VerifyResetCode() {
  const location = useLocation();
  const email = location?.state?.email;
  const { minutes, secs, seconds, reset } = useCountdown(60); // 5 minutes
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
        const response = await verifyResetCode({
          email,
          code: finalCode,
        });
        console.log(response);

        if (response.success) {
          toast.success(response?.data?.message);
          formik.values.code = ["", "", "", "", "", ""];
          setTimeout(() => {
            navigate("/resetPassword", {
              state: { email, resetCode: finalCode },
            });
          }, 2000);
        }
      } catch (error) {
        toast.error("Invalid or Expired date");
        formik.values.code = ["", "", "", "", "", ""];
      }
    },
  });

  async function handleResend() {
    if (seconds !== 0) return;
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }
    try {
      const response = await forgetPassword({
        email,
      });
      console.log(response);
      toast.success(response?.data?.message || "Recovery code resent 📩");
      reset();
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Failed to resend code";
      toast.error(msg);
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6 ">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <h1 className="text-4xl font-extrabold leading-tight">
            Verify Reset Code
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-sm">
            We have sent a 6-digit recovery code to your email.
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
                <h2 className="text-2xl font-bold">Verify Code</h2>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Enter the 6-digit code sent to
            </p>
            <p className="font-medium text-gray-800 mb-6">
              {email || "your email"}
            </p>

            {/* Code Inputs */}
            <div className="flex justify-between gap-3 mb-6">
              {formik.values.code.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  maxLength={1}
                  type="text"
                  className="w-full  max-w-[48px] h-12 border-2 shadow-sm  text-center rounded-lg border-gray-300 text-lg font-semibold focus:outline-none focus:border-primary-500 transition-colors duration-75 "
                  onChange={(e) => {
                    const newCode = [...formik.values.code];
                    newCode[index] = e.target.value.replace(/\D/, "");
                    formik.setFieldValue("code", newCode);
                    if (e.target.value && e.target.nextElementSibling) {
                      e.target.nextElementSibling.focus();
                    }
                  }}
                />
              ))}
            </div>

            {/* Actions (Timer) */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Didn’t receive the code?
                <button
                  type="button"
                  className="ms-2 font-semibold text-blue-600 underline hover:text-blue-700 disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                  disabled={seconds > 0}
                  onClick={() => {
                    handleResend();
                    reset();
                  }} // Implement resend logic if needed
                >
                  Resend
                </button>
              </p>

              <span className="text-xs text-gray-400 font-mono">
                {minutes}:{secs}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition-colors"
            >
              Verify & Continue
            </button>

            <div className="text-center text-sm text-gray-500 mt-6">
              <a href="/login" className="underline hover:text-blue-600">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
