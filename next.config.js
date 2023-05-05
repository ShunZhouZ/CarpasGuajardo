/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["es-CL", "en-US", "nl-NL"],
		defaultLocale: "es-CL"
	}
};

module.exports = nextConfig;
