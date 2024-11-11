'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/src/models/users';
import { ActivityModel } from '@/src/models/activity'; // Ensure you have these types defined
import { deletePost, getPost } from '../actions';
import Link from 'next/link';
import { likePost } from '../actions';
import CommentBox from './Comment_box';

interface PostType {
    post_id: string;
    title: string;
    data: string;
    likes: number;
    activity: ActivityModel;
    Activity: null;
    createdAt: Date;
    updatedAt: Date;
    status_id: number;
    user: UserType;
}

function getStatusString(status_id: number): string {
    const statuses = ['Pending', 'Approved', 'Rejected'];
    return statuses[status_id - 1] || 'Unknown';
}

function getStatusColor(status_id: number): string {
    const colors = ['bg-yellow-500', 'bg-green-500', 'bg-red-500'];
    return colors[status_id - 1] || 'bg-gray-500';
}

export default function PostDetails({ id, user }: { id: string, user: UserType | null }) {
    const [post, setPost] = useState<PostType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            try {
                // Replace this with your actual API call
                const data = await getPost(id);
                if (!data) {
                    throw new Error('Failed to fetch post');
                }
                const post = await JSON.parse(data);
                console.log(post);
                setPost(post);
            } catch (err) {
                setError('Failed to load post. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, []);

    const handleLike = async () => {
        try {
            const data = await likePost(id);
            if (data) {
                const updatedPost = JSON.parse(data) as PostType;
                // @ts-ignore
                setPost(prevPost => ({ ...prevPost, likes: updatedPost.likes }));
                router.refresh();
            } else {
                alert('Failed to like post');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to like post');
        }
    };

    async function handleDelete() {
        try {
            // Replace this with your actual API call
            const response = await deletePost(id);
            if (!response) {
                throw new Error('Failed to delete post');
            }
            router.push('/posts');
        } catch (err) {
            setError('Failed to delete post. Please try again later.');
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <>
            <div className="bg-secondary rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl">
                <div className='flex justify-between'>
                    <div>
                        {/* @ts-ignore */}
                        <p className='font-bold mb-2'>{post.activity.Location.block}</p>
                        <h1 className="text-3xl font-bold mb-4 text-primary">{post.title}</h1>
                        <div className="mb-4">
                            <span className={`px-2 py-1 rounded text-sm text-white ${getStatusColor(post.status_id)}`}>
                                {getStatusString(post.status_id)}
                            </span>
                        </div>
                        <p className="mb-4 text-text">{post.data}</p>
                        <p className="mb-4 text-text"><strong>Related Activity: </strong>
                            <Link className='text-primary hover:underline' href={`/activity/${post.activity.activity_id}`}>{post.activity.title}</Link>
                        </p>
                        {/* @ts-ignore */}
                        <p className="mb-4 text-sm text-text">Created by {post.User.name} on {new Date(post.createdAt).toLocaleDateString()}</p>
                        {post.updatedAt !== post.createdAt && (
                            <p className="mb-4 text-sm text-text">Updated on {new Date(post.updatedAt).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div className="max-w-20 text-center">
                        <img
                            // @ts-ignore
                            src={post.User.Image.url}
                            alt="profile-picture"
                            className="rounded-full mx-auto h-10 w-10 max-h-10 "
                        />
                        {/* @ts-ignore */}
                        <p className="mb-4 text-sm font-semibold">{post.User.name}</p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <button
                            onClick={handleLike}
                            className="bg-background text-text px-4 py-2 rounded hover:bg-opacity-90 transition duration-200 ml-2 hover:scale-105 "
                        >
                            Like
                        </button>
                        <span className="ml-2 text-sm  px-4 py-2 text-text bg-primary">Likes: {post.likes}</span>
                    </div>
                    <div>
                        {
                            // @ts-ignore
                            (user && user.id === post.User.id || user?.badge == "Admin") && (<>
                                <Link href={`/posts/${post.post_id}/edit`} className='text-primary hover:underline'> Edit post </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-background text-text px-4 py-2 rounded hover:bg-opacity-90 transition duration-200 ml-2 hover:scale-105 "
                                >
                                    Delete
                                </button>
                            </>)
                        }

                    </div>

                </div>
            </div >
            <button
                onClick={() => router.push('/posts')}
                className="bg-primary text-white px-4 mt-4 mb-6 py-2 rounded hover:bg-opacity-90 transition duration-200"
            >
                Back to All Posts
            </button>
            <CommentBox post_id={post.post_id} refreshKey={Date.now()} user={user} />
        </>
    );
}