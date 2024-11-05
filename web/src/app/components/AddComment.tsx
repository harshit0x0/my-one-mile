'use client'
import { useState } from 'react';

// Mocking Comment type
interface Comment {
    comment_id: string;
    data: string;
    likes: number;
    created_by: string;
    reply_id: string | null;
}

interface AddCommentProps {
    onAddComment: (data: string, reply_id: string | null) => void;
    onEditComment: (comment_id: string, text: string) => void;
    onDeleteComment: (comment_id: string) => void;
    existingComment?: Comment;
    isEditing?: boolean;
    toggleEditingComment?: () => void;
    toggleReplyingComment?: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onAddComment, onEditComment, onDeleteComment, existingComment, isEditing, toggleEditingComment, toggleReplyingComment }) => {
    const [commentText, setCommentText] = useState(existingComment && isEditing ? existingComment.data : '');
    // const [isEditing, setIsEditing] = useState(!!existingComment);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        if (isEditing && existingComment) {
            console.log("commentText: ", commentText, " existingComment: ", existingComment);
            onEditComment(existingComment.comment_id, commentText);
            console.log("done");
        } else {
            if (existingComment) {
                onAddComment(commentText, existingComment.comment_id);
            }
            else onAddComment(commentText, null);
        }
        setIsDialogOpen(false);
        setCommentText('');
        // setIsEditing(false);
    };

    const handleDelete = () => {
        if (existingComment) {
            onDeleteComment(existingComment.comment_id);
        }
    };

    function handleDialogToggle() {
        toggleEditingComment ? toggleEditingComment() : (toggleReplyingComment ? toggleReplyingComment() : null);
        setIsDialogOpen(!isDialogOpen);
    }

    return (
        <div className={'text-text space-y-4 ' + (isDialogOpen ? 'w-5/6' : '')}>
            <h2 className="font-semibold text-text">
                <button className='font-xs underline' onClick={handleDialogToggle}>
                    {isEditing ? 'Edit' : existingComment ? 'reply' : 'Add Comment'}
                </button>
            </h2>
            {<form onSubmit={handleSubmit} className={`space-y-4 ${isDialogOpen ? '' : 'hidden'} transition duration-300`}>
                <div>
                    <label htmlFor="commentText" className="block text-sm font-medium mb-1">Your Comment</label>
                    <textarea
                        id="commentText"
                        name="commentText"
                        value={commentText}
                        onChange={handleInputChange}
                        rows={1}
                        className="w-full p-1 px-2 border border-secondary rounded bg-background text-text
                        focus:ring-2 focus:ring-primary focus:border-transparent
                        transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                        required
                    ></textarea>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                    >
                        {isEditing ? 'Update Comment' : 'Add Comment'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                        >
                            Delete Comment
                        </button>
                    )}
                </div>
            </form>}
        </div>
    );
};

export default AddComment;
