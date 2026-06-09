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

export async function register(
  nome: string,
  email: string,
  senha: string
) {
  const response = await api.get("/users");

  const users = response.data;

  const emailExists = users.find(
    (u: any) =>
      u.email.toLowerCase() ===
      email.toLowerCase()
  );

  if (emailExists) {
    return {
      error: "EMAIL_ALREADY_EXISTS",
    };
  }

  const newUser = await api.post("/users", {
    nome,
    email,
    senha,
  });

  return {
    user: newUser.data,
  };
}