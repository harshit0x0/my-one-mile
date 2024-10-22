'use client'

import { useState } from 'react';
import AddComment from './AddComment';
interface Comment {
    comment_id: string;
    data: string;
    likes: number;
    created_by: string;
    reply_id: string | null;
    replies?: Comment[];
}

interface CommentProps {
    comment: Comment;
    onAddComment: (data: string, reply_id: string | null) => void;
    onEditComment: (comment_id: string, text: string) => void;
    onDeleteComment: (comment_id: string) => void;
}

export default function CommentItem({ comment, onAddComment, onEditComment, onDeleteComment }: CommentProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isReplyingComment, setIsReplyingComment] = useState(false);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const toggleEditingComment = () => setIsEditingComment(!isEditingComment);
    const toggleReplyingComment = () => setIsReplyingComment(!isReplyingComment);

    return (
        <div className="space-y-2 ml-4">
            {/* Comment Display */}
            <div className="p-2 border border-secondary rounded bg-purple-300 text-text transition-all duration-200">
                <div className="flex items-center">
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-col w-full'>
                            <div className='flex'>
                                <button
                                    onClick={toggleCollapse}
                                    className="text-secondary mr-4 bg-gray-400 px-1 w-8 py-0 rounded rounded-full text-4xl hover:opacity-80"
                                >
                                    {isCollapsed ? '+' : '-'}
                                </button>
                                <p className="my-auto">{comment.data}</p>

                            </div>
                            <div className='ml-8 space-x-3 w-full flex'>
                                {/* edit comment */}
                                {!isReplyingComment &&
                                    <AddComment
                                        isEditing={true}
                                        toggleEditingComment={toggleEditingComment}
                                        existingComment={comment}
                                        onAddComment={onAddComment}
                                        onEditComment={onEditComment}
                                        onDeleteComment={onDeleteComment}
                                    />}
                                {/* reply */}
                                {!isEditingComment &&
                                    <AddComment
                                        isEditing={false}
                                        toggleReplyingComment={toggleReplyingComment}
                                        existingComment={comment}
                                        onAddComment={onAddComment}
                                        onEditComment={onEditComment}
                                        onDeleteComment={onDeleteComment}
                                    />}
                            </div>
                        </div>
                        <div className='flex flex-col my-auto space-y-2'>
                            <button className='bg-primary text-sm px-3 py-1'>Like</button>
                            <span className="text-xs text-text">Likes: {comment.likes}</span>
                        </div>
                    </div>

                </div>


            </div>

            {/* Nested Replies */}
            {!isCollapsed && comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 border-l space-y-2 border-secondary pl-4">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.comment_id}
                            comment={reply}
                            onAddComment={onAddComment}
                            onEditComment={onEditComment}
                            onDeleteComment={onDeleteComment}
                        />
                    ))}
                </div>
            )}

            {/* Add Comment */}

        </div>
    );
};
