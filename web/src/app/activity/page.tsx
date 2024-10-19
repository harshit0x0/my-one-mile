'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ActivityItem from '../components/ActivityItem';
import { getRecentActivities } from '../actions';
import { ActivityModel } from '@/src/models/activity';

const ActivityHomepage: React.FC = () => {

    const [recentActivities, setRecentActivities] = useState<ActivityModel[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const activities = await getRecentActivities();
            if (!activities) return;
            const data = await JSON.parse(activities) as ActivityModel[];
            setRecentActivities(data);
        };
        fetchActivities();
    }, []);

    return (
        <div className="max-w-4xl mx-auto min-h-screen py-20 p-6 bg-violet-300 text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">Activities</h1>

            <div className="bg-secondary p-4 rounded-lg mb-6">
                <p className="mb-4">
                    Activities are issues that people take charge of solving. This involves reporting to concerned authorities, providing relevant updates etc.
                    These can also be fundraisers for an emergency.
                </p>
                <div className="flex justify-between items-center">
                    <Link href="/activity/all" className="text-primary hover:underline">
                        Browse activities and issues
                    </Link>
                    <Link
                        href="/activity/new"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition hover:transform hover:scale-105 duration-200"
                    >
                        CREATE ACTIVITY
                    </Link>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Recent activity</h2>
            <div>
                {recentActivities.map((activity) => (
                    <Link key={activity.activity_id} href={`/activity/${activity.activity_id}`}>
                        <ActivityItem key={activity.activity_id} activity={activity} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ActivityHomepage;