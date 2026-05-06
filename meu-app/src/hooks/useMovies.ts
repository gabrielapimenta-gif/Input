import { useState, useCallback } from "react";
import { getMovies } from "../services/movieService";
import { useFocusEffect } from "expo-router";

export function useMovies() {
    const [movies, setMovies] = useState<any[]>([]);

    async function loadMovies() {
        const data = await getMovies();
        
        console.log("Filmes carregados:", data);
        
        setMovies(data);
    }

    useFocusEffect(
        useCallback(() => {
            loadMovies();
        }, [])
);

    return {
        movies,
        loadMovies,
    };
}