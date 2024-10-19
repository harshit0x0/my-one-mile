'use client'

import React, { useState, useEffect } from 'react';
import { getPost, updatePost } from '../actions';
import { useRouter } from 'next/navigation';

interface Post {
    id: string;
    title: string;
    data: string;
    activity_id: string;
}

export default function EditPostForm({ id }: { id: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPost(id);
                if (!data) {
                    throw new Error('Failed to fetch post');
                }
                const post = JSON.parse(data);
                setPost(post);
            } catch (err) {
                setError('Failed to load post. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        try {
            const response = await updatePost(id, post);
            if (!response) {
                throw new Error('Failed to update post');
            }
            router.push(`/posts/${id}`);
        } catch (err) {
            setError('Failed to update post. Please try again.');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!post) return <p>No post found</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                    required
                />
            </div>
            {/* Post data */}
            <div>
                <label htmlFor="data" className="block text-sm font-medium mb-1">Post</label>
                <textarea
                    id="data"
                    name="data"
                    value={post.data}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                    required
                ></textarea>
            </div>
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                >
                    Update Post
                </button>
                <button
                    type="button"
                    className="bg-secondary text-text px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
