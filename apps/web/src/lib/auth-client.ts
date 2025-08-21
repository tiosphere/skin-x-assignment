import { createAuthClient } from "better-auth/react";
import { VITE_SERVER_URL } from "./utils";

export const authClient = createAuthClient({
	baseURL: VITE_SERVER_URL,
});
