import { User } from "@/src/models/users";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        console.log('Received POST request');
        const body = await request.json();
        const { email, password, confirmPassword } = body;

        if (password !== confirmPassword) {
            return new Response('Passwords do not match', { status: 400 });
        }

        const id = uuidv4();
        const user = await User.create({ id, email, password });
        console.log(JSON.stringify(user));
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (e) {
        console.log(e);
        return new Response(`Internal server error:${e}`, { status: 500 });
    }
}