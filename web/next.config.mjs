/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    env: {
        // MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        // NEXT_PUBLIC_AZURE_PRIMARY_KEY: process.env.NEXT_PUBLIC_AZURE_PRIMARY_KEY,
    }
};

export default nextConfig;
