'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ActivityItem from '../components/ActivityItem';
import { getRecentActivities } from '../actions';
import { ActivityModel } from '@/src/models/activity';

const ActivityHomepage: React.FC = () => {

    const [recentActivities, setRecentActivities] = useState<ActivityModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            const activities = await getRecentActivities();
            if (!activities) return;
            const data = await JSON.parse(activities) as ActivityModel[];
            setRecentActivities(data);
            setLoading(false);
        };
        fetchActivities();
    }, []);

    return (
        <div className="max-w-5xl my-auto mx-auto min-h-screen py-6 px-2 md:px-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-4 text-text">Activities</h1>
            <div className="mb-4 bg-background shadow-2xl lg:ml-7 px-2 md:px-4 py-5 rounded-lg">
                Activities are issues that people take charge of solving. This involves reporting to concerned authorities, providing relevant updates etc.
                These can also be fundraisers for an emergency.<br />
                <div className="p-2 md:p-4 rounded-lg my-6 bg-gradient-to-r from-secondary_accent to-secondary py-6">
                    <p className='text-background font-semibold  pb-5'>
                        Create an activity and become a King of your mile!
                    </p>
                    <div className="flex justify-between space-x-4 items-center">
                        <Link href="/activity/all" className="text-text bg-primary text-sm md:text-md  px-2 py-1 md:px-4 md:py-2 rounded font-semibold">
                            Browse all activities and issues
                        </Link>
                        <Link
                            href="/activity/new"
                            className="bg-green-500 font-semibold text-white text-sm md:text-md px-2 py-1 md:px-4 md:py-2 rounded hover:bg-opacity-90 transition hover:transform hover:scale-105 duration-200"
                        >
                            Create Activity
                        </Link>
                    </div>
                </div>
            </div>

            <div className='max-w-4xl md:ml-6 mt-5'>
                <h2 className="font-semibold my-4">Recent activity</h2>
                <div className='bg-background shadow-2xl text-text md:px-8 pt-8 pb-3 rounded-lg'>
                    {loading && <p>Loading...</p>}
                    {!loading && recentActivities.length === 0 && <p className='text-text'>No recent activities yet</p>}
                    {recentActivities.map((activity) => (
                        <Link key={activity.activity_id} href={`/activity/${activity.activity_id}`}>
                            <ActivityItem key={activity.activity_id} activity={activity} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityHomepage;