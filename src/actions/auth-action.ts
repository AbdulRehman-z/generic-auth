"use server";

import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { db } from "../db";
import { users } from "../db/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const signupAction = async (
  formData: z.infer<typeof registerSchema>
) => {
  const validatedFields = registerSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const user = await db
      .insert(users)
      .values({
        email: email,
        name: name,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
      });

    console.log(user);
  } catch (error: any) {
    console.error(error);
    if (error.code === "23505") {
      return { error: "Email already exists" };
    }
    return { error: "Something went wrong" };
  }

  return { success: "Email sent!" };
};

export const loginAction = async (formData: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credientials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }

  return { success: "Logged in" };
};
