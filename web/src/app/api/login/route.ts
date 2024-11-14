import { User } from "@/src/models/users";
import { matchPassword } from "@/src/utils/helpers";
import { signUser, authUser } from "@/src/auth/authUser";
import { cookies } from "next/headers";
import { getCity } from "../../actions";

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
        console.log(token);
        cookies().set('session', token, { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
        const userData = await authUser(token);
        const location = await getCity(userData.location as string);
        const details = {
            id: userData.id,
            email: userData.email,
            // role: userData.role_id,
            name: userData.name,
            location: location ?? '',
            image: userData.image_id,
            // badge: userData.badge
        };
        return new Response(JSON.stringify(details), { status: 201 });
    } catch (e) {
        // @ts-ignore 
        if (e.name === 'SequelizeConnectionError') return new Response('Internal server error, please try again later', { status: 500 });
        return new Response(`Internal server error:${e}`, { status: 500 });
    }
}