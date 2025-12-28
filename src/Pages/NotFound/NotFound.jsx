import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowLeft,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60rem] h-[60rem] bg-primary-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60rem] h-[60rem] bg-indigo-100/50 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        {/* Animated 404 Typography */}
        <div className="relative mb-12">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 leading-none select-none animate-in zoom-in duration-1000">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center -rotate-12 translate-y-8 pointer-events-none opacity-20">
            <FontAwesomeIcon
              icon={faCompass}
              className="text-[15rem] text-primary-900 animate-spin-slow"
            />
          </div>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Lost in the Network?
          </h2>
          <p className="text-xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            The page you're looking for has drifted off into another orbit.
            Let's get you back to the main connection hub.
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/dashboard"
              className="group px-10 py-5 bg-primary-600 text-white font-bold rounded-[2rem] hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/30 active:scale-95 flex items-center gap-3"
            >
              <FontAwesomeIcon
                icon={faHome}
                className="text-lg group-hover:-translate-y-0.5 transition-transform"
              />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom Decorative Label */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-gray-200"></div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
            SkillMatch Hub
          </p>
          <div className="w-12 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
