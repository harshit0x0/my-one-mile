'use client'

import { useState, useEffect } from 'react';
import { getCommentsByPostId, updateComment, deleteComment, revalidateGivenPath } from '../actions';
import AddComment from './AddComment';
import CommentItem from './CommentItem';
import { useRouter, usePathname } from 'next/navigation';
import { UserType } from '@/src/models/users';

interface Comment {
    comment_id: string;
    data: string;
    likes: number;
    reply_id: string | null;
    created_by: string;
    replies?: Comment[];
}


const CommentBox = ({ post_id, refreshKey, user }: { post_id: string, refreshKey: number, user: UserType | null }) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        async function fetchComments() {
            console.log("loading comments");
            const response = await getCommentsByPostId(post_id);
            if (!response) {
                return;
            }
            let data = JSON.parse(response);
            console.log("comments", data);
            if (!data) {
                return;
            }
            setComments(data);
        }
        fetchComments();
    }, [])

    async function onAddComment(data: string, reply_id: string | null) {
        //create the comment and save to the database
        console.log("adding comment: " + data);
        const res = await fetch('/api/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, reply_id, post_id }),
        })
        if (!res.ok) {
            alert("Failed to add comment");
            console.log(await res.text());
            return;
        }
        const response = await res.json();
        console.log(response);
        if (!response) {
            alert("Failed to add comment");
        }
        else {
            alert("added comment");
            console.log("path: ", pathname);
            await revalidateGivenPath('/posts/[id]');
            router.push('/posts/' + post_id + '?refresh=' + Date.now());
        }
        if (!reply_id) setComments((prevComments) => [...prevComments, response]);
    }

    async function onDeleteComment(comment_id: string) {
        //delete the comment from the database
        console.log("deleting comment: ", comment_id);
        const response = await deleteComment(comment_id);
        if (!response) {
            alert("Failed to delete comment");
        } else {
            alert("deleted Comment");
            setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id));
        }
    }

    async function onEditComment(comment_id: string, text: string) {
        //update the comment in the database
        console.log("updating comment: " + text + " " + comment_id);
        const response = await updateComment(text, comment_id);
        if (!response) {
            alert("Failed to edit comment");
        } else {
            alert("updated comment");
            console.log(pathname);
        }

    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Comments</h2>
            <div className='px-3 py-1 text-white  rounded'>
                <AddComment
                    onAddComment={onAddComment}
                    onEditComment={onEditComment}
                    onDeleteComment={onDeleteComment}
                />
            </div>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.comment_id}
                        comment={comment}
                        user={user ?? null}
                        onAddComment={onAddComment}
                        onEditComment={onEditComment}
                        onDeleteComment={onDeleteComment}
                    />
                ))
            )}
        </div>
    );
};

export default CommentBox;
