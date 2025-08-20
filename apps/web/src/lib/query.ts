import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

const sec = 1000;
const min = 60 * sec;

export function queryPostList(page: number, tag?: number, size = 18) {
	return useQuery(
		orpc.post.getAll.queryOptions({
			input: { page, size, tag },
			staleTime: 5 * min,
		}),
	);
}

export function queryPostById(postId: number) {
	return useQuery(
		orpc.post.getById.queryOptions({
			input: { postId },
			staleTime: 10 * min,
		}),
	);
}

export function queryAllTags() {
	return useQuery(
		orpc.tag.getAll.queryOptions({
			staleTime: 30 * min,
		}),
	);
}
