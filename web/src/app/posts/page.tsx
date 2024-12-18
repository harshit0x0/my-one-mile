'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPosts } from '@/src/app/actions';
import PostItem from '@/src/app/components/PostItem';
import { ActivityModel } from '@/src/models/activity';
import { UserType } from '@/src/models/users';
import Link from 'next/link';

type PostType = {
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

const posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const res = await getPosts();
            if (res) {
                const data = JSON.parse(res);
                console.log(data);
                setPosts(data);
            }
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post =>
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.data.toLowerCase().includes(searchTerm.toLowerCase())) &&
            // @ts-ignore
            post.activity.Location.city.toLowerCase().includes(locationFilter.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [posts, searchTerm, locationFilter]);

    return (
        <div className="max-w-4xl mx-auto px-2 py-6 md:p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-text">All Posts</h1>
            <div className="mb-10 bg-background_accent shadow-md lg:ml-7 px-4 py-5 rounded-lg">
                Welcome to the discussion space related to various activities and issues. Join the conversation and share your thoughts, ideas, and experiences.
                <br />
                To create a post, create a new activity!
            </div>

            <div className="mb-6 md:flex space-y-1 flex-col md:flex-row items-center md:space-x-4">
                <div className="font-semibold my-auto">Filters:</div>
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                />
                <input
                    type="text"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="flex-1 p-2 border border-secondary rounded bg-background text-text
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition duration-200 ease-in-out transform hover:scale-101"
                />
            </div>

            <div>
                {filteredPosts.length === 0 ? (
                    isLoading ? (<p className="text-center text-gray-500">Loading...</p>)
                        : (<p className="text-center text-gray-500">No posts found.</p>)
                ) : (
                    filteredPosts.map(post => (
                        <Link key={post.post_id} href={`/posts/${post.post_id}`}>
                            <PostItem key={post.post_id} post={post} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default posts;