import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { User } from '@/src/models/users';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const stream = Readable.from(buffer);

            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
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
            console.log(result);
        }
        return new NextResponse(JSON.stringify({ message: 'File uploaded successfully' }), { status: 200 });
        // await User.update(
        //     { name: data.get('name'), location: data.get('location'), dob: data.get('dob') },
        //     { where: { id: 1 } });


    } catch (e: any) {
        console.error(e);
        return new NextResponse(`Internal server error: ${e.message}`, { status: 500 });
    }
}
