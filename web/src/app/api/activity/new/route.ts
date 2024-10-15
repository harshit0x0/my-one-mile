import { Activity } from '@/src/models/activity';
import { User } from '@/src/models/users';
import { authUser } from '@/src/auth/authUser';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        console.log('ACTIVTY/NEW: Received POST request');

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
        const { type_id, status_id, title, description } = body;

        // Validate the request body
        if (!type_id || !status_id || !description) {
            return new Response('Missing required fields', { status: 400 });
        }

        // Get the user's location from the user model
        const location: any = user.location;
        const user_id: any = user.id;

        // Create a new activity
        const activity = await Activity.create({
            activity_id: uuidv4(),
            type_id,
            status_id,
            location: location,
            title,
            description,
            createdBy: user_id,
            createdAt: new Date()
        });

        // Return the created activity
        return new Response(JSON.stringify(activity), { status: 201 });
        // return new Response("working", { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}