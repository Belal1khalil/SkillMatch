import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/imgs/logo.png";
import { faBell, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBriefcase,
  faRing,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { getProfileData } from "../../services/profile-services";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("discover");
  const [isMenuopen, setIsMenuOpen] = useState(false);
  const { token, Logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("Guest");
  

  

  function toggleMenu() {
    setIsMenuOpen(!isMenuopen);
  }

  const navItems = [
    { id: "discover", icon: faUsers, label: "Discover", href: "/discover" },
    { id: "recommendjobs", icon: faBriefcase, label: "RecommendJobs", href: "/recommended" },
    { id: "jobs", icon: faBriefcase, label: "Jobs", href: "/Jobs" },
    { id: "saved", icon: faHeart, label: "Saved", href: "/saved" },
    {
      id: "notifications",
      icon: faBell,
      label: "Notifications",
      href: "/notifications",
    },
  ];
  useEffect( () => {
    getProfileData()
      .then((res) => {
    
        const theUser = res.data?.data?.user
        setUser(theUser);
        setEmail(theUser.email)
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
      });
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="container py-4 flex justify-between items-center gap-8">
          {/* Logo Section with Gradient */}
          <div className="logo flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img
                src={logo}
                alt="SkillMatch Logo"
                className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <a href="/" className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary-500 group-hover:to-primary-600">
                SkillMatch
              </h1>
            </a>
          </div>

          {/* Enhanced Search Bar */}
          {token && (
            <div className="hidden lg:block search flex-1 max-w-xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-4 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300"
                  />
                  <input
                    type="search"
                    placeholder="Search opportunities, skills, people..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-primary-400 focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links with Tooltips */}
          {token && (
            <div className="hidden lg:block links">
              <ul className="flex items-center gap-2">
                {navItems.map((item) => (
                  <li key={item.id} className="relative group">
                    <Link
                      to={`${item.href}`}
                      onClick={() => setActiveLink(item.id)}
                      className={`
                      relative flex items-center justify-center w-12 h-12 rounded-xl
                      transition-all duration-300 ease-out
                      ${
                        activeLink === item.id
                          ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                          : "bg-gray-100/80 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md"
                      }
                    `}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`text-lg transition-transform duration-300 ${
                          activeLink === item.id
                            ? "scale-110"
                            : "group-hover:scale-110"
                        }`}
                      />
                      {/* Active Indicator */}
                      {activeLink === item.id && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                      )}
                    </Link>

                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none">
                      {item.label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
          )}

          {/* Profile Avatar with Dropdown - Visible on all screens */}
          {token && (
            <div className="relative group ml-auto lg:ml-2">
              <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-200 z-50">
                {/* Arrow */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

                {/* Menu Card */}
                <div className="relative backdrop-blur-xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-gradient-to-br from-primary-50 to-primary-100/50 border-b border-gray-200">
                    <p className="text-sm text-gray-600 truncate">{email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">Your Profile</span>
                    </Link>

                    <a
                      href="/applications"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">
                        My Applications
                      </span>
                    </a>

                    <a
                      href="/personalized"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">
                        Personalized Opportunities
                      </span>
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-2"></div>

                  {/* Sign Out */}
                  <div className="py-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        Logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium text-sm">Sign out</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Login & Signup Buttons */}
          {!token && (
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/login"
                className="px-6 py-2.5 rounded-xl text-primary-600 font-medium hover:bg-primary-50 transition-all duration-300"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </a>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100/80 hover:bg-primary-50 text-primary-600 transition-all duration-300 hover:shadow-md"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    isMenuopen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    isMenuopen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    isMenuopen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuopen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container pb-4">
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-xl border border-gray-200/50 p-6 space-y-6">
              {/* Mobile Search */}
              {token && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-4 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300"
                    />
                    <input
                      type="search"
                      placeholder="Search opportunities..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-primary-400 focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              {token && (
                <nav>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`${item.href}`}
                          // href={item.href}
                          onClick={() => {
                            setActiveLink(item.id);
                            setIsMenuOpen(false);
                          }}
                          className={`
                          flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                          ${
                            activeLink === item.id
                              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                              : "bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          }
                        `}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            className={`text-lg ${
                              activeLink === item.id
                                ? "text-white"
                                : "text-primary-500"
                            }`}
                          />
                          <span className="font-medium">{item.label}</span>
                          {activeLink === item.id && (
                            <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              {/* Profile Section */}
              {token && (
                <Link
                onClick={toggleMenu}
                  to="/profile"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">My Profile</p>
                    <p className="text-xs text-white/80">
                      View and edit profile
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              {/* Login & Signup Buttons */}
              {!token && (
                <div className="space-y-3">
                  <a
                    href="/login"
                    className="w-full flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary-500 text-primary-600 font-semibold hover:bg-primary-50 transition-all duration-300"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="w-full flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
