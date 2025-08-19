import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/index";

export const db = drizzle({
	connection: process.env.DATABASE_URL || "",
	schema: schema,
});
