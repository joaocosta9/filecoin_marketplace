import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle("postgres://localhost:5432/filecoin_marketplace");
