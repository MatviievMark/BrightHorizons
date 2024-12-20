// resources/js/Components/Notifications.tsx

import React from 'react';
import { Check } from 'lucide-react';
import Notification from './Notification';
import { useNotifications } from '../Context/NotificationsContext';

interface NotificationsProps {
  selectedTab: string;
}

export default function Notifications({ selectedTab }: NotificationsProps) {
  const { notifications, markAsRead, deleteNotification } = useNotifications();

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === 'Unread') {
      return !notification.read_at;
    } else {
      return true;
    }
  });

  return (
    <div className="space-y-4">
      {filteredNotifications.length ? (
        filteredNotifications.map((notification) => (
          <Notification
            key={notification.id}
            notificationId={notification.id}
            body={notification.data.message}
            created={notification.created_at}
            read={notification.read_at}
            onDelete={deleteNotification}
            onToggleRead={markAsRead}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Check size={24} className="text-blue-500" />
          </div>
          <p className="font-semibold">
            Nothing here.<br />
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
}