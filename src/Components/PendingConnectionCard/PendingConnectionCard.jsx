import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function PendingConnectionCard({ connection, onAction }) {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (action) => {
    try {
      setLoadingAction(action);
      let response;
      if (action === 'accept') {
        response = await acceptConnectionRequest(connection._id);
      } else {
        response = await rejectConnectionRequest(connection._id);
      }

      if (response.success) {
        toast.success(action === 'accept' ? 'Connection accepted!' : 'Request rejected.');
        if (onAction) onAction(connection._id);
      }
    } catch (error) {
       console.error(error);
       toast.error(`Failed to ${action} request`);
    } finally {
      setLoadingAction(null);
    }
  };

  // const receiver = connection.sender;

  return (
    <div className="group relative bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/40 border border-gray-100 hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl group-hover:bg-primary-100/50 transition-colors"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile Image with Ring */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-[1.75rem] overflow-hidden border-4 border-white shadow-lg shadow-gray-200/50">
            <img 
               src={`https://skillmatch.elmihy.me/api/img/users/${connection.receiver?.photo}`} 
               alt={connection.receiver?.username}
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
               onError={(e) => {
                 e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(receiver?.username) + '&background=f3f4f6&color=6b7280';
               }}
            />
          </div>
          {/* Status Badge - Orange for Pending */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 border-4 border-white rounded-full animate-pulse"></div>
        </div>

        {/* User Info */}
        <div className="text-center w-full px-2 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
            {connection.receiver?.username}
          </h3>
        
          <div className="mt-3 text-xs font-semibold text-gray-500 bg-gray-50 py-1 px-3 rounded-full inline-block border border-gray-100">
             Sent you a request
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button
          disabled
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faClock} />
             Pending
          </button>
          
     
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </div>
  );
}
