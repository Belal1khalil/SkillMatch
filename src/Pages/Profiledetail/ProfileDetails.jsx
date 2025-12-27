import React, { useEffect, useState } from 'react';
import { getSpecificUser } from '../../services/profile-services';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCheckCircle,
  faGraduationCap,
  faHeart,
  faBriefcase,
  faArrowLeft,
  faUserCircle,
  faSpinner,
  faUserPlus,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { sendConnectionRequest, getConnectionStatus } from '../../services/connection-services';
import userImg from '../../assets/imgs/user.png';
import { useNavigate } from 'react-router-dom';

export default function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isConnectionLoading, setIsConnectionLoading] = useState(false);

  async function handleGetSpecificuser(id) {
    try {
      setLoading(true);
      setError(null);
      const response = await getSpecificUser(id);
      console.log(response);
      if (response.success) {
        setUserData(response.data.user);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || 'Failed to load user profile');
      setLoading(false);
    }
  }

  async function handleSendConnection() {
    try {
      setIsConnectionLoading(true);
      const response = await sendConnectionRequest(id);
      if (response.success) {
        setConnectionStatus(response.data.connection.status);
        toast.success(response.data.message || 'Connection request sent!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to send connection request');
    } finally {
      setIsConnectionLoading(false);
    }
  }

  useEffect(() => {
    handleGetSpecificuser(id);
    
    // Fetch connection status
    if (id) {
      getConnectionStatus(id)
        .then(res => {
          if (res.success && res.data?.status) {
            setConnectionStatus(res.data.status);
          }
        })
        .catch(err => console.log('No connection status found:', err));
    }
  }, [id]);

  // Loading State
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
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
            Loading Profile...
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-gray-50/50 px-4">
        <div className="w-32 h-32 bg-red-50 rounded-[3rem] flex items-center justify-center">
          <FontAwesomeIcon icon={faUserCircle} className="text-6xl text-red-300" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-500 font-medium mb-8">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center gap-3 mx-auto"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-gray-50/50">
        <p className="text-gray-400 font-medium">No user data available</p>
      </div>
    );
  }

  // Profile Data
  const userProfile = {
    username: userData?.username || 'User Name',
    email: userData?.email || 'email@example.com',
    role: userData?.role || 'Professional',
    phone: userData?.phone || 'Not provided',
    location: userData?.location || 'Remote',
    bio: userData?.bio || 'No bio provided.',
    skills: userData?.skills || [],
    interests: userData?.interests || [],
    profilePic: userData?.photo || userImg,
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 font-sans overflow-x-hidden">
      {/* Header Section with Gradient */}
      <div className="relative bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 pt-20 pb-40 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Back Button */}
        <div className="container relative z-10 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center gap-3 border border-white/20"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-8 text-center border-b border-gray-50">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {userData?.photo ? (
                      <img
                        src={`https://skillmatch.elmihy.me/api/img/users/${userData.photo}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={userImg} alt="userProfile" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  {userProfile.username}
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary-500 text-lg" />
                </h2>

                <div className="flex justify-center gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-gray-100">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-400" />
                    {userProfile.location}
                  </span>
                </div>

                {/* Role Badge */}
                <div className="inline-flex px-6 py-2.5 bg-gradient-to-r from-primary-50 to-indigo-50 text-primary-700 rounded-2xl text-sm font-bold border border-primary-100">
                  {userProfile.role}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-6 ml-1">
                    Contact Information
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                        <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-sm text-gray-700 font-bold truncate">
                          {userProfile.email}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                        <FontAwesomeIcon icon={faPhone} className="text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Phone
                        </p>
                        <p className="text-sm text-gray-700 font-bold truncate">
                          {userProfile.phone}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Connection Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSendConnection}
                    disabled={connectionStatus === 'pending' || isConnectionLoading}
                    className={`w-full py-4 px-6 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 text-base ${
                      connectionStatus === 'pending'
                        ? 'bg-yellow-500 text-white shadow-yellow-500/20 cursor-not-allowed hover:bg-yellow-600'
                        : connectionStatus === 'accepted'
                        ? 'bg-green-600 text-white shadow-green-500/20 hover:bg-green-700'
                        : 'bg-primary-600 text-white shadow-primary-500/30 hover:bg-primary-700'
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={
                        connectionStatus === 'pending' 
                          ? faClock 
                          : connectionStatus === 'accepted' 
                          ? faCheckCircle 
                          : faUserPlus
                      } 
                      className="text-lg"
                    />
                    {isConnectionLoading
                      ? 'Sending...'
                      : connectionStatus === 'pending'
                      ? 'Request Pending'
                      : connectionStatus === 'accepted'
                      ? 'Connected'
                      : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <FontAwesomeIcon icon={faUser} className="text-sm" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">About</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                {userProfile.bio}
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-sm" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Expertise & Skills
                  </h3>
                </div>
                <FontAwesomeIcon icon={faBriefcase} className="text-primary-100 text-2xl" />
              </div>
              <div className="flex flex-wrap gap-4">
                {userProfile.skills.length > 0 ? (
                  userProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-6 py-3.5 bg-gradient-to-r from-primary-50 to-indigo-50 text-primary-700 rounded-2xl text-sm font-bold border border-primary-100 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* Interests Section */}
            {userProfile.interests.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                      <FontAwesomeIcon icon={faHeart} className="text-sm" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Interests</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {userProfile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-6 py-3.5 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-2xl text-sm font-bold border border-pink-100 hover:shadow-lg hover:shadow-pink-500/10 transition-all"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
