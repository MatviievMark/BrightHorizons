import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Notification {
  id: string;
  type: string;
  data: any;
  read_at: string | null;
  created_at: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/notifications');
      console.log('Fetched notifications:', response.data);
      setNotifications(response.data);
      setUnreadCount(response.data.filter((notif: Notification) => !notif.read_at).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.post(`/notifications/${id}/read`);
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read_at: new Date().toISOString() } : notification
        )
      );
      setUnreadCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`/notifications/${id}`);
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== id)
      );
      // Update unread count if the deleted notification was unread
      setUnreadCount(prevCount => {
        const deletedNotif = notifications.find(notif => notif.id === id);
        return deletedNotif && !deletedNotif.read_at ? prevCount - 1 : prevCount;
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 60000); // Fetch every minute
    return () => clearInterval(intervalId);
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, fetchNotifications, markAsRead, deleteNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};