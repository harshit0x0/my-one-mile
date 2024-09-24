import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/src/models/users';
import { Image } from '@/src/models/images';
import { Location } from '@/src/models/location';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { signUser } from '@/src/auth/authUser';
import { cookies } from 'next/headers';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const oldUser = await User.findByPk(data.get('id') as string);

        if (file) {

            // Delete old profile pic
            if (oldUser?.image_id) {
                await cloudinary.uploader.destroy(oldUser.image_id);
                Image.destroy({ where: { image_id: oldUser.image_id } });
                oldUser.update({ image_id: null });
            }

            // Upload new profile pic   
            const buffer = Buffer.from(await file.arrayBuffer());
            const stream = Readable.from(buffer);

            // Upload to Cloudinary
            const result: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'myonemile/profile-pic',
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                stream.pipe(uploadStream);
            });
            const img = await Image.create({
                image_id: result.public_id,
                url: result.url,
            });
            data.append('image_id', img.image_id);
        }

        const dataToUpdate: any = {};

        for (const entry of data.entries()) {
            const [key, value] = entry;
            if (key == 'file') continue;            //we dont need this entry
            if (value) {
                dataToUpdate[key] = value;
            }
        }
        // console.log("data to update: ", dataToUpdate);
        await User.update(
            dataToUpdate,
            { where: { id: data.get('id') as string } }
        );

        // create new token for updated user
        const user = await User.findByPk(data.get('id') as string);
        const token = await signUser(user?.dataValues);
        cookies().set("session", token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60 * 1000) });
        return new Response(null, { status: 201 });

    } catch (e: any) {
        console.error(e);
        return new NextResponse(`Internal server error: ${e.message}`, { status: 500 });
    }
}
