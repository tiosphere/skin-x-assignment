import fs from "node:fs";
import path from "node:path";
import { db } from "./db";
import { posts, postTags, tags } from "./db/schema/post";

type RawPost = {
	title: string;
	content: string;
	postedAt: string;
	postedBy: string;
	tags: string[];
};

type Post = {
	title: string;
	content: string;
	postedAt: Date;
	postedBy: string;
	tags: string[];
};

function readJsonFile(): Post[] {
	const filePath = path.join(__dirname, "..", "posts.json");
	const data = fs.readFileSync(filePath, "utf8");
	const raw: RawPost[] = JSON.parse(data);
	return raw.map((r) => ({
		...r,
		postedAt: new Date(r.postedAt),
	}));
}

async function insertTags(tagSet: Set<string>): Promise<Map<string, number>> {
	const result = new Map<string, number>();
	for (const tag of tagSet) {
		const newTag = (await db.insert(tags).values({ name: tag }).returning()).at(
			0,
		);
		if (newTag) result.set(newTag.name, newTag.id);
	}
	return result;
}

async function insertPost(post: Post, tagMap: Map<string, number>) {
	const { tags: localTags, ...rest } = post;
	db.transaction(async (tx) => {
		const newPost = (await tx.insert(posts).values(rest).returning()).at(0);
		if (!newPost) {
			tx.rollback();
			return;
		}
		const tagsId = localTags.map((_) => tagMap.get(_));
		tagsId.forEach(async (id) => {
			await tx.insert(postTags).values({
				postId: newPost.id,
				tagId: id,
			});
		});
	});
}

async function seed() {
	const tagSet = new Set<string>();
	const allPosts = readJsonFile();
	for (const post of allPosts) {
		post.tags.forEach((_) => {
			tagSet.add(_);
		});
	}
	const tagMap = await insertTags(tagSet);
	for (const post of allPosts) {
		await insertPost(post, tagMap);
	}
}

await seed();
