export type Post = {
	id: number;
	title: string;
	content: string;
	postedAt: Date;
	postedBy: string;
	postTags: {
		postId: number;
		tagId: number;
	}[];
};

export type Tag = {
	id: number;
	name: string;
};
