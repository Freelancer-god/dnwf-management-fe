"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "@/types/user-profile";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/button-with-loading";
import { login } from "@/actions/auth-action";
import { toast } from "sonner";

export default function LoginForm() {
  // 1. Define your form.
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = await login(values);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Đăng nhập thành công");
    }
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
