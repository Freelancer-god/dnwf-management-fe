import { fetcher, wait } from "@/lib/utils";
import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_BE_URL;

export const fetchUsers = async () => {
  return await fetcher<User[]>(`${BASE_URL}/users`);
};
