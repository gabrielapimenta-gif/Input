import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    movieSchema,
    MovieFormData,
} from "../utils/movieSchema";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
    getMovieById,
    updateMovie,
    createMovie,
} from "../services/movieService";

export default function MovieFormScreen() {
  const { id } = useLocalSearchParams();

const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
} = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
});

useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

async function loadMovie() {
    if (!id) return;

    const movie = await getMovieById(String(id));

    setValue("titulo", movie.titulo);
    setValue("ano", movie.ano);
    setValue("duracao", movie.duracao);
    setValue("sinopse", movie.sinopse);
    setValue("classificacao", movie.classificacao);
    setValue("direcao", movie.direcao);
    setValue("producao", movie.producao);
    setValue("roteiro", movie.roteiro);
    setValue("elenco", movie.elenco);
    setValue("categoria", movie.categoria);
    setValue("genero", movie.genero);
    setValue("linkFilme", movie.linkFilme);
    setValue("linkTrailer", movie.linkTrailer);
}

async function onSubmit(data: MovieFormData) {
    if (id) {
        await updateMovie(String(id), data);
    } else {
        await createMovie(data);
    }

    router.push("/dashboard");
}

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.back}>← Voltar</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.title}>
                        {id ? "Editar Filme" : "Novo Filme"}
                    </Text>
                    <Text style={styles.subtitle}>
                        Cadastre um novo curta-metragem
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Informações Básicas</Text>

                <Controller
                    control={control}
                    name="titulo"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Título"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="ano"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Ano"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="duracao"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Duração"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="sinopse"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Sinopse"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="classificacao"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Classificação Indicativa"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ficha Técnica</Text>

                <Controller
                    control={control}
                    name="direcao"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Direção"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Input placeholder="Produção" />
                <Input placeholder="Roteiro" />
                <Input placeholder="Direção de Fotografia" />
                <Input placeholder="Montagem" />
                <Input placeholder="Direção de Arte" />
                <Input placeholder="Trilha Sonora" />
                <Input placeholder="Maquiagem" />
                <Input placeholder="Som Direto" />
                <Input placeholder="Figurino" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Elenco</Text>

                <Input placeholder="Nome dos atores" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Categorias e Gêneros</Text>

                <Input placeholder="Categoria" />
                <Input placeholder="Gênero" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Mídia e Publicação</Text>

                <Input placeholder="Link do Filme" />
                <Input placeholder="Link do Trailer" />
                <Input placeholder="Foto/Capa do Filme" />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                >
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <Button
                    title="Salvar Filme"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </ScrollView>
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

    back: {
        color: "#999",
        marginBottom: 15,
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },

    subtitle: {
        color: "#777",
    },

    card: {
        backgroundColor: "#111",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },

    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    cancelButton: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 8,
        width: "35%",
        alignItems: "center",
    },
});