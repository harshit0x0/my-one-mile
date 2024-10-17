import Link from 'next/link';
import React from 'react';

interface PostItemProps {
    post: any;
}

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];


const PostItem: React.FC<PostItemProps> = ({ post }) => {
    return (
        <div className="mb-6 p-4 bg-secondary rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-text">{post.data}</p>
            <p className="text-text-500">{post.activity.Location.city}</p>
            <span className="text-text-500 px-3 py-2 my-3 bg-background">{activityTypes[post.activity.type_id - 1]}</span>
            <span className="text-text-500 px-3 py-2 my-3 bg-background">{activityStatuses[post.activity.status_id - 1]}</span>
            <span className="text-text-500 px-3 py-2 my-3 bg-background">by <Link href={`/profile/${post.activity.User.id}`}>{post.activity.User.name}</Link> </span>
        </div>
    );
};

export default PostItem;