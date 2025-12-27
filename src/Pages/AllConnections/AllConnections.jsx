import React, { useEffect, useState } from "react";
import { getAllConnections } from "../../services/connection-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUsers, 
  faNetworkWired, 
  faSearch,
  faEllipsisV,
  faEnvelope,
  faUserMinus,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AllConnections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleRemoveConnection = async (connectionId) => {
    if (window.confirm("Are you sure you want to remove this connection?")) {
      try {
        const response = await removeConnection(connectionId);
        if (response.success) {
          setConnections(prev => prev.filter(c => c._id !== connectionId));
        }
      } catch (error) {
        console.error("Failed to remove connection:", error);
      }
    }
  };

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await getAllConnections();
      if (response.success) {
        setConnections(response.data.connections || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredConnections = connections.filter(connection => {
      const friend = connection.friend || connection.receiver || connection.sender || connection;
      const name = friend?.username?.toLowerCase() || "";
      const email = friend?.email?.toLowerCase() || "";
      return name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading your network...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-gray-50/30">
        {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            My Network
          </h2>
          <p className="text-gray-500 ml-13">
             {connections.length} {connections.length === 1 ? 'Connection' : 'Connections'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                  <FontAwesomeIcon icon={faSearch} />
             </div>
             <input 
                type="text" 
                placeholder="Search connections..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
        </div>
      </div>

      {/* Grid */}
      {filteredConnections.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => {
             const user = connection.friend || connection.receiver || connection.sender || connection;
             const isDropdownOpen = activeDropdown === connection._id;

             return (
                <div key={connection._id} className="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100 transition-all duration-300 relative overflow-visible">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                                <img 
                                    src={`https://skillmatch.elmihy.me/api/img/users/${user.photo}`} 
                                    alt={user.username}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.username) + '&background=f3f4f6&color=6b7280';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-900 truncate pr-2 group-hover:text-primary-600 transition-colors">
                                    {user.username}
                                </h3>
                                
                                {/* Meatball Menu */}
                                <div className="relative" onClick={e => e.stopPropagation()}>
                                    <button 
                                        onClick={() => setActiveDropdown(isDropdownOpen ? null : connection._id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </button>
                                    
                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                            <button 
                                                onClick={() => handleRemoveConnection(connection._id)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2 font-medium transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faUserMinus} className="text-xs opacity-70" />
                                                Remove Connection
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 truncate mb-3">{user.email}</p>
                            
                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <Link 
                                    to={`/profile/${user._id}`}
                                    className="flex-1 py-2 px-3 bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-transparent hover:border-primary-100"
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    Profile
                                </Link>
                                <button className="flex-1 py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 active:scale-95">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 text-center px-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <FontAwesomeIcon icon={faNetworkWired} className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Connections Yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Start expanding your professional network by discovering new people.
          </p>
        </div>
      )}
    </div>
  );
}
