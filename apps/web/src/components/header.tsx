import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

function logout() {
	authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				toast.success("Successfully Logout!");
			},
		},
	});
}

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const session = authClient.useSession();
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "border-gray-800 border-b bg-black/90 backdrop-blur-md" : "bg-transparent"}`}
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="flex items-center justify-between py-4">
					<div className="bg-gradient-to-r from-pink-400 via-teal-400 to-blue-400 bg-clip-text font-bold text-2xl text-transparent">
						<Link to="/">Skin X</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden items-center space-x-8 md:flex">
						<Link
							to="/post"
							className="text-gray-300 transition-colors hover:text-white"
						>
							Posts
						</Link>
						<a
							href="#features"
							className="text-gray-300 transition-colors hover:text-white"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-gray-300 transition-colors hover:text-white"
						>
							About
						</a>
						<a
							href="#contact"
							className="text-gray-300 transition-colors hover:text-white"
						>
							Contact
						</a>

						<div className="flex items-center space-x-4">
							{session.data?.session ? (
								<Button
									onClick={() => logout()}
									className="transform rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
								>
									Log Out
								</Button>
							) : (
								<>
									<Link to="/login">
										<Button className="rounded-full border border-teal-400 px-6 py-2 text-teal-400 transition-all duration-300 hover:bg-teal-400 hover:text-black">
											Login
										</Button>
									</Link>
									<Link to="/signup">
										<Button className="transform rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
											Sign Up
										</Button>
									</Link>
								</>
							)}
						</div>
					</div>

					{/* Mobile Menu Button */}
					<Button
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</Button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="m-4 space-y-4 rounded-xl bg-gray-900 p-6 md:hidden">
						<Link
							to="/post"
							className="block text-gray-300 transition-colors hover:text-white"
						>
							Posts
						</Link>
						<a
							href="#features"
							className="block text-gray-300 transition-colors hover:text-white"
						>
							Features
						</a>
						<a
							href="#about"
							className="block text-gray-300 transition-colors hover:text-white"
						>
							About
						</a>
						<a
							href="#contact"
							className="block text-gray-300 transition-colors hover:text-white"
						>
							Contact
						</a>
						<div className="flex flex-col space-y-3 pt-4">
							{session.data?.session ? (
								<Button
									onClick={() => logout()}
									className="rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
								>
									Log Out
								</Button>
							) : (
								<>
									<Link to="/login">
										<Button className="rounded-full border border-teal-400 px-6 py-2 text-teal-400 transition-all duration-300 hover:bg-teal-400 hover:text-black">
											Login
										</Button>
									</Link>
									<Link to="/signup">
										<Button className="rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-6 py-2 text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
											Sign Up
										</Button>
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
