import React from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            {/* Optional header, not needed but why not leave it here commented */}
            {/* <Head title="Dashboard" /> */}

            <div className="flex h-screen bg-gray-100">
                
                <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <main className="p-6">
                        <h1 className="text-3xl font-semibold mb-4">Welcome to Your Dashboard</h1>
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <p className="text-gray-600">You're logged in! This is your main dashboard area.</p>
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}