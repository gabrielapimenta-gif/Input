import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useMovies } from "../hooks/useMovies";
import { deleteMovie } from "../services/movieService";

import { MovieCard } from "../components/MovieCard";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function DashboardScreen() {
    const { movies, loadMovies } = useMovies();

    const [search, setSearch] = useState("");

    const filteredMovies = movies.filter((movie) =>
        movie.titulo
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    async function handleDelete(id: string) {
        Alert.alert(
            "Excluir filme",
            "Deseja realmente excluir este filme?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteMovie(id);

        Alert.alert(
            "Sucesso",
            "Filme removido com sucesso."
        );
    } catch (error) {
        Alert.alert(
            "Erro",
            "Não foi possível excluir o filme."
          );
        }
      },
    },
  ]
);
        loadMovies();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Painel de Filmes
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        router.push("/novo-filme")
                    }
                >
                    <Text style={styles.buttonText}>
                        + Novo Filme
                    </Text>
                </TouchableOpacity>
            </View>

            <Input
                placeholder="Pesquisar por título"
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredMovies}
                keyExtractor={(item) =>
                    String(item.id)
                }
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <MovieCard movie={item} />

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() =>
                                    router.push(`/editar/${item.id}`)
                                }
                            >
                                <Text style={styles.actionText}>
                                    Editar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() =>
                                    handleDelete(item.id)
                                }
                            >
                                <Text style={styles.actionText}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },

    button: {
        backgroundColor: "#E50914",
        padding: 12,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    cardContainer: {
        marginBottom: 20,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 12,
    },

    editButton: {
        flex: 1,
        backgroundColor: "#1A1A1A",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    deleteButton: {
        flex: 1,
        backgroundColor: "#1A1A1A",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
});