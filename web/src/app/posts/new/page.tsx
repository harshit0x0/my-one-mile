'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PostFormData {
    title: string;
    data: string;
    activity_id: string;
}

const CreatePostPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        data: '',
        activity_id: ''
    });

    useEffect(() => {
        if (searchParams.get('activity_id') == '') router.push('/posts');
        const prefillData = {
            title: searchParams.get('title') || '',
            activity_id: searchParams.get('activity_id') || '',
        };
        setFormData(prev => ({ ...prev, ...prefillData }));
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.data || !formData.title) {
            alert('Please fill in all required fields');
            return;
        }

        const res = await fetch('/api/posts/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert('Post created successfully');
            router.push('/posts');
        } else {
            console.log(await res.text());
            alert('Failed to create post');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Prefilled title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-secondary rounded bg-background text-text
                                   focus:ring-2 focus:ring-primary focus:border-transparent
                                   transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                        required
                    />
                </div>
                {/* Post data */}
                <div>
                    <label htmlFor="data" className="block text-sm font-medium mb-1">Post</label>
                    <textarea
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 border border-secondary rounded bg-background text-text
                                   focus:ring-2 focus:ring-primary focus:border-transparent
                                   transition duration-200 ease-in-out transform hover:scale-101 resize-y"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded
                               hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                               transition duration-200 ease-in-out transform hover:scale-102"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;
