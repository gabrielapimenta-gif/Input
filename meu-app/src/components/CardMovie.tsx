import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface Props {
    movie: any;
    onDelete: () => void;
}

export function CardMovie({ movie, onDelete }: Props) {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.title}>{movie.titulo}</Text>

                <Text style={styles.info}>
                    {movie.ano} • {movie.duracao}
                </Text>

                <Text style={styles.genre}>
                    {movie.genero}
                </Text>
            </View>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push(`/editar/${movie.id}`)}
                ></TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#111",
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    info: {
        color: "#999",
        marginTop: 5,
    },

    genre: {
        color: "#E50914",
        marginTop: 10,
        fontWeight: "bold",
    },

    actions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
    },

    editButton: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
    },

    deleteButton: {
        backgroundColor: "#E50914",
        padding: 10,
        borderRadius: 8,
    },

    deleteText: {
        color: "#fff",
    },
});