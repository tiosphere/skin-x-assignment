import { relations } from "drizzle-orm";
import {
	index,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// Posts table
export const posts = pgTable(
	"posts",
	{
		id: serial("id").primaryKey(),
		title: text("title").notNull(),
		content: text("content").notNull(), // HTML content
		postedAt: timestamp("posted_at").notNull(),
		postedBy: varchar("posted_by", { length: 255 }).notNull(),
	},
	(table) => [
		index("posted_by_idx").on(table.postedBy),
		index("posted_at_idx").on(table.postedAt),
	],
);

// Tags table (normalized)
export const tags = pgTable("tags", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull().unique(),
});

// Junction table for many-to-many relationship between posts and tags
export const postTags = pgTable(
	"post_tags",
	{
		postId: serial("post_id")
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		tagId: serial("tag_id")
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("post_id_idx").on(table.postId),
		index("tag_id_idx").on(table.tagId),
	],
);

// Define relations
export const postsRelations = relations(posts, ({ many }) => ({
	postTags: many(postTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
	post: one(posts, {
		fields: [postTags.postId],
		references: [posts.id],
	}),
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id],
	}),
}));
