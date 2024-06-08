"use client";

import { setAuthToken } from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function ClientTokenProvider({ children }) {
  const session = useSession();
  setAuthToken(session.data?.accessToken);

  return children;
}
