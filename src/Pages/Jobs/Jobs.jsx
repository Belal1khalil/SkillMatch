import { useContext, useEffect, useState } from "react";
import { getAllopportunities } from "../../services/opportunities-services";
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
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { opportunityContext } from "../../Components/Context/OpportunityContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
    const {handleSaveopportunity , savedOpportunities , handleUnSaveopportunity , handleApplyOpportunity , appliedJobs} =  useContext(opportunityContext)
  useEffect(() => {
    setIsVisible(true);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getAllopportunities();
      if (response.success) {
        setJobs(response.data.data.opportunities || []);
      }
    } catch (error) {
      console.error("Fetch jobs error:", error);
      toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        .glass-search {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-primary-700 to-purple-800 text-white pt-24 pb-48 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-400 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
                <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
                Latest Opportunities
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                Find Your Next <br />
                <span className="text-amber-300">Big Career Move.</span>
              </h1>
              <p className="text-primary-100 text-lg font-medium max-w-lg leading-relaxed opacity-90">
                Explore thousands of job opportunities from top companies worldwide, curated specifically for your career growth.
              </p>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="glass-search p-2 rounded-[2.5rem] shadow-2xl shadow-black/20 border border-white/20 relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-primary-500 transition-colors group-focus-within:text-primary-600">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  type="text"
                  placeholder="Search by role, company, or keyword..."
                  className="w-full pl-14 pr-6 py-5 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 font-bold placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        <div className="flex items-center justify-between mb-8 text-white">
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 lg:bg-primary-50 rounded-xl flex items-center justify-center text-white lg:text-primary-600 shadow-xl lg:shadow-none">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              Available Jobs
            </h2>
            <p className="text-xs font-bold opacity-70 mt-1 ml-13">Discover {filteredJobs.length} opportunities matching your criteria</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[3rem] p-8 shadow-sm animate-pulse h-80 border border-gray-50 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <div className="h-8 bg-gray-100 rounded-xl w-20"></div>
                  <div className="h-8 bg-gray-100 rounded-xl w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="job-card-animate group bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-3 transition-all duration-500 flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                   
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center text-primary-600 text-2xl shadow-inner group-hover:rotate-6 transition-transform">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
                    ) : (
                      <FontAwesomeIcon icon={faBriefcase} />
                    )}
                  </div>
                 <div className="flex gap-4">
                     <button className= {`${savedOpportunities[job._id] ? `text-red-500` : `w-10 h-10 bg-gray-50 text-gray-300 hover:text-primary-500-500 transition-colors rounded-xl flex items-center justify-center group/bookmark`}`} >
                    <FontAwesomeIcon icon={faBookmark} onClick={()=>{
                        if(savedOpportunities[job._id]) {
                          handleUnSaveopportunity(job._id)
                        } else {
                          handleSaveopportunity(job._id)
                        }
                    }} />
                  </button>
                  <button className="w-10 h-10 bg-gray-50 text-gray-300 hover:text-primary-500 transition-colors rounded-xl flex items-center justify-center group/bookmark">
                     <Link to={`/opportunities/${job._id}`}>
                     
                     <FontAwesomeIcon icon={faEye} />
                     </Link>
                  </button>
                 </div>
                </div>
                 {
              
                 }
                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-lg mb-4">
                    <FontAwesomeIcon icon={faFire} className="text-[10px]" />
                    {job.type || "Full-time"}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 font-bold text-sm mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                    {job.company || "TechCorp Global"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs" />
                      </div>
                      <span className="text-xs font-bold">{job.location || "Remote"}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="text-xs" />
                      </div>
                      <span className="text-xs font-bold">{job.salary || "Competitive"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(job.skills || ["React", "NodeJS", "UI Design"]).slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-50/50 border border-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        {skill}
                      </span>
                    ))}
                    {(job.skills?.length > 3) && (
                      <span className="px-3 py-1.5 bg-gray-50/50 border border-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        +{job.skills.length - 3} More
                      </span>
                    )}
                  </div>
                </div>

                <button  onClick={()=>{
                    if(!appliedJobs[job._id]) {
                      handleApplyOpportunity(job._id)
                    }
                  }} 
                  disabled={appliedJobs[job._id]}
                  className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 relative z-10 ${
                    appliedJobs[job._id] === 'rejected' ? "bg-red-600 text-white shadow-xl shadow-red-600/30 cursor-default" :
                    appliedJobs[job._id] === 'accepted' ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 cursor-default" :
                    appliedJobs[job._id] 
                      ? "bg-green-600 text-white shadow-xl shadow-green-600/30 cursor-default" 
                      : "bg-gray-900 text-white hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary-600/30"
                  }`}
                >
                  {
                    appliedJobs[job._id] 
                     ? (typeof appliedJobs[job._id] === 'string' ? appliedJobs[job._id] : "Applied")
                     : "Apply for this position"
                  }
                  <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-20 text-center border border-gray-100 shadow-xl shadow-gray-200/30">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner shadow-red-200/50">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No Results Found</h3>
            <p className="text-gray-400 font-bold max-w-sm mx-auto mb-10 leading-relaxed">
              We couldn't find any jobs matching "{searchQuery}". Try a different keyword or check back later!
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-10 py-4 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary-600 transition-all shadow-xl"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      {!loading && filteredJobs.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-around gap-12 shadow-sm">
            <div className="text-center group">
              <p className="text-4xl font-black text-primary-600 mb-1 group-hover:scale-110 transition-transform">{jobs.length}+</p>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Global Positions</p>
            </div>
            <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
            <div className="text-center group">
              <p className="text-4xl font-black text-indigo-600 mb-1 group-hover:scale-110 transition-transform">120k</p>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">New Jobs Monthly</p>
            </div>
            <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
            <div className="text-center group">
              <p className="text-4xl font-black text-emerald-600 mb-1 group-hover:scale-110 transition-transform">500+</p>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Partner Companies</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
