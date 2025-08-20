import { db } from "@/db";
import { protectedProcedure } from "@/lib/orpc";

export const tagRouter = {
	getAll: protectedProcedure.handler(async () => {
		return await db.query.tags.findMany({
			orderBy(fields, operators) {
				return operators.asc(fields.id);
			},
		});
	}),
};
