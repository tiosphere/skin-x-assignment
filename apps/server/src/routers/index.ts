import type { RouterClient } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../lib/orpc";
import { postRouter } from "./post";
import { tagRouter } from "./tag";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	post: postRouter,
	tag: tagRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
