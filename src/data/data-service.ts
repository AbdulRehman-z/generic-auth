import { db, users } from "@/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async function (
  email: string
): Promise<typeof users.$inferSelect | null> {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user.at(0) ?? null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email");
  }
};
