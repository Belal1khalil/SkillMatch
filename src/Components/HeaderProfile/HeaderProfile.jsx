import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function HeaderProfile() {
  return (
    <>
      <div className="relative h-64 lg:h-80 bg-gradient-to-r from-primary-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative h-full flex items-end pb-0">
          <button className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faCamera} />
            Edit Cover
          </button>
        </div>
      </div>
    </>
  );
}
