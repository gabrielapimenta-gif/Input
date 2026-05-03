import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";

export function useMovies() {
    const [movies, setMovies] = useState<any[]>([]);

    async function loadMovies() {
        const data = await getMovies();
        setMovies(data);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    return {
        movies,
        loadMovies,
    };
}