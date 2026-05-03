import { api } from "./api";

export async function login(email: string, senha: string) {
  const response = await api.get("/users");

  console.log("Todos usuários:", response.data);

  const user = response.data.find(
    (u: any) =>
      u.email === email && u.senha === senha
  );

  return user;
}

export async function register(
  nome: string,
  email: string,
  senha: string
) {
  const response = await api.post("/users", {
    nome,
    email,
    senha,
  });

  return response.data;
}