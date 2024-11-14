'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, getCity } from '@/src/app/actions';
import Link from 'next/link';
import LoadingRing from '../../components/LoadingRing';
import Alert from '../../components/Alert';


interface ActivityFormData {
    type_id: number;
    status_id: number;
    location: string;
    description: string;
    title: string;
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

const CreateActivityPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<ActivityFormData>({
        type_id: 1,
        status_id: 1,
        location: '',
        description: '',
        title: ''
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<{ type: string, text: string }>({ type: '', text: '' });

    useEffect(() => {
        const fetchLocation = async () => {
            console.log("fetching location....")
            let user = await getUser();
            let location = await getCity(user?.location ?? '');
            setFormData(prev => ({ ...prev, location: location ?? '' }));
        };
        const userData = localStorage.getItem('user');
        if (userData) {
            const location = JSON.parse(userData).location;
            setFormData(prev => ({ ...prev, location: location ?? '' }));
        }
        else fetchLocation();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        // Validate form data
        if (!formData.description || !formData.status_id || !formData.type_id || !formData.title || !formData.location) {
            setAlert({ type: 'warning', text: 'All fields are required' });
            return;
        }

        // Send the form data to the server
        const res = await fetch('/api/activity/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        console.log('Submitting:', formData);

        if (res.ok) {
            // Prompt user if they want to create a post
            setAlert({ type: 'success', text: 'Activity created successfully' });
            const createPost = window.confirm("Do you want to create a post for this activity so others can talk about it?");

            if (createPost) {
                // Redirect to post/new with prefilled data
                router.push(`/posts/new?title=${formData.title}&activity_id=${(await res.json()).activity_id}`);
            } else {
                router.push('/activity');
            }
        } else {
            setAlert({ type: 'error', text: res.statusText });
        }

        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">Create New Activity</h1>
            {alert.text !== '' && <Alert type={alert.type as any} message={alert.text} onClose={() => setAlert({ type: '', text: '' })} />}
            {!formData.location &&
                <span className="text-red-400 rounded-md italic bg-red-200 pl-3 py-2">You need to set your location before creating an activity.
                    <Link href='/profile/' className='px-2 py-2 text-red-500 ml-3 bg-red-300 underline'>Set Location</Link>
                </span>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* location */}
                {
                    formData.location &&
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                        <input
                            disabled
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-background_accent text-text
                                   focus:ring-2 focus:ring-primary focus:border-transparent
                                   transition duration-200 ease-in-out transform hover:scale-101"
                            required
                        />
                    </div>

                }
                {/* Activity type */}
                <div>
                    <label htmlFor="type_id" className="block text-sm font-medium mb-1">Activity Type</label>
                    <select
                        id="type_id"
                        name="type_id"
                        value={formData.type_id}
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
                {/* status */}
                <div>
                    <label htmlFor="status_id" className="block text-sm font-medium mb-1">Status</label>
                    <select
                        id="status_id"
                        name="status_id"
                        value={formData.status_id}
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
                {/* title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-secondary rounded bg-background text-text
                                   focus:ring-2 focus:ring-primary focus:border-transparent
                                   transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                        required
                    ></input>
                </div>
                {/* description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 border border-secondary rounded bg-background text-text
                                   focus:ring-2 focus:ring-primary focus:border-transparent
                                   transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded
                               hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                               transition duration-200 ease-in-out transform hover:scale-102"
                >
                    {!isLoading && <>Create Activity</>}
                    {isLoading && <LoadingRing />}
                </button>
            </form>
        </div>
    );
};

export default CreateActivityPage;
