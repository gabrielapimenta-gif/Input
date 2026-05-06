import { api } from "./api";

export async function login(
  email: string,
  senha: string
) {
  const response = await api.get("/users");

  const users = response.data;

  const userByEmail = users.find(
    (u: any) => u.email === email
  );

  if (!userByEmail) {
    return {
      error: "EMAIL_NOT_FOUND",
    };
  }

  if (userByEmail.senha !== senha) {
    return {
      error: "WRONG_PASSWORD",
    };
  }

  return {
    user: userByEmail,
  };
}