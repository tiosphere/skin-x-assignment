import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { link, type orpc } from "@/utils/orpc";
import type { AppRouterClient } from "../../../server/src/routers";
import "../index.css";
import { Footer } from "@/components/footer";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "skin-x-assignment",
			},
			{
				name: "description",
				content: "skin-x-assignment is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	const isFetching = useRouterState({
		select: (s) => s.isLoading,
	});

	const [client] = useState<AppRouterClient>(() => createORPCClient(link));
	const [_] = useState(() => createTanstackQueryUtils(client));

	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				storageKey="vite-ui-theme"
			>
				<div className="grid h-svh grid-rows-[auto_1fr]">
					<Header />
					<main className="h-full">{isFetching ? <Loader /> : <Outlet />}</main>
					<Footer />
				</div>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
		</>
	);
}
