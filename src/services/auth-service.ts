import { UserProfile } from "@/types/user-profile";
import { fetcherLogin } from "@/lib/axios";

export const login = async ({ username, password }) => {
  return await fetcherLogin<{
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
