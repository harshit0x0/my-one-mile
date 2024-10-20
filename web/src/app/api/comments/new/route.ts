import { Post } from '@/src/models/posts';
import { authUser } from '@/src/auth/authUser';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '@/src/models/comments';

export async function POST(request: Request) {
    try {
        console.log('POST/comments: Received POST request');

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
        console.log(body);
        const { data, post_id, reply_id } = body;

        // Validate the request body
        if (!data || !post_id) {
            return new Response("Missing required fields", { status: 400 });
        }

        // Create a new post
        const comment = await Comment.create({
            comment_id: uuidv4(),
            likes: 0,
            data,
            post_id,
            reply_id: reply_id || null,
            created_by: user.id as string,
            createdAt: new Date(),
            updatedAt: new Date(),
            status_id: 1,
        })

        // Return the created post
        return new Response(JSON.stringify(comment), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}