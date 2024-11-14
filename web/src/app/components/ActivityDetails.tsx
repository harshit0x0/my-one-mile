'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteActivity, getActivity } from '../actions';
import Link from 'next/link';
import { UserType } from '@/src/models/users';
import Image from 'next/image'
import profileIcon from '@/src/public/profile-icon.png'
import moment from 'moment';

interface Activity {
    activity_id: string;
    type_id: number;
    status_id: number;
    location: string;
    description: string;
    title: string;
    createdBy: string;
    createdAt: Date;
    User: any;
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
                console.log(activity);
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
            <div className="bg-secondary rounded-lg shadow-lg p-4 md:p-6 transition duration-300 ease-in-out hover:shadow-xl">

                {/* title and image  */}
                <div className='flex justify-between '>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-secondary_accent">{activity.title}</h1>
                    <div className="flex-shrink-0 flex-grow-0 text-center">
                        <div className='relative w-10 h-10 mx-auto'>
                            <Image
                                // @ts-ignore
                                src={activity?.User?.Image?.url || profileIcon}
                                fill
                                alt="profile-picture"
                                className="rounded-full m-auto cover"
                            />
                        </div>
                        {/* @ts-ignore */}
                        <p className="text-xs mx-auto font-semibold">{activity.User.name}</p>
                    </div>
                </div>

                {/* tags  */}
                <div className="mb-4">
                    <span className={`px-2 py-1 rounded text-sm text-white ${getStatusColor(activity.status_id)}`}>
                        {getStatusString(activity.status_id)}
                    </span>
                    <span className="ml-2 text-sm px-2 py-1 text-text rounded bg-background">{getTypeString(activity.type_id)}</span>
                </div>

                {/* body  */}
                <p className="mb-4 text-text bg-secondary px-2 py-5 md:px-5 rounded text-sm">{activity.description}</p>
                <p className='font-bold text-sm my-auto md:text-md'><i className="fa-solid fa-location-dot"></i> {activity.location}</p>

                {/* @ts-ignore */}
                <p className="mx-2 mt-2 italic text-sm text-text"> Created {moment(activity.createdAt).fromNow()}</p>

                {
                    (user?.id === activity.createdBy || user?.badge == "Admin") && (
                        <>
                            <Link href={`/activity/${activity.activity_id}/edit`} className='text-primary hover:underline'> Edit Activity </Link>
                            <button onClick={handleDelete} className="bg-primary text-white lg:px-4 mx-3 mt-4 py-2 rounded hover:bg-opacity-90 transition duration-200">
                                Delete Activity
                            </button>
                        </>
                    )
                }
            </div >
            <button
                onClick={() => router.push('/activity')}
                className="bg-primary text-white px-4 mt-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
            >
                Back to All Activities
            </button>
        </>
    );
}
