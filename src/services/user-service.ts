import { fetcher, wait } from "@/lib/utils";
import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_BE_URL;

export const fetchUsers = async () => {
  try {
    return await fetcher<User[]>(`${BASE_URL}/users`);
  } catch (error) {
    console.log("🚀 ~ fetchUsers ~ error:", error)
  }
};
