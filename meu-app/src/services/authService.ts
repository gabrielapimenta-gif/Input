import { api } from "./api";

export async function login(email: string, senha: string) {
  const response = await api.get(
    `/users?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
  );

  return response.data[0];
}