"use server";

import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { db } from "../db";
import { users } from "../db/schema";
// import { compare, hash } from "bcrypt";

export const registerAction = async (
  formData: z.infer<typeof registerSchema>
) => {
  console.log(formData);
  const parsedData = registerSchema.safeParse(formData);
  if (!parsedData.success) {
    return { error: "Invalid data" };
  }

  const { name, email, password } = parsedData.data;
  // const hashedPassword = await hash(password, 10);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // try {
  //   const user = await db
  //     .insert(users)
  //     .values({
  //       email: email,
  //       name: name,
  //       password: hashedPassword,
  //     })
  //     .returning({
  //       id: users.id,
  //     });

  //   console.log(user);
  // } catch (error: any) {
  //   console.error(error);
  //   if (error.code === "23505") {
  //     return { error: "Email already exists" };
  //   }
  //   return { error: "Something went wrong" };
  // }

  return { success: "Email sent!" };
};

export const loginAction = async (formData: z.infer<typeof loginSchema>) => {
  console.log(formData);
  const parsedData = loginSchema.safeParse(formData);
  if (!parsedData.success) {
    return { error: "Invalid data" };
  }

  // const { email, password } = parsedData.data;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const user = await db.query.users.findFirst({
  //   columns: {
  //     id: true,
  //     email: true,
  //     password: true,
  //   },
  // });

  // if (!user) {
  //   return { error: "User not found" };
  // }

  // const passwordMatch = await compare(password, user.password!);

  // if (!passwordMatch) {
  //   return { error: "Invalid password" };
  // }

  return { success: "Logged in" };
};
