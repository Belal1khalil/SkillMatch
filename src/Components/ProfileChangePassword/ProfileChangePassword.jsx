import { faArrowRight, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik';
import React from 'react'
import { updateMyPassword } from '../../services/profile-services';
import { toast } from 'react-toastify';
import * as yup from "yup"
export default function ProfileChangePassword() {
const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

 async function handleChangePassword(values) {
    try {
      const response = await updateMyPassword(values);
      if (response.success) {
        toast.success("Password updated successfully!");
        formikPassword.resetForm();
      }
      console.log(response);
    } catch (error) {
      toast.error(
        error.error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
      console.log(error);
    }
  }

 const validationSchemaPassword = yup.object({
    passwordCurrent: yup.string().required("Current password is required"),
    password: yup
      .string()
      .matches(passwordRegex)
      .required("New password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });



  const formikPassword = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: handleChangePassword,
  });







  return (
    <>
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20">
                    <FontAwesomeIcon icon={faLock} className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Security Settings
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mt-1 tracking-wide">
                      Protect your account access
                    </p>
                  </div>
                </div>
              </div>

              <form
                className="space-y-6 max-w-xl"
                onSubmit={formikPassword.handleSubmit}
              >
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Current Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-primary-500 transition-colors">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <input
                      type="password"
                      value={formikPassword.values.passwordCurrent}
                      name="passwordCurrent"
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 transition-all focus:border-primary-500 focus:bg-white outline-none font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-primary-500 transition-colors">
                        <FontAwesomeIcon icon={faShieldAlt} />
                      </div>
                      <input
                        type="password"
                        className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 transition-all focus:border-primary-500 focus:bg-white outline-none font-medium"
                        placeholder="••••••••"
                        name="password"
                        value={formikPassword.values.password}
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-primary-500 transition-colors">
                        <FontAwesomeIcon icon={faShieldAlt} />
                      </div>
                      <input
                        type="password"
                        className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 transition-all focus:border-primary-500 focus:bg-white outline-none font-medium"
                        placeholder="••••••••"
                        value={formikPassword.values.passwordConfirm}
                        name="passwordConfirm"
                        onChange={formikPassword.handleChange}
                        onBlur={formikPassword.handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-10 py-4.5 bg-gray-900 text-white font-bold rounded-2xl transition-all shadow-xl shadow-gray-900/10 hover:bg-black active:scale-95 flex items-center gap-3"
                  >
                    Update Password
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-sm opacity-70"
                    />
                  </button>
                </div>
              </form>
            </div>
    </>
  )
}
