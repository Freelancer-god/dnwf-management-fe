"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (error.message) toast.error(error.message);
    console.error(error.message);
  }, [error]);

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div className="relative flex h-full w-full justify-center">
        <Image layout="fill" src="/images/illustrations/404.svg" alt="astronaut image" />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Đã xảy ra lỗi
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          Ôi! Có vẻ như bạn đã nhấp vào một liên kết không đúng. Nếu bạn nghĩ rằng đây là vấn đề của chúng tôi, vui lòng
          cho chúng tôi biết
        </p>
        <Button onClick={reset}>
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          Tải lại
        </Button>
      </div>
    </div>
  );
}
