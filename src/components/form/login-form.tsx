"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileRequest, UserProfileRequestSchema } from "@/types/user-profile";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@/components/ui/button-with-loading";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const redirectUrl = callbackUrl || "/dashboard";

  // 1. Define your form.
  const form = useForm<UserProfileRequest>({
    resolver: zodResolver(UserProfileRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UserProfileRequest) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (!result?.ok) {
      return toast.error(result?.error);
    }

    toast.success("Đăng nhập thành công");
    return router.push(redirectUrl);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng Nhập</CardTitle>
        <CardDescription>Nhập tên username của bạn dưới đây để đăng nhập</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton type="submit" className="w-full" loading={form.formState.isSubmitting}>
                Đăng nhập
              </LoadingButton>
            </div>
          </form>
        </Form>

        {/* <div className="mt-4 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link href="/signup" className="underline">
            Đăng Ký
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
