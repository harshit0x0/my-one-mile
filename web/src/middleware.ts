// import { authUser } from './auth/authUser';
// import { NextRequest, NextResponse } from "next/server";

export default async function middleware() {

    //     const session = request.cookies.get('session');
    //     if (!session) return;
    //     const response = NextResponse.next();
    //     const user = await authUser(session.value);
    //     response.cookies.set({
    //         name: "UserData",
    //         value: JSON.stringify(user),
    //         httpOnly: true
    //     });
    //     return response;
}

// export const config = {
//     matcher: [
//         '/',
//         '/profile',
//         '/api/profile'
//     ]
// }