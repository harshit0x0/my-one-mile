import { Post } from '@/src/models/posts';
import { User } from '@/src/models//users';
import { authUser } from '@/src/auth/authUser';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        console.log('POST/NEW: Received POST request');

        // Check user authentication
        const session = cookies().get('session')?.value;
        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }
        const user = await authUser(session as string);
        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { title, data, activity_id, status_id } = body;

        // Validate the request body
        if (!title || !data || !activity_id) {
            return new Response('Missing required fields', { status: 400 });
        }

        // Create a new post
        const post = await Post.create({
            post_id: uuidv4(),
            title,
            data,
            user_id: user.id as string,
            activity_id,
            likes: 0,
            status_id: status_id || 1,     // Assuming a default status ID
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Return the created post
        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}