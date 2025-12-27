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
import { getAllnotifications } from "../../services/notificitions-services";
import { faClock, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("discover");
  const [isMenuopen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { token, Logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("Guest");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifLoading, setIsNotifLoading] = useState(false);
  

  

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
  useEffect(() => {
    getProfileData()
      .then((res) => {
        const theUser = res.data?.data?.user;
        setUser(theUser);
        setEmail(theUser.email);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
      });

    let intervalId;
    if (token) {
      // Initial fetch
      fetchNotifications();

      // Start polling every 30 seconds
      intervalId = setInterval(() => {
        fetchNotifications();
      }, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [token]);

  const fetchNotifications = async () => {
    try {
      // Only show spinner on initial load to avoid flickering during polling
      if (notifications.length === 0) setIsNotifLoading(true);
      
      const res = await getAllnotifications();
      if (res.status === "success" || res.success) {
        const newNotifs = res.data.notifications || [];
        setNotifications(newNotifs);
        
        // Calculate unread count
        const unread = newNotifs.filter(n => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Notifications fetch error:", error);
    } finally {
      setIsNotifLoading(false);
    }
  };

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
            <a href="/dashboard" className="relative">
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
                      {/* Unread Badge for Notifications */}
                      {item.id === "notifications" && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                      {/* Active Indicator */}
                      {activeLink === item.id && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                      )}
                    </Link>

                    {/* Notification Dropdown */}
                    {item.id === "notifications" && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 z-50">
                        {/* Arrow */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45"></div>
                        
                        {/* Content Card */}
                        <div className="relative backdrop-blur-xl bg-white/95 border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">Mark all as read</button>
                          </div>

                          <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            {isNotifLoading ? (
                              <div className="p-10 flex flex-col items-center justify-center gap-3">
                                <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                <p className="text-xs text-gray-400">Loading notifications...</p>
                              </div>
                            ) : notifications.length > 0 ? (
                              <div className="divide-y divide-gray-50">
                                {notifications.map((notif) => (
                                  <Link
                                    key={notif._id}
                                    to={notif.link || "/notifications"}
                                    className={`flex gap-4 px-5 py-4 hover:bg-primary-50/50 transition-colors ${!notif.read ? 'bg-primary-50/20' : ''}`}
                                  >
                                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${!notif.read ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                                      <FontAwesomeIcon icon={faBell} className="text-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-sm leading-tight mb-1 ${!notif.read ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`}>
                                        {notif.heading || "Notification"}
                                      </p>
                                      <p className="text-xs text-gray-500 line-clamp-2 mb-1.5">{notif.text}</p>
                                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                        <FontAwesomeIcon icon={faClock} className="text-[8px]" />
                                        <span>{notif.createdAt ? formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true }) : "recently"}</span>
                                        {!notif.read && <span className="w-1.5 h-1.5 bg-primary-500 rounded-full ml-auto"></span>}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="p-10 text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                                  <FontAwesomeIcon icon={faBell} className="text-xl" />
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">No notifications yet</p>
                                <p className="text-xs text-gray-500">When you get notifications, they'll show up here.</p>
                              </div>
                            )}
                          </div>

                          <Link
                            to="/notifications"
                            className="block py-3.5 text-center text-sm font-bold text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 border-t border-gray-100"
                          >
                            View All Notifications
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Tooltip (Only for non-notification items) */}
                    {item.id !== "notifications" && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none">
                        {item.label}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </li>
                ))}

              </ul>
            </div>
          )}

          {/* Profile Avatar with Dropdown - Visible on all screens */}
          {token && (
            <div className="relative group ml-auto lg:ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-3 w-56 transition-all duration-200 z-50 ${isProfileOpen ? "opacity-100 visible mt-2" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2"}`}>
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
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">Your Profile</span>
                    </Link>

                    <Link
                      to="/applications"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">
                        My Applications
                      </span>
                    </Link>

                    <Link
                      to="/connections/all"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-primary-500 w-4"
                      />
                      <span className="font-medium text-sm">
                         Your connections
                      </span>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-2"></div>

                  {/* Sign Out */}
                  <div className="py-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        Logout();
                        setIsProfileOpen(false);
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
