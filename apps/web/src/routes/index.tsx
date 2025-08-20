import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Shield, Sparkles, Zap } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const features = [
		{
			icon: <Sparkles className="h-8 w-8" />,
			title: "AI-Powered Analysis",
			description:
				"Advanced machine learning algorithms analyze your skin with 99.9% accuracy, providing personalized insights.",
		},
		{
			icon: <Shield className="h-8 w-8" />,
			title: "Dermatologist Approved",
			description:
				"Clinically tested and approved by leading dermatologists worldwide for safe, effective results.",
		},
		{
			icon: <Zap className="h-8 w-8" />,
			title: "Instant Results",
			description:
				"See improvements in just 7 days with our revolutionary treatment protocols and smart recommendations.",
		},
	];

	const stats = [
		{ number: "500K+", label: "Happy Users" },
		{ number: "99.9%", label: "Accuracy Rate" },
		{ number: "7 Days", label: "Avg. Results" },
		{ number: "24/7", label: "AI Support" },
	];

	return (
		<div className="min-h-scree text-white">
			{/* Hero Section */}
			<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0 opacity-30">
					<div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-teal-900/20" />
					<div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl" />
					<div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-500/10 blur-3xl delay-1000" />
				</div>

				<div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
					<h1 className="mb-6 bg-gradient-to-r from-white via-teal-300 to-pink-300 bg-clip-text font-black text-5xl text-transparent leading-tight md:text-7xl lg:text-8xl">
						Revolutionary
						<br />
						<span className="bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-transparent">
							Skincare AI
						</span>
					</h1>

					<p className="mx-auto mb-12 max-w-3xl text-gray-300 text-xl leading-relaxed md:text-2xl">
						Transform your skin with cutting-edge AI technology. Personalized
						treatments, instant analysis, and results that speak for themselves.
					</p>

					<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
						<Link to="/login">
							<Button className="group flex transform items-center rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-8 py-4 font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
								Start Your Journey
								<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Button>
						</Link>

						<Button className="transform rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-lg text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20">
							Watch Demo
						</Button>
					</div>

					{/* Stats */}
					<div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
						{stats.map((stat) => (
							<div key={stat.label} className="text-center">
								<div className="bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text font-bold text-3xl text-transparent md:text-4xl">
									{stat.number}
								</div>
								<div className="mt-2 text-gray-400 text-sm md:text-base">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id={useId()} className="px-6 py-24">
				<div className="mx-auto max-w-7xl">
					<div className="mb-16 text-center">
						<h2 className="mb-6 bg-gradient-to-r from-white to-teal-300 bg-clip-text font-bold text-4xl text-transparent md:text-6xl">
							Why Choose Skin X?
						</h2>
						<p className="mx-auto max-w-3xl text-gray-400 text-xl">
							Experience the future of skincare with our revolutionary
							AI-powered platform
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.title} className="group relative">
								<div className="transform rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-8 transition-all duration-300 hover:scale-105 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/20">
									<div className="mb-6 w-fit rounded-xl bg-gradient-to-r from-pink-500 to-teal-400 p-4 transition-transform duration-300 group-hover:scale-110">
										{feature.icon}
									</div>

									<h3 className="mb-4 font-bold text-2xl text-white transition-colors group-hover:text-teal-300">
										{feature.title}
									</h3>

									<p className="text-gray-400 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-pink-900/20 to-teal-900/20 px-6 py-24">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="mb-6 bg-gradient-to-r from-white to-teal-300 bg-clip-text font-bold text-4xl text-transparent md:text-5xl">
						Ready to Transform Your Skin?
					</h2>
					<p className="mb-10 text-gray-300 text-xl">
						Join thousands of users who have already discovered the power of
						AI-driven skincare
					</p>

					<div className="flex flex-col justify-center gap-6 sm:flex-row">
						<Link to="/login">
							<Button className="transform rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-10 py-4 font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
								Get Started Free
							</Button>
						</Link>
						<Button className="rounded-full border-2 border-white/30 px-10 py-4 font-semibold text-lg text-white transition-all duration-300 hover:bg-white/10">
							Learn More
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
