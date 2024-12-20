// resources/js/Components/NotificationsDrawer.tsx

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronRight } from 'lucide-react';
import Notifications from './Notifications';
import { useNotifications } from '../Context/NotificationsContext';
import { BellIcon } from '@heroicons/react/24/outline';

interface NotificationsDrawerProps {
  children?: React.ReactNode;
}

export default function NotificationsDrawer({ children }: NotificationsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const { unreadCount } = useNotifications();

  const tabs = [{ text: 'All' }, { text: 'Unread' }, ];

  const handleTabChange = (tabText: string) => {
    setSelectedTab(tabText);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative">
        <BellIcon className="h-6 w-6 text-gray-600" /> 
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      <Transition
        show={isOpen}
        enter="transition-transform duration-200"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed z-20 right-0 top-16 h-[calc(100vh-4rem)] w-full max-w-md overflow-auto bg-white shadow-xl">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close notifications"
              >
                <ChevronRight size="24" />
              </button>
            </div>
            <ul className="flex space-x-4 mt-4">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleTabChange(tab.text)}
                  className={`cursor-pointer pb-2 ${
                    selectedTab === tab.text
                      ? 'border-b-2 border-blue-500'
                      : ''
                  }`}
                >
                  {tab.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <Notifications selectedTab={selectedTab} />
          </div>
        </div>
      </Transition>
    </>
  );
}