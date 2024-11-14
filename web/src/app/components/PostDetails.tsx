'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/src/models/users';
import { ActivityModel } from '@/src/models/activity'; // Ensure you have these types defined
import { deletePost, getPost } from '../actions';
import Link from 'next/link';
import { likePost } from '../actions';
import CommentBox from './Comment_box';
import Image from 'next/image';
import moment from 'moment';
import profileIcon from '@/src/public/profile-icon.png';
import Alert from "../components/Alert";

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

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];
const getStatusColor = (status: number): string => {
    switch (status) {
        case 0: return 'bg-yellow-500';
        case 1: return 'bg-green-500';
        case 2: return 'bg-red-500';
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

export default function PostDetails({ id, user }: { id: string, user: UserType | null }) {
    const [post, setPost] = useState<PostType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: string, text: string }>({ type: '', text: '' });
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
                setAlert({ type: 'error', text: 'Failed to like post' });
            }
        } catch (err) {
            console.error(err);
            setAlert({ type: 'error', text: 'Failed to like post' });
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
            setAlert({ type: 'error', text: 'Failed to delete post' });
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <>
            <div className="bg-secondary rounded-lg shadow-lg px-2 md:px-6 py-4 transition duration-300 ease-in-out hover:shadow-xl">
                {alert.text !== '' && <Alert type={alert.type as any} message={alert.text} onClose={() => setAlert({ type: '', text: '' })} />}
                <div className='flex justify-between'>
                    <div className="w-full">
                        <div className="flex w-full mb-5 justify-between">

                            {/* @ts-ignore location */}
                            <p className='font-bold text-xs my-auto md:text-md'><i className="fa-solid fa-location-dot"></i> {post.activity.Location.block}</p>

                            <div className="flex items-center">

                                {/* tags  */}
                                <div className=" mr-2 md:mr-8 space-x-2 md:space-x-4">
                                    <span className={`px-2 md:px-3 py-2 rounded-xl text-xs md:text-sm text-white ${getActivityColor(post.activity.type_id)}`}>
                                        {activityTypes[post.activity.type_id - 1]}
                                    </span>
                                    <span className={`px-2 md:px-3 py-2 rounded-xl text-xs md:text-sm text-white ${getStatusColor(post.status_id - 1)}`}>
                                        {activityStatuses[post.status_id - 1]}
                                    </span>
                                </div>

                                {/* image and name  */}
                                <div className="w-8 h-8 relative flex-shrink-0 flex-grow-0 text-center">
                                    <Image
                                        // @ts-ignore
                                        src={post?.User?.Image?.url || profileIcon}
                                        fill
                                        alt="profile-picture"
                                        className="rounded-full m-auto cover"
                                    />
                                    {/* @ts-ignore */}
                                    <p className="text-xs font-semibold mt-8">{post.User.name}</p>
                                </div>

                            </div>
                        </div>

                        {/* title  */}
                        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 text-secondary_accent">{post.title}</h1>

                        {/* related activity  */}
                        <p className="mb-4 md:ml-6 text-xs md:text-sm italic text-text">( Related Activity:
                            <Link className='text-secondary_accent font-semibold italic hover:underline' href={`/activity/${post.activity.activity_id}`}> {post.activity.title} </Link>
                            )</p>

                        {/* content  */}
                        <p className="mb-4 md:ml-5 text-sm md:text-sm text-background_accent bg-secondary_accent rounded-lg p-4">{post.data}</p>
                    </div>

                </div>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <button
                            onClick={handleLike}
                            className="bg-primary text-text px-2 py-1 md:px-4 md:py-2 rounded hover:bg-opacity-90 transition duration-200 ml-2 hover:scale-105 "
                        >
                            <i className='fa-solid fa-circle-up text-2xl mt-1'></i>
                            <span className="mx-auto lg:ml-2 font-bold py-2 text-text"> {post.likes}</span>
                        </button>
                        <p className="mt-5 mx-4 italic text-sm text-text"> Created {moment(post.createdAt).fromNow()}</p>
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