import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useMovies } from "../hooks/useMovies";
import { MovieCard } from "../components/MovieCard";

export default function DashboardScreen() {
    const { movies } = useMovies();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Painel de Filmes</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/novo-filme")}
                >
                    <Text style={styles.buttonText}>
                        + Novo Filme
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={movies}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <MovieCard movie={item} />
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
        marginBottom: 20,
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
    },

    button: {
        backgroundColor: "#E50914",
        padding: 14,
        borderRadius: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});