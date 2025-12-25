import React, { useContext, useEffect, useState } from "react";

import { opportunityContext } from "../../Components/Context/OpportunityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBriefcase,
  faMapMarkerAlt,
  faMoneyBillWave,
  faBolt,
  faBookmark,
  faFire,
  faArrowRight,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SavedOpportunities() {
  const { handleGetAllSavedopportunities, savedJobs, handleSaveopportunity, handleUnSaveopportunity } =
    useContext(opportunityContext);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const fetchData = async () => {
      setLoading(true);
      await handleGetAllSavedopportunities();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-16">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .job-card-animate {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-primary-900 text-white pt-24 pb-48 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </div>

        <div
          className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
              <FontAwesomeIcon icon={faHeart} className="text-pink-400" />
              Your Collection
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
              Saved <span className="text-pink-300">Opportunities</span>
            </h1>
            <p className="text-indigo-100 text-lg font-medium max-w-lg leading-relaxed opacity-90">
              Keep track of the jobs that sparked your interest. Apply when you're
              ready to make your move.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="flex items-center justify-between mb-8 text-white">
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shadow-xl">
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              Your Saved List
            </h2>
            <p className="text-xs font-bold opacity-70 mt-1 ml-13">
              {savedJobs?.length || 0} opportunities saved
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[3rem] p-8 shadow-sm animate-pulse h-80 border border-gray-50 flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : savedJobs && savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="job-card-animate group bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-3 transition-all duration-500 flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-inner group-hover:rotate-6 transition-transform">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faBriefcase} />
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="w-10 h-10 bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors rounded-xl flex items-center justify-center group/bookmark shadow-sm"
                      onClick={() => handleUnSaveopportunity(job._id)}
                      title="Remove from saved"
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                    </button>
                    <button className="w-10 h-10 bg-gray-50 text-gray-300 hover:text-indigo-500 transition-colors rounded-xl flex items-center justify-center group/bookmark">
                      <Link to={`/opportunities/${job._id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-lg mb-4">
                    <FontAwesomeIcon icon={faFire} className="text-[10px]" />
                    {job.type || "Full-time"}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 font-bold text-sm mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                    {job.company || "Company Name"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-xs"
                        />
                      </div>
                      <span className="text-xs font-bold">
                        {job.location || "Remote"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          className="text-xs"
                        />
                      </div>
                      <span className="text-xs font-bold">
                        {job.salary || "Competitive"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(job.skills || ["React", "NodeJS", "UI Design"])
                      .slice(0, 3)
                      .map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gray-50/50 border border-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    {job.skills?.length > 3 && (
                      <span className="px-3 py-1.5 bg-gray-50/50 border border-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        +{job.skills.length - 3} More
                      </span>
                    )}
                  </div>
                </div>

                <button className="w-full py-5 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-600/30 transition-all active:scale-95 relative z-10 flex items-center justify-center gap-3 group/btn">
                  Apply Now
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[10px] group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-20 text-center border border-gray-100 shadow-xl shadow-gray-200/30">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner shadow-indigo-200/50">
              <FontAwesomeIcon icon={faBookmark} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
              No Saved Jobs Yet
            </h3>
            <p className="text-gray-400 font-bold max-w-sm mx-auto mb-10 leading-relaxed">
              You haven't saved any opportunities yet. Browse the jobs page to
              find roles that interest you!
            </p>
            <Link
              to="/jobs"
              className="inline-block px-10 py-4 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all shadow-xl"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
