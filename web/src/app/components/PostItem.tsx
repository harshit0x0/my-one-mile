import Link from 'next/link';
import React from 'react';
import moment from 'moment'

interface PostItemProps {
    post: any;
}

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];
const getStatusColor = (status: number): string => {
    switch (status) {
        case 1: return 'bg-yellow-500';
        case 2: return 'bg-green-500';
        case 3: return 'bg-red-500';
        default: return 'bg-gray-500';
    }
};
const getActivityColor = (type: number): string => {
    switch (type) {
        case 1: return 'bg-red-500';
        case 2: return 'bg-green-500';
        case 3: return 'bg-red-500';
        default: return 'bg-gray-500';
    }
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    return (
        <div className="mb-6 p-4 bg-secondary rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:bg-secondary_accent">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-text mt-1 mb-2">{post.title}</h2>
                <div className="flex space-x-3 mb-3">
                    <span className={`px-2 py-1 my-auto  text-xs rounded-xl text-white ${getActivityColor(post.activity.type_id)}`}>
                        {activityTypes[post.activity.type_id - 1]}
                    </span>
                    <span className={`px-2 py-1 my-auto  rounded-xl text-xs text-white ${getStatusColor(post.activity.status_id)}`}>
                        {activityStatuses[post.activity.status_id - 1]}
                    </span>
                </div>
            </div>

            <p className="text-text_accent px-5 pr-8 pb-3 text-sm">{post.data.substring(0, 200)}...</p>

            <div className="flex justify-between mt-4">
                <p className="text-background_accent text-sm italic">
                    <i className="fa-solid fa-location-dot"></i> {post.activity.Location.city}
                </p>
                <div className="flex space-x-1 text-background_accent text-sm italic">
                    <span>by</span>
                    <Link href={`/profile/${post.User.id}`} className="font-semibold hover:underline">
                        {post.User.name}
                    </Link>
                    <span className="ml-2">{moment(post.activity.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>

    );
};

export default PostItem;