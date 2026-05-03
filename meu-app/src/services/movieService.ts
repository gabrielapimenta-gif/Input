import { api } from "./api";

export async function getMovies() {
  const response = await api.get("/movies");
  return response.data;
}

export async function deleteMovie(id: string) {
  await api.delete(`/movies/${id}`);
}

export async function createMovie(movie: any) {
  const response = await api.post("/movies", movie);
  return response.data;
}

export async function getMovieById(id: string) {
  const response = await api.get(`/movies/${id}`);
  return response.data;
}

export async function updateMovie(id: string, data: any) {
  const response = await api.put(`/movies/${id}`, data);
  return response.data;
}