'use server'

import { cookies } from "next/headers";
import { UserType } from "../models/users";
import { authUser } from "../auth/authUser";
import { ImageType } from "../models/images";
import { revalidatePath } from "next/cache";
import { LocationType } from "../models/location";
import { Location, Activity, Post, User, Comment } from "../models/index";
import { CommentModel } from "../models/comments";


export async function getUser() {
    try {
        const session = cookies().get('session');
        if (!session || session.value === '') return null;
        const user = await authUser(session.value);
        return user as unknown as UserType;
    } catch (error) {
        console.error('\nError fetching user\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const data = await User.findByPk(id);
        return JSON.stringify(data);
    } catch (error) {
        console.error('\nError fetching user\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
};
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
    } catch (error) {
        console.error('\nError fetching imgae url\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export async function getLocation(location_id: string) {
    try {
        const location = await Location.findByPk(location_id);
        return location as LocationType;
    } catch (error) {
        console.error('\nError fetching location\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export async function getCity(location_id: string) {
    try {
        const location = await Location.findByPk(location_id);
        return location?.city;
    } catch (error) {
        console.error('\nError fetching city\n');
        // @ts-ignore
        console.error(error.original);
        return null;
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
        console.error('\nError fetching all activities\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
};

export const getRecentActivities = async () => {
    try {
        const activities = await Activity.findAll({ limit: 5, include: Location, order: [['createdAt', 'DESC']] });
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
        console.error('\nError fetching recent activity\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const getActivity = async (id: string) => {
    try {
        const activity = await Activity.findByPk(id, {
            include: [
                { model: Location }, { model: User, attributes: ['name', 'id'] }
            ]
        });
        const data = {
            ...activity?.dataValues,
            // @ts-ignore
            location: activity?.dataValues.Location.dataValues.city,
            Location: null
        };
        return JSON.stringify(data);
    } catch (error) {
        console.error('\nError fetching activity\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}


export const updateActivity = async (id: string, data: any) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return null;
        }
        // location does not come right from edit form
        data = { ...data, location: activity.location };

        await activity.update(data);
        return true;
    } catch (error) {
        console.error('\nError updating activity\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const deleteActivity = async (id: string) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return null;
        }
        await activity.destroy();
        return true;
    } catch (error) {
        console.error('\nError deleting activity\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}


export const getPosts = async () => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: Activity,
                include: [{
                    model: Location
                }, {
                    model: User,
                    attributes: ['name', 'id']
                }]
            }],
            order: [['createdAt', 'DESC']]
        });
        const data = posts.map((post) => {
            return {
                ...post.dataValues,
                // @ts-ignore
                activity: post.dataValues.Activity.dataValues,
                Activity: null
            };
        });
        return JSON.stringify(data);
    } catch (error) {
        console.error('\nError fetching posts\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const getPost = async (id: string) => {
    try {
        const post = await Post.findByPk(id, {
            include: [
                { model: Activity, include: [{ model: Location }, { model: User, attributes: ['name', 'id'] }] },
                { model: User, attributes: ['name', 'id'] }
            ]
        });
        const data = {
            ...post?.dataValues,
            // @ts-ignore
            activity: post?.dataValues.Activity.dataValues,
            Activity: null
        };
        return JSON.stringify(data);
    } catch (error) {
        console.error('\nError fetching post\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const likePost = async (id: string) => {
    try {
        const post = await Post.findByPk(id);
        if (post) {
            post.likes = post.likes + 1;
            await post.save();
            return JSON.stringify(post);
        }
    } catch (error) {
        console.error('\nError liking posts\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const deletePost = async (id: string) => {
    try {
        const post = await Post.findByPk(id);
        if (post) {
            await post.destroy();
            return true;
        }
    } catch (error) {
        console.error('\nError deleting posts\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const updatePost = async (id: string, data: any) => {
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return null;
        }
        await post.update(data);
        return true;
    } catch (error) {
        console.error('\nError updating post\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}


const getAllReplies: any = (reply_id: string, comments: CommentModel[]) => {
    if (reply_id == null) {
        return [];
    }
    return comments
        .filter((comment) => comment.reply_id == reply_id)
        .map((comment) => {
            return {
                ...comment.dataValues,
                replies: getAllReplies(comment.comment_id, comments)
            };
        });
}

export const getCommentsByPostId = async (post_id: string) => {
    try {
        const AllComments = await Comment.findAll({ where: { post_id: post_id } });
        // console.log("all comments, ", AllComments);
        const comments = AllComments
            .filter((comment) => comment.dataValues.reply_id == null)
            .map((comment) => {
                return {
                    ...comment.dataValues,
                    replies: getAllReplies(comment.comment_id, AllComments)
                };
            });
        // console.log("filtered comments", comments);
        return JSON.stringify(comments);
    } catch (error) {
        console.error('\nError fetching comments\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const updateComment = async (text: string, id: string) => {
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return null;
        }
        await comment.update({ data: text });
        return true;
    } catch (error) {
        console.error('\nError updating comment\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}

export const deleteComment = async (id: string) => {
    try {
        const comment = await Comment.findByPk(id);
        if (comment) {
            await comment.destroy();
            return true;
        }
    } catch (error) {
        console.error('\nError deleting comment\n');
        // @ts-ignore
        console.error(error.original);
        return null;
    }
}