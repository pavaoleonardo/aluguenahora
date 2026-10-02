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
      {
        // The maintenance banner's mascot (frontend/public/mascot-construction-branded.webp, ~9 KB) is
        // preloaded by app/layout.tsx, so every visit touches it. Next serves files from /public with
        // `Cache-Control: public, max-age=0` — a revalidation round trip on every single load — and a
        // week of freshness removes it. Deliberately not `immutable`: the filename carries no content
        // hash, so a replaced mascot still has to reach returning visitors within the week.
        source: '/mascot-construction-branded.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // The home hero's pre-encoded WebP set (app/page.tsx -> public/modern-facade-hero-*.webp).
        // Same reasoning as the mascot rule above: these come from /public, so Next's default
        // `max-age=0` would revalidate a couple hundred KB on every single visit. One week of
        // freshness, and a re-encoded photo still reaches returning visitors within that week
        // because the filenames carry no content hash (so: not `immutable`).
        source: '/modern-facade-hero-:size.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
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
   * after the default block. Setting this option *replaces* the default, so the default entries are
   * repeated verbatim; `Googlebot` is deliberately absent, exactly as in Next's default (its renderer
   * runs JavaScript and handles streamed HTML).
   *
   * The tail adds the remaining non-JS preview fetchers that were falling back to the streamed path:
   * `Facebot` (Meta's legacy share crawler), `Pinterest`, `Mastodon` and `TelegramBot` (which only
   * matched by accident before, because its UA string literally contains "(like TwitterBot)").
   * Verified in production: these agents now receive `og:image` inside `<head>`, while Chrome and
   * Googlebot keep Next's streamed render.
   */
  htmlLimitedBots:
    /Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|FacebookBot|meta-externalagent|externalagent|Facebot|Pinterest|TelegramBot|Mastodon/i,
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
