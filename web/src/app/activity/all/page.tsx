'use client'
import React, { useState, useEffect } from 'react';
import { ActivityModel } from '@/src/models/activity';
import ActivityItem from '../../components/ActivityItem';
import { getActivities } from '@/src/app/actions';
import Link from 'next/link';

const AllActivitiesPage: React.FC = () => {

    const [activities, setActivities] = useState<ActivityModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [filteredActivities, setFilteredActivities] = useState<ActivityModel[]>([]);

    useEffect(() => {

        const fetchActivities = async () => {
            const tempActivities = await getActivities();
            if (!tempActivities) return;
            const data = await JSON.parse(tempActivities) as ActivityModel[];
            console.log("all activities: ", data);
            setActivities(data ?? []);
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        const filtered = activities.filter(activity =>
            (activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            activity.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
        setFilteredActivities(filtered);
    }, [activities, searchTerm, locationFilter]);

    return (
        <div className="max-w-4xl mx-auto px-1  md:px-4 py-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 mx-2 md:mx-0 text-text">All Activities</h1>

            <div className="mb-6 md:flex flex-col md:flex-row items-center md:space-x-4">
                <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 mx-2 my-1 p-2 border border-secondary rounded bg-background text-text
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               transition duration-200 ease-in-out transform hover:scale-101"
                />
                <input
                    type="text"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="flex-1 mx-2 my-1 p-2 border border-secondary rounded bg-background text-text
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               transition duration-200 ease-in-out transform hover:scale-101"
                />
            </div>

            <div>
                {filteredActivities.length === 0 ? (
                    <p className="text-center text-gray-500">No activities found.</p>
                ) : (
                    filteredActivities.map(activity => (
                        <Link key={activity.activity_id} href={`/activity/${activity.activity_id}`}>
                            <ActivityItem key={activity.activity_id} activity={activity} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllActivitiesPage;   