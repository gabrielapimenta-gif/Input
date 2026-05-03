import { z } from "zod";

export const movieSchema = z.object({
  titulo: z.string().min(2, "Título obrigatório"),
  ano: z.string().min(4, "Ano inválido"),
  duracao: z.string().min(2, "Duração obrigatória"),
  sinopse: z.string().min(10, "Sinopse muito curta"),
  classificacao: z.string().min(1, "Classificação obrigatória"),
  direcao: z.string().min(2, "Direção obrigatória"),
  producao: z.string().min(2, "Produção obrigatória"),
  roteiro: z.string().min(2, "Roteiro obrigatório"),
  elenco: z.string().min(2, "Elenco obrigatório"),
  categoria: z.string().min(2, "Categoria obrigatória"),
  genero: z.string().min(2, "Gênero obrigatório"),
  linkFilme: z.string().url("Link inválido"),
  linkTrailer: z.string().url("Link inválido"),
});

export type MovieFormData = z.infer<typeof movieSchema>;