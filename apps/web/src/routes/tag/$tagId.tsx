import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Paginate from "@/components/paginate";
import { PostItem } from "@/components/post-item";
import { authClient } from "@/lib/auth-client";
import { queryAllTags, queryPostList } from "@/lib/query";
import { findTagById } from "@/lib/utils";

export const Route = createFileRoute("/tag/$tagId")({
	component: RouteComponent,
});

function RouteComponent() {
	// Check Auth
	const { data: session, isPending } = authClient.useSession();
	const navigate = Route.useNavigate();
	useEffect(() => {
		if (!session && !isPending) {
			navigate({ to: "/login" });
		}
	}, [session, isPending]);

	// Loading Data
	const [pageNumber, setPageNumber] = useState(1);
	const { tagId } = useParams({ strict: false });
	const allPosts = queryPostList(pageNumber, tagId ? +tagId : undefined);
	const allTags = queryAllTags();

	function nextPage() {
		setPageNumber(pageNumber + 1);
	}

	function previewPage() {
		if (pageNumber > 1) setPageNumber(pageNumber - 1);
	}

	if (tagId && allTags.isSuccess && allPosts.isSuccess) {
		const currentTag = findTagById(+tagId, allTags.data);
		return (
			<div className="min-h-screen bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-teal-900/20 text-white">
				{/* Hero Section */}
				<section className="relative flex items-center justify-center py-20">
					<div className="absolute inset-0 opacity-30">
						<div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-teal-900/20" />
						<div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-pink-500/10 blur-3xl" />
						<div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-teal-500/10 blur-3xl delay-1000" />
					</div>

					<div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
						<h1 className="mb-6 bg-gradient-to-r from-white via-teal-300 to-pink-300 bg-clip-text font-black text-5xl text-transparent md:text-6xl">
							{currentTag
								? `Posts Tagged: ${currentTag.name}`
								: "Explore Our Latest Posts"}
						</h1>

						<p className="mx-auto max-w-2xl text-gray-300 text-lg">
							{currentTag
								? `Discover all posts related to "${currentTag.name}".`
								: "Stay updated with the newest insights, tutorials, and stories from our community."}
						</p>
					</div>
				</section>

				{/* Post List */}
				<section className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
					<Paginate
						previewPage={previewPage}
						currentPage={pageNumber}
						nextPage={nextPage}
					/>

					<div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{allPosts.data.map((post) => (
							<PostItem key={post.id} post={post} tags={allTags.data} />
						))}
					</div>

					<Paginate
						previewPage={previewPage}
						currentPage={pageNumber}
						nextPage={nextPage}
					/>
				</section>
			</div>
		);
	}
	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-teal-900/20 text-white" />
	);
}
