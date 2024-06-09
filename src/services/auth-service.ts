import { UserProfile } from "@/types/user-profile";
import { fetcher } from "@/lib/axios";

export const login = async ({ username, password }) => {
  return await fetcher<{
    data: UserProfile;
    token: string;
  }>({
    url: `/login`,
    method: "POST",
    data: {
      username,
      password,
    },
  });
};
