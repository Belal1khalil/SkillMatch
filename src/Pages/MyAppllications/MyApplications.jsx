import React, { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applications-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBriefcase,
  faMapMarkerAlt,
  faCalendarAlt,
  faCheckCircle,
  faBuilding,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getMyApplications();
      
      // Check if response has the expected structure based on user's log
      // response.data (outer data) .data (inner data) .applications
      const apps = response.data?.data?.applications || response.data?.applications || [];
      setApplications(apps);
       
    } catch (error) {
      console.error("Fetch applications error:", error);
      toast.error("Failed to load your applications");
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const job = app.opportunity || app.job;
    const title = job?.title?.toLowerCase() || "";
    const company = job?.company?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return title.includes(query) || company.includes(query);
  });

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-16">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate {
          animation: slideUp 0.5s ease forwards;
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-primary-800 to-primary-900 text-white pt-24 pb-48 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
                <FontAwesomeIcon icon={faPaperPlane} className="text-emerald-400" />
                Track Your Success
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                My Applications
              </h1>
              <p className="text-indigo-100 text-lg font-medium max-w-xl opacity-90">
                Monitor the status of your job applications and manage your career journey all in one place.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-auto min-w-[320px]">
               <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex items-center shadow-2xl">
                 <FontAwesomeIcon icon={faSearch} className="text-indigo-200 ml-4" />
                 <input 
                    type="text" 
                    placeholder="Search applied jobs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-indigo-200/70 focus:ring-0 w-full py-2 px-3 focus:outline-none font-medium"
                 />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
        {loading ? (
             <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 h-32 animate-pulse shadow-sm"></div>
                ))}
            </div>
        ) : filteredApplications.length > 0 ? (
          <div className="grid gap-6">
            {filteredApplications.map((app, index) => {
              const job = app.opportunity || app.job; // Handle potential varied response structure
              return (
              <div 
                key={app._id} 
                className="card-animate bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-primary-600 text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {job?.logo ? <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" /> : <FontAwesomeIcon icon={faBuilding} />}
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                           {job?.title || 'Unknown Position'}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                           <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faBuilding} className="text-primary-400" />
                              {job?.company || 'Confidential Company'}
                           </span>
                           <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-400" />
                              {job?.location || 'Remote'}
                           </span>
                           <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-400" />
                              Applied on {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                     <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                       app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                       app.status === 'rejected' ? 'bg-red-50 text-red-600' :
                       'bg-amber-50 text-amber-600'
                     }`}>
                        <FontAwesomeIcon icon={
                          app.status === 'accepted' ? faCheckCircle :
                          app.status === 'rejected' ? faCheckCircle : 
                          faPaperPlane
                        } />
                        {app.status || 'Applied'}
                     </span>
                     <Link to={`/opportunities/${job?._id}`}>
                        <button className="px-6 py-3 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-primary-600 transition-colors">
                           View Details
                        </button>
                     </Link>
                  </div>
              </div>
            )})}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-16 text-center border border-gray-100 shadow-xl">
             <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                <FontAwesomeIcon icon={faPaperPlane} />
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-2">No Applications Yet</h3>
             <p className="text-gray-400 font-medium mb-8 max-w-sm mx-auto">
               You haven't applied to any jobs yet. Start exploring opportunities and take the next step in your career!
             </p>
             <Link to="/jobs">
               <button className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30">
                 Browse Opportunities
               </button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
