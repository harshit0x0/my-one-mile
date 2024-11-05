'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteActivity, getActivity } from '../actions';
import Link from 'next/link';
import { UserType } from '@/src/models/users';

interface Activity {
    activity_id: string;
    type_id: number;
    status_id: number;
    location: string;
    description: string;
    title: string;
    createdBy: string;
    createdAt: Date;
}

function getTypeString(type_id: number): string {
    const types = ['Issue', 'Appreciation', 'Emergency'];
    return types[type_id - 1] || 'Unknown';
}

function getStatusString(status_id: number): string {
    const statuses = ['Pending', 'Resolved', 'Ignored'];
    return statuses[status_id - 1] || 'Unknown';
}

function getStatusColor(status_id: number): string {
    const colors = ['bg-yellow-500', 'bg-green-500', 'bg-red-500'];
    return colors[status_id - 1] || 'bg-gray-500';
}

export default function ActivityDetails({ id, user }: { id: string, user: UserType | null }) {
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchActivity() {
            try {
                // Replace this with your actual API call
                const data = await getActivity(id);
                if (!data) {
                    throw new Error('Failed to fetch activity');
                }
                const activity = JSON.parse(data);
                setActivity(activity);
                console.log(user);
            } catch (err) {
                setError('Failed to load activity. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchActivity();
    }, [id]);


    async function handleDelete() {
        try {
            // Replace this with your actual API call
            const response = await deleteActivity(id);
            if (!response) {
                throw new Error('Failed to delete activity');
            }
            router.push('/activity');
        } catch (err) {
            setError('Failed to delete activity. Please try again later.');
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!activity) return <p>No activity found</p>;

    return (
        <>
            <div className="bg-secondary rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl">
                <h1 className="text-3xl font-bold mb-4 text-primary">{activity.title}</h1>
                <div className="mb-4">
                    <span className={`px-2 py-1 rounded text-sm text-white ${getStatusColor(activity.status_id)}`}>
                        {getStatusString(activity.status_id)}
                    </span>
                    <span className="ml-2 text-sm text-secondary_accent">{getTypeString(activity.type_id)}</span>
                </div>
                <p className="mb-4 text-text">{activity.description}</p>
                <p className="mb-4 text-text"><strong>Location:</strong> {activity.location}</p>
                {/* @ts-ignore */}
                <p className="mb-4 text-sm text-text">Created by {activity.User.name} on {new Date(activity.createdAt).toLocaleDateString()}</p>
                {
                    (user?.id === activity.createdBy || user?.badge == "Admin") && (
                        <>
                            <Link href={`/activity/${activity.activity_id}/edit`} className='text-primary hover:underline'> Edit Activity </Link>
                            <button onClick={handleDelete} className="bg-primary text-white px-4 mt-4 py-2 rounded hover:bg-opacity-90 transition duration-200">
                                Delete Activity
                            </button>
                        </>
                    )
                }
            </div>
            <button
                onClick={() => router.push('/activity')}
                className="bg-primary text-white px-4 mt-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
            >
                Back to All Activities
            </button>
        </>
    );
}
