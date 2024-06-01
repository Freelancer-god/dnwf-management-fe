import { fetcher } from "@/lib/utils";
import { UserProfileResponse } from "@/types/user-profile";

const BASE_URL = process.env.NEXT_BE_URL + "/api/v1";

export const login = async ({ username, password }) => {
  const response = fetcher<UserProfileResponse>(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response;
};
