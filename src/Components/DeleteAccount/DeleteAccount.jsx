import {
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteProfile } from "../../services/profile-services";

export default function DeleteAccount() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  async function handleDeleteAccount() {
    try {
      const response = await DeleteProfile();
      if (response.success) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  }
  return (
    <>
      <div className="bg-rose-50/30 rounded-[2.5rem] p-10 border border-rose-100/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-sm"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Danger Zone</h3>
              <p className="text-rose-400 text-xs font-medium mt-1 tracking-wide">
                Permanent account actions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-gray-900 font-bold">Delete Account</h4>
            <p className="text-gray-500 text-sm">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-8 py-3.5 bg-rose-100 text-rose-600 font-bold rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faTrash} className="text-xs" />
            Delete My Account
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            onClick={() => setShowDeleteModal(false)}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity"
          ></div>

          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl z-10 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faTrash} className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Are you absolutely sure?
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                This action cannot be undone. All your profile data,
                applications, and saved content will be permanently removed.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
