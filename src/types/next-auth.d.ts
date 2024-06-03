import { UserProfile } from "@/types/user-profile";

declare module "next-auth" {
  interface Session {
    user: UserProfile;
    accessToken: string;
    expires: string;
  }
}
