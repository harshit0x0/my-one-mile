'use server'

import { cookies } from "next/headers";
import { UserType } from "../models/users";
import { authUser } from "../auth/authUser";
import { ImageType } from "../models/images";
import { revalidatePath } from "next/cache";
import { Location } from "../models/location";

export async function getUser() {
    const session = cookies().get('session');
    if (!session || session.value === '') return null;
    const user = await authUser(session.value);
    return user as unknown as UserType;
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
    return;
}

export async function getImageURL(img_id: string) {
    try {
        const res = await fetch(`${process.env.URL}/api/images?image_id=${img_id}`);
        if (res.ok) {
            const img = await res.json() as ImageType;
            return img.url;
        }
    } catch (e) {
        console.log("cannot find profile image");
        console.log(e);
    }
}

export async function getLocation(location_id: string) {
    try {
        const location = await Location.findByPk(location_id);
        return location;
    } catch (e) {
        console.log("cannot find location");
        console.log(e);
    }
}

export async function revalidateGivenPath(path: string) {
    revalidatePath(path);
}