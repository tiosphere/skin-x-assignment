import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Tag } from "./schema";

export const VITE_SERVER_URL =
	import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function findTagById(id: number, allTags: Tag[]) {
	// biome-ignore lint/style/noNonNullAssertion: <>
	return allTags.find((t) => t.id === id)!;
}
