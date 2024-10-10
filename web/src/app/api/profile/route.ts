import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/src/models/users';
import { Image } from '@/src/models/images';
import { Location } from '@/src/models/location';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { signUser } from '@/src/auth/authUser';
import { cookies } from 'next/headers';
import { db as sequelize } from '@/src/dbConfig/server';

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

        const transaction = await sequelize.transaction();

        try {
            // Fetch the user by ID
            console.log("\n\nHERE\n\n");
            const userId = data.get('id') as string;
            const oldLocationUser = await User.findByPk(userId, { transaction });

            if (!oldLocationUser) {
                throw new Error('User not found');
            }

            // Parse the new location JSON from the request
            const newLocation = JSON.parse(data.get('location') as string);
            const newLocationId = newLocation.id;

            // Delete the old location (if exists)
            //if location is same then skip all steps
            if (oldLocationUser.location !== newLocationId) {

                if (oldLocationUser.location) {
                    const oldLocationId = oldLocationUser.location;
                    await oldLocationUser.update({ location: null }, { transaction });
                    await Location.destroy({ where: { location_id: oldLocationId }, transaction });
                }

                // Check if the new location already exists in the 'location' table
                let location = await Location.findOne({ where: { location_id: newLocationId }, transaction });

                // If the new location doesn't exist, create it
                if (!location) {
                    location = await Location.create({
                        location_id: newLocationId,
                        block: newLocation.block,
                        city: newLocation.city,
                        state: newLocation.state,
                        country: newLocation.country
                    }, { transaction });
                }

                // Update the user's location with the new 'location_id'
                await oldLocationUser.update({ location: location.location_id }, { transaction });

                // Commit the transaction
                await transaction.commit();

                console.log("User location updated successfully!");
            }
        } catch (error) {
            // Rollback in case of any errors
            console.error("\n\nError updating user location:", error);
            await transaction.rollback();
        }

        const dataToUpdate: any = {};
        for (const entry of data.entries()) {
            const [key, value] = entry;
            console.log("key: ", key, "value: ", value);
            if (key == 'file' || key == 'location') continue;            //we dont need this entry
            if (value) {
                dataToUpdate[key] = value;
            }
        }
        console.log("data to update: ", dataToUpdate);
        await User.update(
            dataToUpdate,
            { where: { id: data.get('id') as string } }
        );

        // create new token for updated user
        const user = await User.findByPk(data.get('id') as string);
        const token = await signUser(user?.dataValues);

        //set cookies
        cookies().set("session", token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60 * 1000) });
        return new Response(null, { status: 201 });

    } catch (e: any) {
        console.error(e);
        return new NextResponse(`Internal server error: ${e.message}`, { status: 500 });
    }
}
