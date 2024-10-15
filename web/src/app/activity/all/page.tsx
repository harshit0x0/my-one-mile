'use client'
import React, { useState, useEffect } from 'react';
import { ActivityModel } from '@/src/models/activity';

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];

const ActivityItem: React.FC<{ activity: ActivityModel }> = ({ activity }) => {
    const getStatusColor = (status: number): string => {
        switch (status) {
            case 1: return 'bg-yellow-500';
            case 2: return 'bg-green-500';
            case 3: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="mb-4 p-4 bg-secondary rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-101">
            <h3 className="text-lg font-semibold text-primary mb-2">{activity.title}</h3>
            <p className="text-text mb-2">Location: {activity.location}</p>
            <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(activity.status_id)}`}>
                    {activityStatuses[activity.status_id - 1]}
                </span>
                <span className="text-sm text-secondary_accent">{activityTypes[activity.type_id - 1]}</span>
            </div>
        </div>
    );
};

const AllActivitiesPage: React.FC = () => {
    const [activities, setActivities] = useState<ActivityModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [filteredActivities, setFilteredActivities] = useState<ActivityModel[]>([]);

    useEffect(() => {
        // Simulating API call to fetch activities
        const fetchActivities = async () => {
            // Replace this with actual API call
            const mockActivities: ActivityModel[] = [
                { activity_id: "1", type_id: 1, status_id: 1, location: "Delhi", title: "Traffic congestion due to construction", description: "", createdBy: "user1", createdAt: new Date(), type: "issue", status: "pending" },
                { activity_id: "2", type_id: 3, status_id: 1, location: "Mumbai", title: "Flood warning issued", description: "", createdBy: "user2", createdAt: new Date(), type: "emergency", status: "pending" },
                { activity_id: "3", type_id: 2, status_id: 2, location: "Bangalore", title: "New park opened in city center", description: "", createdBy: "user3", createdAt: new Date(), type: "appreciation", status: "resolved" },
                { activity_id: "4", type_id: 1, status_id: 3, location: "Chennai", title: "Repeated power outages in suburban area", description: "", createdBy: "user4", createdAt: new Date(), type: "issue", status: "ignored" },
            ];
            setActivities(mockActivities);
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
        <div className="max-w-4xl mx-auto p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">All Activities</h1>

            <div className="mb-6 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-secondary rounded bg-background text-text
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               transition duration-200 ease-in-out transform hover:scale-101"
                />
                <input
                    type="text"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="flex-1 p-2 border border-secondary rounded bg-background text-text
                               focus:ring-2 focus:ring-primary focus:border-transparent
                               transition duration-200 ease-in-out transform hover:scale-101"
                />
            </div>

            <div>
                {filteredActivities.length === 0 ? (
                    <p className="text-center text-gray-500">No activities found.</p>
                ) : (
                    filteredActivities.map(activity => (
                        <ActivityItem key={activity.activity_id} activity={activity} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllActivitiesPage;   