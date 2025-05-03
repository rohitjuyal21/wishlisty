"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import google from "/public/assets/google.png";

export default function Page() {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: z.infer<typeof signinFormSchema>) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirectTo: "/",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <h4 className="font-rowdies mb-8 text-center text-2xl font-bold">
        Sign In
      </h4>
      <Button variant="secondary" onClick={() => signIn("google")}>
        <span className="rounded-full bg-white p-0.5">
          <Image src={google} width={16} height={16} alt="google" />
        </span>
        Sign In with Google
      </Button>
      <div className="my-4 flex items-center">
        <div className="bg-border h-[1px] flex-1"></div>
        <span className="text-muted-foreground mx-2 text-xs">
          Or continue with email
        </span>
        <div className="bg-border h-[1px] flex-1"></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="email" placeholder="Email" {...field} />
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
                <FormControl className="relative">
                  <div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Password"
                      className={cn(
                        "pr-8",
                        form.formState.errors.password &&
                          "border-destructive focus:border-destructive",
                      )}
                      {...field}
                    />
                    {field.value && (
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </span>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
