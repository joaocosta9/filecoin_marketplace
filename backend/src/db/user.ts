import { db } from "./index.js";
import { products, users } from "./schema.js";
import { eq } from "drizzle-orm";

export const saveUser = async (address: string) => {
  await db.insert(users).values({ address }).onConflictDoNothing();
};

export const saveProduct = async (cid: string, address: string) => {
  await db.insert(products).values({
    id: crypto.randomUUID(),
    cid,
    address,
  });
};

export const getUserProducts = async (address: string) => {
  return await db.select().from(products).where(eq(products.address, address));
};
