import z from "zod/v4";
import { db } from "@/db";
import { postTags } from "@/db/schema/post";
import { protectedProcedure } from "@/lib/orpc";

export const postRouter = {
	getAll: protectedProcedure
		.input(
			z.object({
				page: z.int().min(1).default(1),
				size: z.int().min(10).max(100).default(20),
				tag: z.int().optional(),
			}),
		)
		.handler(async ({ input }) => {
			return await db.query.posts.findMany({
				where(fields, operators) {
					if (input.tag) {
						return operators.inArray(
							fields.id,
							db
								.select({ postId: postTags.postId })
								.from(postTags)
								.where(operators.eq(postTags.tagId, input.tag)),
						);
					}
					return undefined;
				},
				with: {
					postTags: true,
				},
				limit: input.size,
				offset: (input.page - 1) * input.size,
				orderBy(fields, operators) {
					return operators.desc(fields.postedAt);
				},
			});
		}),
	getById: protectedProcedure
		.input(z.object({ postId: z.int().min(1) }))
		.handler(async ({ input }) => {
			return await db.query.posts.findFirst({
				where(fields, operators) {
					return operators.eq(fields.id, input.postId);
				},
				with: {
					postTags: true,
				},
			});
		}),
};
