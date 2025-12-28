import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBell, 
  faTimes, 
  faCheck, 
  faUserPlus, 
  faBriefcase, 
  faComment,
  faCheckDouble,
  faClock,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSocket } from "../../Components/Context/SocketContext";
import { acceptConnection, rejectConnection } from "../../services/connection-services";
import { markAllNotificationsAsRead } from "../../services/notificitions-services";
import toast from "react-hot-toast";
import userImg from '../../assets/imgs/user.png';
import { formatDistanceToNow } from "date-fns";

const Notificitions = () => {
  const { notifications, unreadCount, markAsRead, removeNotification, setNotifications, setUnreadCount, loading } =
    useSocket();
  const [processing, setProcessing] = useState({});
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleAcceptConnection = async (notification) => {
    const connectionId = notification.referenceId;

    if (!connectionId) {
      console.error("ERROR: Connection ID is missing in notification:", notification);
      toast.error("Cannot accept connection: Missing connection ID");
      return;
    }

    setProcessing((prev) => ({ ...prev, [notification._id]: true }));
    try {
      const res = await acceptConnection(connectionId);
      if (res.success) {
        toast.success("Connection request accepted!");
        await markAsRead(notification._id);
        // We don't remove it, we just update it via SocketContext which markAsRead does
      }
    } catch (error) {
      console.error("Failed to accept connection:", error);
      toast.error(error?.response?.data?.message || "Failed to accept connection request");
    } finally {
      setProcessing((prev) => ({ ...prev, [notification._id]: false }));
    }
  };

  const handleRejectConnection = async (notification) => {
    const connectionId = notification.referenceId;

    if (!connectionId) {
      console.error("ERROR: Connection ID is missing in notification:", notification);
      toast.error("Cannot reject connection: Missing connection ID");
      return;
    }

    setProcessing((prev) => ({ ...prev, [notification._id]: true }));
    try {
      const res = await rejectConnection(connectionId);
      if (res.success) {
        toast.success("Connection request rejected");
        await markAsRead(notification._id);
        removeNotification(notification._id);
      }
    } catch (error) {
      console.error("Failed to reject connection:", error);
      toast.error(error?.response?.data?.message || "Failed to reject connection request");
    } finally {
      setProcessing((prev) => ({ ...prev, [notification._id]: false }));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAll(true);
      const res = await markAllNotificationsAsRead();
      if (res.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success("All notifications marked as read");
      }
    } catch (error) {
      toast.error("Failed to mark all as read");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "connection_request":
        return <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5 text-blue-600" />;
      case "connection_accepted":
        return <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-600" />;
      case "job_share":
        return <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5 text-purple-600" />;
      case "job_application":
        return <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5 text-blue-600" />;
      case "message":
        return <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-orange-600" />;
      default:
        return <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDisplayName = (notification) => {
    return (
      notification.actor?.username ||
      notification.actor?.name ||
      "Someone"
    );
  };

  const getUserAvatarUrl = (actor) => {
    if (actor?.photo) {
      return `https://skillmatch.elmihy.me/api/img/users/${actor.photo}`;
    }
    return userImg;
  };

  const renderNotificationContent = (notification) => {
    const isProcessingThis = processing[notification._id];

    switch (notification.type) {
      case "connection_request":
        return (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <img
                src={getUserAvatarUrl(notification.actor)}
                alt={getDisplayName(notification)}
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                onError={(e) => { e.target.src = userImg; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-tight">
                  <span className="font-bold">
                    {getDisplayName(notification)}
                  </span>{" "}
                  sent you a connection request
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-medium flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} className="text-[9px]" />
                  {notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : "recently"}
                </p>
              </div>
            </div>
            {!notification.isRead ? (
              <div className="flex gap-2 pl-13">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptConnection(notification);
                  }}
                  disabled={isProcessingThis}
                  className="px-4 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-sm active:scale-95"
                >
                  {isProcessingThis ? "Accepting..." : "Accept"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRejectConnection(notification);
                  }}
                  disabled={isProcessingThis}
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors active:scale-95"
                >
                  Reject
                </button>
              </div>
            ) : (
              <div className="mt-1 ml-13 text-xs text-green-600 font-bold flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCheckCircle} />
                You are now connected
              </div>
            )}
          </div>
        );

      case "connection_accepted":
        return (
          <div className="flex items-start gap-3">
            <img
              src={getUserAvatarUrl(notification.actor)}
              alt={getDisplayName(notification)}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
              onError={(e) => { e.target.src = userImg; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-tight">
                <span className="font-bold">
                  {getDisplayName(notification)}
                </span>{" "}
                accepted your connection request
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="text-[9px]" />
                {notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : "recently"}
              </p>
            </div>
          </div>
        );

      case "job_application":
        return (
          <div className="flex items-start gap-3">
            <img
              src={getUserAvatarUrl(notification.actor)}
              alt={getDisplayName(notification)}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
              onError={(e) => { e.target.src = userImg; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-tight">
                  <span className="font-bold">
                    {getDisplayName(notification)}
                  </span>{" "}
                  applied for a job.
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="text-[9px]" />
                {notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : "recently"}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <p className="text-sm text-gray-900 leading-tight">{notification.text || "New interaction on your profile"}</p>
            <p className="text-[11px] text-gray-400 mt-1 font-medium flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="text-[9px]" />
              {notification.createdAt ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) : "recently"}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-600 border border-gray-100">
                <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
              </div>
              Notifications
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button 
                disabled={isMarkingAll}
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-100 text-sm font-bold rounded-xl shadow-sm text-primary-600 hover:bg-primary-50 transition-all duration-300 active:scale-95 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faCheckDouble} className="mr-2" />
                {isMarkingAll ? "Marking..." : "Mark all as read"}
              </button>
            )}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary-50 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-gray-400 font-bold animate-pulse">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-24 text-center px-6">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                <FontAwesomeIcon icon={faBell} className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clean Slate!</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8">
                No notifications at the moment. We'll let you know when something important happens.
              </p>
              <Link
                to="/discover"
                className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95"
              >
                Discover People
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => !notification.isRead && notification.type !== "connection_request" && markAsRead(notification._id)}
                  className={`p-6 transition-all duration-300 flex items-start gap-4 hover:bg-gray-50/50 cursor-pointer ${
                    !notification.isRead ? "bg-primary-50/30" : ""
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    {renderNotificationContent(notification)}
                  </div>
                  {!notification.isRead && (
                    <div className="shrink-0 self-center">
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full shadow-lg shadow-primary-500/50"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/connections/all"
              className="text-sm font-bold text-gray-400 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
              Manage All Connections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notificitions;
