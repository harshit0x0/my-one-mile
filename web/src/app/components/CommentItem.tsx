'use client'

import { useState } from 'react';
import AddComment from './AddComment';
interface Comment {
    comment_id: string;
    data: string;
    likes: number;
    created_by: string;
    replies?: Comment[];
}


export default function CommentItem({ comment }: { comment: Comment }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="space-y-2 ml-4">
            {/* Comment Display */}
            <div className="p-2 border border-secondary rounded bg-purple-300 text-text transition-all duration-200">
                <div className="flex items-center">
                    <button
                        onClick={toggleCollapse}
                        className="text-secondary mr-4 bg-gray-400 px-1 w-8 py-0 rounded rounded-full text-4xl hover:opacity-80"
                    >
                        {isCollapsed ? '+' : '-'}
                    </button>
                    <div className='flex justify-between w-full'>
                        <p className="my-auto">{comment.data}</p>
                        <div className='flex'>
                            <button className='hover:underline h-8 mx-4 bg-secondary text-sm px-3'>reply</button>
                            <div>

                                <button className='bg-primary text-sm px-3 py-1'>Like</button>
                                <p className="text-xs text-text">Likes: {comment.likes}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="ml-12">
                    <AddComment existingComment={comment} onAddComment={() => { }} onEditComment={() => { }} onDeleteComment={() => { }} />
                </div>
            </div>

            {/* Nested Replies */}
            {!isCollapsed && comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 border-l border-secondary pl-4">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.comment_id} comment={reply} />
                    ))}
                </div>
            )}

            {/* Add Comment */}

        </div>
    );
};
