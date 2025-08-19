import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/todos", label: "Todos" },
		{ to: "/post/", label: "Posts" },
	];

	return (
		<header className="flex justify-center border-b-2 shadow-lg">
			<div className="flex w-full max-w-screen-xl justify-between p-2">
				<div className="flex items-center space-x-2">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} to={to}>
								{label}
							</Link>
						);
					})}
				</div>
				<div className="flex items-center space-x-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
