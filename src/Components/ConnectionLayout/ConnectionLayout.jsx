import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faClock,
  faUserTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function ConnectionLayout() {
  const navigationItems = [
    {
      to: "/connections/all",
      label: "My Connections",
      icon: faUserFriends,
      end: true,
    },
    {
      to: "/connections/pending",
      label: "Pending Requests",
      icon: faClock,
    },
    {
      to: "/connections/rejected",
      label: "Rejected Requests",
      icon: faUserTimes,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 overflow-x-hidden">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 pt-20 pb-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header Content */}
        <div className="container relative z-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white border border-white/20 shadow-xl">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                Connections
              </h1>
              <p className="text-white/80 font-medium mt-1">
                Manage your professional network
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container -mt-20 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-6 ml-1">
                  Navigation
                </h3>
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `group flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-500/25"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600"
                            }`}
                          >
                            <FontAwesomeIcon icon={item.icon} className="text-sm" />
                          </div>
                          <span className="flex-1">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Right Side - Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
