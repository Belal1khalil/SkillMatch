import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBriefcase,
  faBookmark,
  faEdit,
  faChartBar,
  faCheckSquare,
  faChevronRight,
  faFire,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getProfileData } from "../../services/profile-services";
import { getMyApplications } from "../../services/applications-services";
import { getAllsavedopportunities, GetRecommendedJobs } from "../../services/opportunities-services";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState({
    applied: 0,
    saved: 0,
    views: 54, // Hardcoded for now as per design
    projects: 4 // Hardcoded for now as per design
  });
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, appsRes, savedRes, recommendedRes] = await Promise.all([
        getProfileData(),
        getMyApplications(),
        getAllsavedopportunities(),
        GetRecommendedJobs()
      ]);

      if (profileRes.success) setUserData(profileRes.data.data.user);
      if (appsRes.success) setMetrics(prev => ({ ...prev, applied: appsRes.data.results || 0 }));
      if (savedRes.success) setMetrics(prev => ({ ...prev, saved: savedRes.data.results || 0 }));
      if (recommendedRes.success) setRecommendedJobs(recommendedRes.data.data.opportunities || []);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Applied Jobs",
      value: metrics.applied,
      icon: faBriefcase,
      bgColor: "bg-purple-100/40",
      iconColor: "text-purple-600",
      shadowColor: "shadow-purple-500/10",
      hoverBorder: "hover:border-purple-200",
    },
    {
      label: "Saved Jobs",
      value: metrics.saved,
      icon: faBookmark,
      bgColor: "bg-blue-100/40",
      iconColor: "text-blue-600",
      shadowColor: "shadow-blue-500/10",
      hoverBorder: "hover:border-blue-200",
    },
    {
      label: "Profile Views",
      value: metrics.views,
      icon: faChartBar,
      bgColor: "bg-orange-100/40",
      iconColor: "text-orange-600",
      shadowColor: "shadow-orange-500/10",
      hoverBorder: "hover:border-orange-200",
    },
    {
      label: "Completed Projects",
      value: metrics.projects,
      icon: faCheckSquare,
      bgColor: "bg-teal-100/40",
      iconColor: "text-teal-600",
      shadowColor: "shadow-teal-500/10",
      hoverBorder: "hover:border-teal-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-16 selection:bg-primary-100 selection:text-primary-700">
      <style>{`
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 3s infinite ease-in-out;
        }
        .glass-nav {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>

      <div
        className={`max-w-7xl mx-auto px-6 py-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                {userData?.username || 'User'}!
              </span>
            </h1>
            <p className="text-gray-500 text-lg font-medium opacity-80">
              {metrics.applied > 0 
                ? `You have applied to ${metrics.applied} jobs so far. Keep going!`
                : "Your dashboard is looking great. Start exploring new opportunities!"}
            </p>
          </div>

          <div className="bg-white p-2 rounded-[2.25rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center gap-1 max-w-sm animate-subtle-pulse group cursor-pointer hover:shadow-2xl transition-all">
            <div className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-6 transition-all">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Update Your Skills</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Boost your matching score by 25% today.
                </p>
              </div>
            </div>
            <Link to="/profile" className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 m-1">
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Your Metrics
            </h2>
            <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Detailed View
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} p-8 rounded-[2.5rem] border border-transparent ${stat.hoverBorder} transition-all hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${stat.shadowColor} group cursor-pointer`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`${stat.iconColor} text-2xl mb-8 group-hover:scale-110 transition-transform origin-left`}
                >
                   <FontAwesomeIcon icon={stat.icon} />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-black text-gray-900">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Recommended For You
            </h2>
            <div className="flex gap-2">
              <button className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-400 transition-all">
                <FontAwesomeIcon icon={faEdit} className="text-xs" />
              </button>
              <Link to="/Jobs" className="p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-500/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faSearch} className="text-xs" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-white rounded-[2.5rem] border border-gray-100 animate-pulse flex flex-col p-8 space-y-4">
                  <div className="h-40 bg-gray-100 rounded-2xl w-full"></div>
                  <div className="h-6 bg-gray-100 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
                  <div className="mt-auto h-12 bg-gray-100 rounded-2xl w-full"></div>
                </div>
              ))
            ) : recommendedJobs.length > 0 ? (
              recommendedJobs.slice(0, 4).map((op, index) => (
                <div
                  key={op._id || index}
                  className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group flex flex-col hover:-translate-y-3"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={`https://skillmatch.elmihy.me/api/img/jobs/${op.img}`}
                      alt={op.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-lg">
                      Recommended
                    </div>

                    <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all">
                        <FontAwesomeIcon icon={faBookmark} className="text-sm" />
                      </button>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6 flex-1">
                      <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight leading-tight line-clamp-2">
                        {op.title}
                      </h4>
                      <p className="text-gray-400 text-sm font-bold mb-5 flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
                        {op.companyName}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-xl border border-gray-100/50">
                          {op.location}
                        </span>
                        <span className="px-3 py-1.5 bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-xl border border-gray-100/50">
                          {op.jobType}
                        </span>
                      </div>
                    </div>

                    <Link 
                      to={`/opportunities/${op._id}`}
                      className="w-full py-4 bg-gray-900 text-white text-center text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-600/20 transition-all active:scale-95"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-[4rem] border border-gray-100 shadow-inner">
                 <FontAwesomeIcon icon={faFire} className="text-gray-100 text-5xl mb-4" />
                <p className="text-gray-500 font-bold">No recommendations found yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-gray-100/50 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
            © 2025 SkillMatch Ecosystem. Built for Creatives.
          </p>
        </div>
      </footer>
    </div>
  );
}
