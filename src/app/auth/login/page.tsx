import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="w-full lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
