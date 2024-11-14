import { User } from "@/src/models/users";
import { Role } from "@/src/models/roles";
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword } from "@/src/utils/helpers";

export async function POST(request: Request) {
    try {
        console.log('Received POST request');
        const body = await request.json();
        const { email, password, confirmPassword } = body;
        if (password.length < 8 || password.length > 12) {
            return new Response('Password must be between 8 and 12 characters', { status: 400 });
        }
        if (password !== confirmPassword) {
            return new Response('Passwords do not match', { status: 400 });
        }

        const id = uuidv4();
        const hashedPassword = await encryptPassword(password);
        const userRole = await (Role.findAll({ where: { role: "user" } }));
        const user = await User.create({ id, email, password: hashedPassword, role_id: userRole[0].role_id });
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (e) {
        // @ts-ignore 
        if (e.name === 'SequelizeUniqueConstraintError') return new Response('This email is already registered', { status: 400 });
        // @ts-ignore 
        if (e.name === 'SequelizeConnectionError') return new Response('Connection error', { status: 500 });
        return new Response(`Internal server error:${e}`, { status: 500 });
    }
}