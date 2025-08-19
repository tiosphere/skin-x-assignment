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
				tags: z.int().array().optional(),
			}),
		)
		.handler(async ({ input }) => {
			return await db.query.posts.findMany({
				where(f, o) {
					if (input.tags?.length) {
						const conditions = input.tags.map((_) => o.eq(postTags.tagId, _));
						return o.inArray(
							f.id,
							db
								.select({ postId: postTags.postId })
								.from(postTags)
								.where(o.and(...conditions)),
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
};
