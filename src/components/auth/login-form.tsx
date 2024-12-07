"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "./card-wrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth-schema";
import { Input } from "../ui/input";

import SubmitButton from "../submit-button";
import { useState } from "react";
import { loginAction } from "../../actions/auth-action";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    console.log(data);

    loginAction(data)
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccess(response.success);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <CardWrapper
      titleFooter="Sign up"
      titleHeader="Sign in to Acme Inc"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back! Please sign in to continue"
      showSocial
    >
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="johndoe@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="pt-4">
            <SubmitButton pendingLabel="logging in...">Login</SubmitButton>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
