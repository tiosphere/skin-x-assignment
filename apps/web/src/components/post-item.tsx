import { Link } from "@tanstack/react-router";
import { Calendar, TagIcon, User } from "lucide-react";
import type { Post, Tag } from "@/lib/schema";
import { findTagById } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function PostItem({ post, tags }: { post: Post; tags: Tag[] }) {
	const to = "/post/$postId";
	const params = { postId: post.id.toString() };

	return (
		<Card className="group relative transform rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300 hover:scale-105 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/20">
			<CardHeader>
				<CardTitle className="mb-2 font-bold text-2xl text-white transition-colors group-hover:text-teal-300">
					<Link to={to} params={params}>
						{post.title}
					</Link>
				</CardTitle>

				<CardDescription className="text-gray-400">
					<div className="flex flex-wrap items-center gap-4 text-sm">
						<div className="flex items-center gap-1">
							<User className="h-4 w-4 text-teal-300" /> {post.postedBy}
						</div>
						<div className="flex items-center gap-1">
							<Calendar className="h-4 w-4 text-pink-300" />{" "}
							{post.postedAt.toLocaleDateString()}
						</div>
					</div>

					<div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
						<TagIcon className="h-4 w-4 text-purple-300" />
						{post.postTags.map((tagRef) => {
							const tag = findTagById(tagRef.tagId, tags);
							const params = { tagId: tagRef.tagId.toString() };
							return (
								<Link key={tagRef.tagId} to="/tag/$tagId" params={params}>
									<span className="rounded-full bg-white/10 px-3 py-1 font-medium text-teal-200 text-xs backdrop-blur-sm transition-all duration-300 hover:text-teal-600 hover:shadow-[0_0_12px_rgba(45,212,191,0.7)]">
										{tag.name}
									</span>
								</Link>
							);
						})}
					</div>
				</CardDescription>
			</CardHeader>

			<CardFooter className="flex justify-end">
				<Link to={to} params={params}>
					<Button className="rounded-full bg-gradient-to-r from-pink-500 to-teal-400 px-5 font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
						Read More
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
