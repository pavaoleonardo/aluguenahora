import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  /**
   * Crawlers that must receive the *blocking* render (metadata inside `<head>`) instead of Next's
   * streamed metadata. With streaming on, `<title>`/`og:*` are flushed late and end up inside
   * React's `<div hidden>` containers after `</head>`, where only the client runtime can hoist them
   * — a link-preview crawler that does not run JS reads the raw HTML and finds no `og:image`, which
   * is how shares ended up with a bare card.
   *
   * Next's default list already covers `facebookexternalhit`, `facebookcatalog` and `WhatsApp`, but
   * not the agents Meta uses today (`FacebookBot`, `meta-externalagent`) — those are the additions
   * at the end. Setting this option *replaces* the default, so the default entries are repeated
   * verbatim; `Googlebot` is deliberately absent, exactly as in Next's default (its renderer runs
   * JavaScript and handles streamed HTML).
   */
  htmlLimitedBots:
    /Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|FacebookBot|meta-externalagent|externalagent/i,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'classic-actor-79ca20f4f3.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
