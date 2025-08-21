import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { VITE_SERVER_URL } from "@/lib/utils";
import type { AppRouterClient } from "../../../server/src/routers/index";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(
				`Error: ${error.message} ${import.meta.env.VITE_SERVER_URL}`,
				{
					action: {
						label: "retry",
						onClick: () => {
							queryClient.invalidateQueries();
						},
					},
				},
			);
		},
	}),
});

export const link = new RPCLink({
	url: `${VITE_SERVER_URL}/api`,
	fetch(url, options) {
		return fetch(url, {
			...options,
			credentials: "include",
		});
	},
});

export const client: AppRouterClient = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
