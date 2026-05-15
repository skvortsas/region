import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      // TBD: Discord CDN for user/guild avatars
      // { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '/avatars/**' },
      // { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '/icons/**' },
      // TBD: CFX/FiveM resource images if server-status icons are sourced externally
      // { protocol: 'https', hostname: '**.cfx.re' },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.yourdomain.com' }],
        destination: 'https://yourdomain.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
