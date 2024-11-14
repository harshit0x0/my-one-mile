'use client'

import { useState } from 'react';
import AddComment from './AddComment';
import { UserType } from '@/src/models/users';
interface Comment {
    comment_id: string;
    data: string;
    likes: number;
    created_by: string;
    reply_id: string | null;
    replies?: Comment[];
    user: any;
}

interface CommentProps {
    comment: Comment;
    user: UserType | null;
    onAddComment: (data: string, reply_id: string | null) => void;
    onEditComment: (comment_id: string, text: string) => void;
    onDeleteComment: (comment_id: string) => void;
}

export default function CommentItem({ comment, onAddComment, onEditComment, onDeleteComment, user }: CommentProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isReplyingComment, setIsReplyingComment] = useState(false);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const toggleEditingComment = () => setIsEditingComment(!isEditingComment);
    const toggleReplyingComment = () => setIsReplyingComment(!isReplyingComment);

    return (
        <div className="space-y-2 ml-1 md:ml-4">
            {/* Comment Display */}
            <div className="px-2 border border-secondary rounded bg-secondary text-text transition-all duration-200">
                <div className='flex space-x-4 py-0 w-full'>

                    {/* profile-pic and collapse button */}
                    <div className='text-center my-2 pr-2 border-r-2 border-secondary'>
                        <div className="max-w-20 text-center">
                            <img
                                // @ts-ignore
                                src={comment.User.Image.url}
                                alt="profile-picture"
                                className="rounded-full mx-auto h-8 w-8 max-h-8 "
                            />
                            {/* @ts-ignore */}
                            <p className="text-xs text-background font-semibold">{comment.User.name}</p>
                        </div>
                        <button
                            onClick={toggleCollapse}
                            className="text-background max-h-10 px-3 font-bold  rounded-full hover:opacity-80"
                        >
                            {isCollapsed ? '+' : '-'}
                            {/* {isCollapsed ? '⬎' : '⬑'} */}
                        </button>
                    </div>

                    {/* comment and reply/edit  */}
                    <div className='w-full px-1 space-y-4 mb-0 relative'>
                        <div className='flex'>

                            <div className='flex w-full mt-4 pr-6 md:pr-12 justify-between'>
                                <div className="my-auto">{comment.data}</div>
                            </div>

                            {/* like  */}
                            <div className='flex flex-col absolute right-1 md:right-3 top-8 px-2 my-auto'>
                                <button className=''><i className="fa-regular fa-heart font-bold text-xl"></i></button>
                                <span className="text-xs text-text mx-auto">{comment.likes}</span>
                            </div>

                        </div>

                        <div className='space-x-3 w-full flex'>
                            {/* edit comment */}
                            {!isReplyingComment && (user?.id === comment.created_by || user?.badge === 'Admin') &&
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


                </div>
            </div>

            {/* Nested Replies */}
            {!isCollapsed && comment.replies && comment.replies.length > 0 && (
                <div className="ml-2 md:ml-4 border-l space-y-2 border-secondary pl-4">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.comment_id}
                            user={user}
                            comment={reply}
                            onAddComment={onAddComment}
                            onEditComment={onEditComment}
                            onDeleteComment={onDeleteComment}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};
