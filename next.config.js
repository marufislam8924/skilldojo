/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 2678400,
	},
	async headers() {
		return [
			{
				source: "/:path*\\.(svg|jpg|jpeg|png|webp|avif|ico|gif|woff|woff2|ttf|otf)$",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
