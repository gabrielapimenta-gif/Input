import { View, Text, StyleSheet } from "react-native";

type Props = {
  movie: any;
};

export function MovieCard({ movie }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{movie.titulo}</Text>
      <Text style={styles.info}>{movie.ano}</Text>
      <Text style={styles.info}>{movie.genero}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    color: "#999",
    marginTop: 4,
  },
});