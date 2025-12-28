import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { getAllnotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../../services/notificitions-services';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { token } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await getAllnotifications();
            if (res.status === "success" || res.success) {
           
                const newNotifs = res.data.notifications || [];
                setNotifications(newNotifs);
                setUnreadCount(newNotifs.filter(n => !n.isRead).length);
            }
        } catch (error) {
            console.error("Notifications fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchNotifications();

            const newSocket = io('https://skillmatch.elmihy.me', {
                auth: {
                    token: token
                },
                transports: ['websocket']
            });

            newSocket.on('connect', () => {
                // console.log('Connected to socket server');
            });

            newSocket.on('notification', (notification) => {
                console.log('New notification received:', notification);
                setNotifications((prev) => [notification, ...prev]);
                setUnreadCount((prev) => prev + 1);
            });

            setSocket(newSocket);

            return () => {
                if (newSocket) newSocket.close();
            };
        } else {
            setNotifications([]);
            setUnreadCount(0);
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [token, fetchNotifications]);

    const markAsRead = async (id) => {
        try {
            const res = await markNotificationAsRead(id);
            if (res.success) {
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
            return res;
        } catch (error) {
            console.error("Failed to mark as read:", error);
            throw error;
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await markAllNotificationsAsRead();
            if (res.success) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                setUnreadCount(0);
            }
            return res;
        } catch (error) {
            console.error("Failed to mark all as read:", error);
            throw error;
        }
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n._id !== id));
    };

    const value = {
        socket,
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
