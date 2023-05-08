/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.intelfinance.win',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
