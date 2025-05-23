/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@react-three/postprocessing', 'postprocessing', 'leva'],
	experimental: {
		esmExternals: 'loose',
	},
	env: {
		REACT_APP_API_URL: process.env.REACT_APP_API_URL,
		REACT_APP_API_GRAPHQL_URL: process.env.REACT_APP_API_GRAPHQL_URL,
		REACT_APP_API_WS: process.env.REACT_APP_API_WS,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.js$/,
			include: /node_modules\/@mui\/icons-material/,
			resolve: {
				fullySpecified: false,
			},
		});
		return config;
	},
};

const { i18n } = require('./next-i18next.config');
nextConfig.i18n = i18n;

module.exports = nextConfig;
