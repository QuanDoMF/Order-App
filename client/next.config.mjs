/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             // hostname: 'images.'
    //             port: '',
    //             pathname: '/photos/**'
    //         }
    //     ]
    // }
    logging: {
        fetches: {
            fullUrl: true
        }
    }
};

export default nextConfig;
