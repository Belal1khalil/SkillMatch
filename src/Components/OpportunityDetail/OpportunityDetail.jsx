import {
  faBuilding,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faBolt,
  faBookmark,
  faMapMarkerAlt,
  faMoneyBillWave,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { opportunityContext } from "../Context/OpportunityContext";

export default function OpportunityDetails({ opportunity }) {
  const { handleSaveopportunity, savedOpportunities, handleUnSaveopportunity } =
    useContext(opportunityContext);
  return (
    <>
      <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
        <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-primary-700 via-indigo-800 to-primary-900 text-white pt-24 pb-48 px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
            <Link
              to="/Jobs"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors group w-fit"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Opportunities
            </Link>

            <div className={`transition-all duration-1000`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex items-start md:items-center gap-6">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 flex items-center justify-center text-white text-4xl shadow-2xl shrink-0">
                    {opportunity.logo ? (
                      <img
                        src={opportunity.logo}
                        alt={opportunity.company}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faBuilding} />
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 border border-amber-400/20">
                      <FontAwesomeIcon icon={faBolt} />
                      {opportunity.type || "Full-time"}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                      {opportunity.title}
                    </h1>
                    <p className="text-white/70 font-bold text-lg flex items-center gap-3">
                      {opportunity.company || "TechCorp Global"}
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
                      <span className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-primary-400"
                        />
                        {opportunity.location || "Remote"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center transition-all">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={` ${
                        savedOpportunities[opportunity._id]
                          ? `text-red-500 `
                          : `text-white-500`
                      }`}
                      onClick={() => {
                        if (savedOpportunities[opportunity._id]) {
                          handleUnSaveopportunity(opportunity._id);
                        } else {
                          handleSaveopportunity(opportunity._id);
                        }
                      }}
                    />
                  </button>
                  <button className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center transition-all">
                    <FontAwesomeIcon icon={faShareAlt} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                <span className="w-2 h-8 bg-primary-600 rounded-full"></span>
                About the Role
              </h3>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                <p className="whitespace-pre-line">
                  {opportunity.description ||
                    "We are looking for a talented professional to join our team. You will be responsible for high-impact work and collaboration with cross-functional teams."}
                </p>
              </div>

              {opportunity.requirements && (
                <div className="mt-12">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                    Requirements
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Array.isArray(opportunity.requirements)
                      ? opportunity.requirements
                      : [opportunity.requirements]
                    ).map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary-200 transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-primary-500 mt-1 shrink-0"
                        />
                        <span className="text-gray-600 font-bold text-sm leading-snug">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-4">
                {(
                  opportunity.skills || [
                    "Communication",
                    "Teamwork",
                    "Problem Solving",
                  ]
                ).map((skill, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-black text-xs uppercase tracking-widest hover:bg-primary-50 hover:border-primary-200 transition-all cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div
            className="space-y-8 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
              <h4 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest border-b border-gray-100 pb-4">
                Quick Facts
              </h4>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shadow-inner">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Offered Salary
                    </p>
                    <p className="text-gray-900 font-black">
                      {opportunity.salary || "Competitive"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Commitment
                    </p>
                    <p className="text-gray-900 font-black">
                      {opportunity.type || "Full-time"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shadow-inner">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Location
                    </p>
                    <p className="text-gray-900 font-black">
                      {opportunity.location || "Remote"}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-primary-600 hover:shadow-primary-600/40 transition-all active:scale-95 mb-6 group">
                Apply for Job
                <FontAwesomeIcon
                  icon={faBolt}
                  className="ml-3 text-amber-400 group-hover:scale-125 transition-transform"
                />
              </button>
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Posted on{" "}
                {new Date(
                  opportunity.createdAt || Date.now()
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
