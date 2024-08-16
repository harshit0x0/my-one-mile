import { User } from "@/src/models/users";
import { matchPassword } from "@/src/utils/helpers";

export async function POST(request: Request) {
    try {
        console.log('Received POST request');
        const body = await request.json();
        const { email, password } = body;


        const user = await User.findAll({
            where: { email: email }
        });
        if (user.length === 0) {
            return new Response('User not found', { status: 404 });
        }
        const hashedPassword = user[0].password;
        if (!await matchPassword(password, hashedPassword)) {
            return new Response('Incorrect password', { status: 401 });
        }
        return new Response(JSON.stringify(user), { status: 201 });

    } catch (e) {
        return new Response(`Internal server error:${e}`, { status: 500 });
    }
}