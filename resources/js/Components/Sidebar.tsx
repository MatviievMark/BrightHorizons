import React from 'react';
import { Link } from '@inertiajs/react';
import { Home, Layers, Users, FileText, BugPlay, Calendar } from 'lucide-react';

interface SidebarProps {
    user: {
        name: string;
        role: string;
    };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Option 1', href: '/option1', icon: Layers },
        { name: 'Option 2', href: '/option2', icon: Users },
        { name: 'Bug Report', href: '/bugs', icon: BugPlay },
        { name: 'Calendar', href: '/calendar', icon: Calendar },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white p-4 overflow-y-auto border-r border-gray-200 flex flex-col">
            <nav className="mb-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center mt-4 py-2 px-6 text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded-lg"
                    >
                        <item.icon className="h-6 w-6 mr-3" />
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="mt-auto pt-4">
                <p className="text-gray-600">Logged in as: {user.name}</p>
                <p className="text-gray-600">Role: {user.role}</p>
            </div>
        </aside>
    );
};

export default Sidebar;