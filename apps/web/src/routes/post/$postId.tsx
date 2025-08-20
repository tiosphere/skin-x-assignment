import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
	Calendar,
	Eye,
	Heart,
	MessageCircle,
	Share2,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { queryAllTags, queryPostById } from "@/lib/query";
import { findTagById } from "@/lib/utils";

export const Route = createFileRoute("/post/$postId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = authClient.useSession();
	const navigate = Route.useNavigate();
	useEffect(() => {
		if (!session && !isPending) {
			navigate({ to: "/login" });
		}
	}, [session, isPending]);

	const [isLiked, setIsLiked] = useState(false);
	const { postId } = useParams({ strict: false });
	if (postId) {
		const currentPost = queryPostById(+postId);
		const allTags = queryAllTags();
		const formatDate = (date: Date) => {
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		};
		if (currentPost.isSuccess && allTags.isSuccess) {
			if (currentPost.data) {
				return (
					<div className="min-h-screen bg-black text-white">
						{/* Post Content */}
						<div className="pt-20 pb-12">
							<div className="mx-auto max-w-4xl px-6">
								{/* Post Header */}
								<div className="mb-12">
									{/* Tags */}
									<div className="mb-6 flex flex-wrap gap-2">
										{currentPost.data.postTags.map((refTag) => {
											const tag = findTagById(refTag.tagId, allTags.data);
											const params = { tagId: refTag.tagId.toString() };
											return (
												<Link
													key={refTag.tagId}
													to="/tag/$tagId"
													params={params}
												>
													<span className="rounded-full border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-teal-400/20 px-3 py-1 text-pink-300 text-sm transition-all duration-300 hover:border-pink-400/60 hover:text-pink-200 hover:shadow-[0_0_12px_rgba(244,114,182,0.6)]">
														{tag.name}
													</span>
												</Link>
											);
										})}
									</div>

									{/* Title */}
									<h1 className="mb-6 bg-gradient-to-r from-white via-teal-300 to-pink-300 bg-clip-text font-black text-4xl text-transparent leading-tight md:text-5xl">
										{currentPost.data.title}
									</h1>

									{/* Post Meta */}
									<div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
										<div className="flex items-center gap-2">
											<User className="h-4 w-4" />
											<span className="text-teal-300">
												{currentPost.data.postedBy}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Calendar className="h-4 w-4" />
											<span>{formatDate(currentPost.data.postedAt)}</span>
										</div>
										<div className="flex items-center gap-2">
											<Eye className="h-4 w-4" />
											<span>2.4k views</span>
										</div>
									</div>
								</div>

								{/* Post Actions */}
								<div className="mb-12 flex items-center gap-6 border-gray-800 border-y py-6">
									<Button
										onClick={() => setIsLiked(!isLiked)}
										className={`flex items-center gap-2 transition-colors ${isLiked ? "text-pink-400" : "text-gray-400 hover:text-pink-300"}`}
									>
										<Heart
											className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
										/>
										<span>147</span>
									</Button>
									<Button className="flex items-center gap-2 text-gray-400 transition-colors hover:text-teal-300">
										<MessageCircle className="h-5 w-5" />
										<span>23</span>
									</Button>
									<Button className="flex items-center gap-2 text-gray-400 transition-colors hover:text-blue-300">
										<Share2 className="h-5 w-5" />
										<span>Share</span>
									</Button>
								</div>

								{/* Post Content */}
								<article
									className="prose prose-invert max-w-none"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <>
									dangerouslySetInnerHTML={{ __html: currentPost.data.content }}
								/>

								{/* Author Card */}
								<div className="mt-16 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-8">
									<div className="flex items-center gap-4">
										<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-teal-400">
											<User className="h-8 w-8 text-white" />
										</div>
										<div>
											<h3 className="mb-1 font-bold text-white text-xl">
												{currentPost.data.postedBy}
											</h3>
											<p className="mb-3 text-gray-400">
												Lead AI Research Scientist
											</p>
											<p className="text-gray-300 text-sm">
												Pioneering the intersection of artificial intelligence
												and dermatological science to create personalized
												skincare solutions for the future.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}
