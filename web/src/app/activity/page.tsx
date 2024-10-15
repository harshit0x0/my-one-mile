import React from 'react';
import Link from 'next/link';

interface ActivityModel {
    activity_id: string;
    type_id: number;
    status_id: number;
    location: string;
    title: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
}

type ActivityType = 'issue' | 'appreciation' | 'emergency';
type ActivityStatus = 'pending' | 'resolved' | 'ignored';

interface ActivityItemProps {
    activity: ActivityModel;
    type: ActivityType;
    status: ActivityStatus;
}

const getStatusColor = (status: ActivityStatus): string => {
    switch (status) {
        case 'pending': return 'bg-yellow-500';
        case 'resolved': return 'bg-green-500';
        case 'ignored': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};

const ActivityItem = ({ activity, type, status }: ActivityItemProps) => (
    <div className="mb-2 p-3 flex justify-between rounded-lg bg-secondary text-text hover:transform hover:scale-105 transition duration-200">
        <h3 className="font-semibold">{activity.title}</h3>
        <div className="flex space-x-4">
            <span className="text-sm text-text ">{type}</span>
            <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(status)} text-white mr-2`}>
                {status}
            </span>
        </div>
    </div>
);

const ActivityHomepage: React.FC = () => {
    const recentActivities: (ActivityModel & { type: ActivityType, status: ActivityStatus })[] = [
        {
            activity_id: "1",
            type_id: 1,
            status_id: 1,
            location: "Delhi",
            title: "Obstruction of traffic due to road damage",
            description: "Obstruction of traffic due to road damage",
            createdBy: "user1",
            createdAt: new Date(),
            type: "issue",
            status: "pending"
        },
        {
            activity_id: "2",
            type_id: 2,
            status_id: 1,
            location: "Jammu",
            title: "Traffic congestion due to construction",
            description: "Damage due to large landslides",
            createdBy: "user2",
            createdAt: new Date(),
            type: "emergency",
            status: "pending"
        },
        {
            activity_id: "3",
            type_id: 1,
            status_id: 2,
            location: "Uttrakhand",
            title: "Cleaning of lakes initiated by government",
            description: "Cleaning of lakes initiated by government",
            createdBy: "user3",
            createdAt: new Date(),
            type: "appreciation",
            status: "resolved"
        },
    ];

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
                    <ActivityItem key={activity.activity_id} activity={activity} type={activity.type} status={activity.status} />
                ))}
            </div>
        </div>
    );
};

export default ActivityHomepage;