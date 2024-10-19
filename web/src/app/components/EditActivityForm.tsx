'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getActivity, updateActivity } from '../actions';

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

const activityTypes = [
    { id: 1, name: 'Issue' },
    { id: 2, name: 'Appreciation' },
    { id: 3, name: 'Emergency' }
];

const activityStatuses = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Resolved' },
    { id: 3, name: 'Ignored' }
];

export default function EditActivityForm({ id }: { id: string }) {
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchActivity() {
            try {
                const data = await getActivity(id);
                if (!data) {
                    throw new Error('Failed to fetch activity');
                }
                const activity = JSON.parse(data);
                console.log("activity", activity);
                setActivity(activity);
            } catch (err) {
                setError('Failed to load activity. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchActivity();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setActivity(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activity) return;

        try {
            const response = await updateActivity(id, activity);
            if (!response) {
                throw new Error('Failed to update activity');
            }
            router.push(`/activity/${id}`);
        } catch (err) {
            setError('Failed to update activity. Please try again.');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!activity) return <p>No activity found</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={activity.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                    required
                />
            </div>
            <div>
                <label htmlFor="type_id" className="block text-sm font-medium mb-1">Activity Type</label>
                <select
                    id="type_id"
                    name="type_id"
                    value={activity.type_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                >
                    {activityTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="status_id" className="block text-sm font-medium mb-1">Status</label>
                <select
                    id="status_id"
                    name="status_id"
                    value={activity.status_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                >
                    {activityStatuses.map(status => (
                        <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                <input
                    disabled
                    type="text"
                    id="location"
                    name="location"
                    value={activity.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-secondary rounded bg-gray-400 text-text
                     focus:ring-2 focus:ring-primayr focus:border-transparent
                     transition duration-200 ease-in-out transform hover:border-red-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={activity.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                    required
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                >
                    Update Activity
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-secondary text-text px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}