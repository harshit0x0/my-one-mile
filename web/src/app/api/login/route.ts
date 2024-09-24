import { User } from "@/src/models/users";
import { matchPassword } from "@/src/utils/helpers";
import { signUser } from "@/src/auth/authUser";
import { cookies } from "next/headers";

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
        const token = await signUser(user[0].dataValues);
        cookies().set('session', token, { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
        return new Response(null, { status: 201 });
    } catch (e) {
        return new Response(`Internal server error:${e}`, { status: 500 });
    }
}