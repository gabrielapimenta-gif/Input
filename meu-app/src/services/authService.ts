import { api } from "./api";

export async function login(email: string, senha: string) {
  const response = await api.get(
    `/users?email=${email}&senha=${senha}`
  );

  return response.data[0];
}