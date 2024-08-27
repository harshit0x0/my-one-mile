import { Image } from "@/src/models/images";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const image_id = params.slug[0] + '/' + params.slug[1] + '/' + params.slug[2];
        const image = await Image.findByPk(image_id);
        console.log("image found: ", image);
        return new Response(JSON.stringify(image), { status: 200 });
    }
    catch (e) {
        console.log(e);
        return new Response(`Internal server error: ${e}`, { status: 500 });
    }
}