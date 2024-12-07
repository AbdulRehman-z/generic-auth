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
import { useState, useTransition } from "react";
import { loginAction } from "../../actions/auth-action";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    error?: string;
    success?: string;
  }>({});

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setFormStatus({}); // Clear previous status

    startTransition(async () => {
      try {
        const response = await loginAction(data);
        setFormStatus(
          response.error
            ? { error: response.error }
            : { success: response.success }
        );
      } catch (error) {
        setFormStatus({
          error: error instanceof Error ? error.message : "An error occurred",
        });
      }
    });
  };

  return (
    <CardWrapper
      titleFooter="Sign up"
      titleHeader="Sign in to Acme Inc"
      backButtonHref="/auth/signup"
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
            disabled={isPending}
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
            disabled={isPending}
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
          <FormError message={formStatus.error} />
          <FormSuccess message={formStatus.success} />
          <div className="pt-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Sign in"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
