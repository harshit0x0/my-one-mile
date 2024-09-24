import { Image } from "@/src/models/images";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const image_id = url.searchParams.get('image_id');
        if (!image_id) throw "image_id not found";
        const image = await Image.findByPk(image_id);
        return new Response(JSON.stringify(image?.dataValues), { status: 200 });
    }
    catch (e) {
        console.log(e);
        return new Response(`Internal server error: ${e}`, { status: 500 });
    }
}