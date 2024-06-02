import { SignupForm } from "@/components/form/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
