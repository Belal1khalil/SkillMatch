import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLink, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function UserCard({ userInfo, onConnect }) {
 

  if (!userInfo) return null;

  return (
    <section className="p-2">
      <div className="group relative mt-4 bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/40 border border-gray-100 hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl group-hover:bg-primary-100/50 transition-colors"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Profile Image with Ring */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-[1.75rem] overflow-hidden border-4 border-white shadow-lg shadow-gray-200/50">
              <img 
                 src={`https://skillmatch.elmihy.me/api/img/users/${userInfo.photo}`} 
                alt={userInfo.username}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userInfo.username) + '&background=f3f4f6&color=6b7280';
                }}
              />
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="text-center w-full px-2">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
              {userInfo.username}
            </h3>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6">
              <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" />
              <span className="truncate max-w-[150px]">{userInfo.email}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={() => onConnect && onConnect(userInfo._id)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
              Connect
            </button>
            <button
              className="w-12 h-12 bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all flex items-center justify-center active:scale-90"
              title="View Profile"
            >
              <FontAwesomeIcon icon={faLink} className="text-xs" />
            </button>
          </div>
        </div>

        {/* Subtle Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
      </div>
    </section>
  );
}
