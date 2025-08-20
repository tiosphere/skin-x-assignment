/** biome-ignore-all lint/a11y/useValidAnchor: <> */
export function Footer() {
	return (
		<footer className="border-gray-800 border-t px-6 py-12">
			<div className="mx-auto max-w-7xl text-center">
				<div className="mb-6 bg-gradient-to-r from-pink-400 via-teal-400 to-blue-400 bg-clip-text font-bold text-2xl text-transparent">
					Skin X
				</div>
				<p className="mb-8 text-gray-400">
					Revolutionizing skincare with artificial intelligence
				</p>
				<div className="flex flex-wrap justify-center gap-8 text-gray-400">
					<a href="#" className="transition-colors hover:text-white">
						Privacy Policy
					</a>
					<a href="#" className="transition-colors hover:text-white">
						Terms of Service
					</a>
					<a href="#" className="transition-colors hover:text-white">
						Support
					</a>
					<a href="#" className="transition-colors hover:text-white">
						Contact
					</a>
				</div>
				<div className="mt-8 text-gray-500 text-sm">
					© 2025 Skin X. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
