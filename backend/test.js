const parseOrigins = (value) => value.split(',').map((entry) => entry.trim()).filter(Boolean);
const configuredOrigins = parseOrigins('');
const isProd = process.env.NODE_ENV === 'production';
const devOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://*.trycloudflare.com'\]\;
const frontendUrl = '';
const baseOrigins = configuredOrigins.length > 0 ? configuredOrigins : isProd ? ['https://aluguenahora.vercel.app'] : devOrigins;
const allowedOrigins = frontendUrl ? [...new Set([...baseOrigins, frontendUrl, 'https://aluguenahora.vercel.app'])] : [...new Set([...baseOrigins, 'https://aluguenahora.vercel.app'])];
console.log(allowedOrigins);
