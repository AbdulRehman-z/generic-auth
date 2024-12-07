import NextAuth from "next-auth";
import Credientials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcryptjs";
import { db } from "@/db";
import { loginSchema } from "./schemas/auth-schema";
import { getUserByEmail } from "./data/data-service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credientials({
      async authorize(credientials) {
        const validatedFields = loginSchema.safeParse(credientials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isValid = await compare(password, user.password);
          if (isValid) return { ...user, id: user.id.toString() };
        }

        return null;
      },
    }),
  ],
});
