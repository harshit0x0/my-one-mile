'use server'

import { cookies } from "next/headers";
import { UserType } from "../models/users";
import { authUser } from "../auth/authUser";
import { ImageType } from "../models/images";
import { revalidatePath } from "next/cache";
import { LocationType } from "../models/location";
import { Location, Activity } from "../models/index";

export async function getUser() {
    const session = cookies().get('session');
    if (!session || session.value === '') return null;
    const user = await authUser(session.value);
    return user as unknown as UserType;
}

export async function getTheme() {
    const theme = cookies().get('theme');
    if (!theme || theme.value === '') return 'light';
    return theme.value;
}

export async function toggleTheme() {
    console.log("toggle theme")
    const theme = cookies().get('theme');
    if (!theme || theme.value === '' || theme.value === 'light') {
        cookies().set('theme', 'dark', { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
    } else {
        cookies().set('theme', 'light', { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
    }
    revalidatePath('/');
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
        return location as LocationType;
    } catch (e) {
        console.log("cannot find location");
        console.log(e);
    }
}

export async function getCity(location_id: string) {
    try {
        const location = await Location.findByPk(location_id);
        return location?.city;
    } catch (e) {
        console.log("cannot find location");
        console.log(e);
    }
}

export async function revalidateGivenPath(path: string) {
    revalidatePath(path);
}

export const getActivities = async () => {
    try {
        const activities = await Activity.findAll({ include: Location });
        const data = activities.map((activity) => {
            return {
                ...activity.dataValues,
                // @ts-ignore
                location: activity.dataValues.Location.dataValues.city,
                Location: null
            };
        });
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching activities:', error);
        return null;
    }
};

export const getRecentActivities = async () => {
    try {
        const activities = await Activity.findAll({ limit: 5, include: Location, order: [['createdAt', 'DESC']] });
        console.log(activities);
        const data = activities.map((activity) => {
            return {
                ...activity.dataValues,
                // @ts-ignore
                location: activity.dataValues.Location.dataValues.city,
                Location: null
            };
        });
        return JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching activities:', error);
        return null;
    }
}