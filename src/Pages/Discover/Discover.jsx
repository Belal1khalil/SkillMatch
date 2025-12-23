import React, { useEffect, useState } from "react";
import { discoverPersons } from "../../services/profile-services";
import { 
  faUsersSlash, 
  faRocket, 
  faSearch, 
  faFilter, 

  faUsers,
  faCompass,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "../../Components/UserCard/UserCard";

export default function Discover() {
  const [discoveredPersons, setDiscoveredPersons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    discoverPersons()
      .then((res) => {
        setDiscoveredPersons(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-gray-50/50">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary-50 border-t-primary-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary-100/50 rounded-2xl animate-pulse"></div>
          </div>
        </div>
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Syncing Network...</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-100 pt-20 pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-primary-50 rounded-full blur-[120px] opacity-70"></div>
          <div className="absolute -bottom-32 -right-32 w-[35rem] h-[35rem] bg-indigo-50 rounded-full blur-[120px] opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-pink-50/30 rounded-full blur-[150px] opacity-50"></div>
        </div>

        <div className="container relative z-10 text-center mx-auto px-4">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 animate-in fade-in zoom-in duration-700 shadow-2xl shadow-gray-900/20">
            <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
            Network Discovery Active
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Find Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-violet-600 to-indigo-600">Perfect Match</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-500 text-xl font-medium leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Explore a curated community of experts, collaborators, and visionaries ready to help you reach the next level.
          </p>

          {/* Search Bar Container */}
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 px-2">
            <div className="bg-white p-4 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full group">
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                  <FontAwesomeIcon icon={faSearch} className="text-xl" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by name, expertise, or location..." 
                  className="w-full pl-16 pr-8 py-6 bg-transparent outline-none text-gray-800 font-bold placeholder-gray-400 text-xl"
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-10 py-6 bg-gray-50 text-gray-600 font-black rounded-[2.5rem] hover:bg-gray-100 transition-all flex items-center justify-center gap-3 border border-gray-100">
                  <FontAwesomeIcon icon={faFilter} className="text-xs" />
                  Filters
                </button>
                <button className="flex-[2] md:flex-none px-14 py-6 bg-primary-600 text-white font-black rounded-[2.5rem] hover:bg-primary-700 shadow-2xl shadow-primary-500/40 transition-all active:scale-95 flex items-center justify-center gap-4 uppercase tracking-widest text-sm">
                  <FontAwesomeIcon icon={faCompass} className="animate-spin-slow" />
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-24 px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-indigo-600 shadow-2xl shadow-primary-500/30 rounded-3xl flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                Discovery Result
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Real-time Talent Sync</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-black text-primary-600 bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
              {discoveredPersons?.length || 0} Professionals Found
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {discoveredPersons && discoveredPersons.length > 0 ? (
            discoveredPersons.map((person) => (
              <UserCard key={person._id} userInfo={person} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[5rem] border-2 border-dashed border-gray-100 shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)] overflow-hidden relative group">
              {/* Animated Background Pulse */}
              <div className="absolute inset-0 bg-primary-50/40 scale-0 group-hover:scale-110 transition-transform duration-1000 rounded-full blur-[120px]"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-50 rounded-[4rem] flex items-center justify-center mb-12 relative shadow-inner">
                  <div className="absolute inset-0 bg-primary-100 rounded-[4rem] scale-0 group-hover:scale-110 transition-transform duration-700 opacity-25"></div>
                  <FontAwesomeIcon icon={faUsersSlash} className="text-7xl text-gray-200 group-hover:text-primary-300 transition-all duration-700" />
                </div>
                <div className="text-center max-w-lg">
                  <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
                    Nothing found.
                  </h2>
                  <p className="text-gray-400 font-bold leading-relaxed mb-12 text-xl">
                    We couldn't find anyone matching your criteria at the moment. Don't worry, the network grows every day!
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="group/btn px-16 py-6 bg-gray-900 text-white font-black rounded-[3rem] shadow-2xl shadow-gray-900/20 hover:bg-black transition-all active:scale-95 flex items-center gap-5 mx-auto"
                  >
                    <FontAwesomeIcon icon={faRocket} className="text-xl group-hover/btn:translate-x-2 transition-transform" />
                    Re-scan Network
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
