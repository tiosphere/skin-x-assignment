import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Paginate from "@/components/paginate";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/post/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Check Auth
	const { data: session, isPending } = authClient.useSession();
	const navigate = Route.useNavigate();
	useEffect(() => {
		if (!session && !isPending) {
			navigate({
				to: "/login",
			});
		}
	}, [session, isPending]);
	// Loading Data
	const [pageNumber, setPageNumber] = useState(1);
	const allPosts = useQuery(
		orpc.post.getAll.queryOptions({ input: { page: pageNumber, size: 20 } }),
	);
	function nextPage() {
		setPageNumber(pageNumber + 1);
	}

	function previewPage() {
		if (pageNumber > 1) {
			setPageNumber(pageNumber + 1);
		}
	}

	return (
		<div className="grid w-full grid-cols-1 gap-4">
			<Paginate
				previewPage={previewPage}
				currentPage={pageNumber}
				nextPage={nextPage}
			/>
			<div className="grid grid-cols-1">
				{allPosts.data?.map((_) => (
					<p key={_.id}>{_.id}</p>
				))}
			</div>
			<Paginate
				previewPage={previewPage}
				currentPage={pageNumber}
				nextPage={nextPage}
			/>
		</div>
	);
}
