import React, { useEffect, useState } from 'react';
import { getPendingConnections } from '../../services/connection-services';
import PendingConnectionCard from '../../Components/PendingConnectionCard/PendingConnectionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUserClock } from '@fortawesome/free-solid-svg-icons';

export default function PendeingConnection() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingConnections();
  }, []);

  const fetchPendingConnections = async () => {
    try {
      setLoading(true);
      const response = await getPendingConnections();
      console.log(response)
      if (response.success) {
        setConnections(response.data.connections || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionComplete = (connectionId) => {
    setConnections(prev => prev.filter(c => c._id !== connectionId));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading pending requests...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faClock} />
          </span>
          Pending Requests
        </h2>
        <p className="text-gray-500 ml-13">
          Manage incoming connection requests from other professionals.
        </p>
      </div>

      {connections.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {connections.map((connection) => (
            <PendingConnectionCard 
              key={connection._id} 
              connection={connection} 
              onAction={handleActionComplete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 text-center px-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <FontAwesomeIcon icon={faUserClock} className="text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Pending Requests</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            You're all caught up! When people send you connection requests, they'll appear here.
          </p>
        </div>
      )}
    </div>
  );
}
