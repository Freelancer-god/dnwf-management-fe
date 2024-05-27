"use client";

import { redirect } from "next/navigation";

export default function LandingPage() {
  // Hard coded redirect cuz we're not using landingpage right now
  redirect("/dashboard");
}
