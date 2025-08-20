import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Tag } from "./schema";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function findTagById(id: number, allTags: Tag[]) {
	// biome-ignore lint/style/noNonNullAssertion: <>
	return allTags.find((t) => t.id === id)!;
}
