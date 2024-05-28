import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_BE_URL;

export const getUsers = async () => {
  return fetcher<User[]>(`${BASE_URL}/users`);
};
