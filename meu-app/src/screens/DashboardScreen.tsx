import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import { CardMovie } from "../components/CardMovie";
import { deleteMovie } from "../services/movieService";
import { getUser, logout } from "../hooks/useAuth";
import { User } from "../types/user";

export default function DashboardScreen() {
    const [filmes, setFilmes] = useState([]);
    const [user, setUser] = useState<User | null>(null);

    async function loadMovies() {
        const data = await getMovies();
        setFilmes(data);
    }

    async function loadUser() {
        const data = await getUser();
        
        if (!data) {
            router.push("/");
            return;
        }
        
        setUser(data);
    }

    async function handleDelete(id: string) {
        await deleteMovie(id);
        loadMovies();
    }

    async function handleLogout() {
        await logout();
        router.push("/");
    }

    useEffect(() => {
        loadUser();
        loadMovies();
     }, []);;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.logo}>UNA CINE+</Text>
                    <Text style={styles.subtitle}>Painel Administrativo</Text>
                </View>

                <View style={styles.rightHeader}>
                    <Text style={styles.user}>Olá, {user?.nome}</Text>

                    <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    >
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.topContent}>
                    <View>
                        <Text style={styles.title}>Meus Filmes</Text>
                        <Text style={styles.description}>
                            {filmes.length} filmes cadastrados
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.newMovieButton}
                        onPress={() => router.push("/novo-filme")}
                    >
                        <Text style={styles.newMovieText}>+ Novo Filme</Text>
                    </TouchableOpacity>
                </View>

                {filmes.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyTitle}>
                            Nenhum filme cadastrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Comece cadastrando seu primeiro curta-metragem
                        </Text>

                        <TouchableOpacity
                            style={styles.firstButton}
                            onPress={() => router.push("/novo-filme")}
                        >
                            <Text style={styles.firstButtonText}>
                                Cadastrar Primeiro Filme
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    filmes.map((movie: any) => (
                        <CardMovie
                            key={movie.id}
                            movie={movie}
                            onDelete={() => handleDelete(movie.id)}
                        />
                    ))
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    header: {
        padding: 20,
        backgroundColor: "#111",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    subtitle: {
        color: "#777",
        fontSize: 12,
    },

    rightHeader: {
        alignItems: "center",
    },

    user: {
        color: "#fff",
        marginBottom: 10,
    },

    logoutButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },

    content: {
        padding: 20,
    },

    topContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },

    description: {
        color: "#777",
        marginTop: 5,
    },

    newMovieButton: {
        backgroundColor: "#E50914",
        padding: 12,
        borderRadius: 8,
    },

    newMovieText: {
        color: "#fff",
        fontWeight: "bold",
    },

    emptyCard: {
        backgroundColor: "#111",
        marginTop: 40,
        padding: 40,
        borderRadius: 12,
        alignItems: "center",
    },

    emptyTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },

    emptyText: {
        color: "#888",
        marginBottom: 20,
        textAlign: "center",
    },

    firstButton: {
        backgroundColor: "#E50914",
        padding: 12,
        borderRadius: 8,
    },

    firstButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});