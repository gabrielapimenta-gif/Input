import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
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
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

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
    const [classificacao, setClassificacao] = useState("");
    const [genero, setGenero] = useState("");
    const [categoria, setCategoria] = useState("");
    const [capa, setCapa] = useState("");
    const [arquivoFilme, setArquivoFilme] = useState("");
    const [arquivoTrailer, setArquivoTrailer] = useState("");
    const [titulo, setTitulo] = useState("");
    const [ano, setAno] = useState("");
    const [duracao, setDuracao] = useState("");
    const [roteiro, setRoteiro] = useState("");
    const [direcao, setDirecao] = useState("");
    const [producao, setProducao] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [direcaoFotografia, setDirecaoFotografia] = useState("");
    const [montagem, setMontagem] = useState("");
    const [direcaoArte, setDirecaoArte] = useState("");
    const [mixagem, setMixagem] = useState("");
    const [somDireto, setSomDireto] = useState("");
    const [figurino, setFigurino] = useState("");
    const [nomeAtores, setNomeAtores] = useState("");
    const [trilhaSonora, setTrilhaSonora] = useState("");


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

    async function selecionarImagem() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
        });

        if (!result.canceled) {
            setCapa(result.assets[0].uri);
        }
    }

    function removerImagem() {
        setCapa("");
    }

    async function selecionarFilme() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "video/mp4",
            copyToCacheDirectory: true,
        });

        if (!result.canceled) {
            setArquivoFilme(result.assets[0].uri);
        }
    }

    function removerFilme() {
        setArquivoFilme("");
    }

    async function selecionarTrailer() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "video/mp4",
            copyToCacheDirectory: true,
        });

        if (!result.canceled) {
            setArquivoTrailer(result.assets[0].uri);
        }
    }

    function removerTrailer() {
        setArquivoTrailer("");
    }

    async function salvarFilme() {
        const novoFilme = {
            titulo,
            ano,
            duracao,
            sinopse,
            direcao,
            producao,
            roteiro,
            direcaoFotografia,
            montagem,
            direcaoArte,
            mixagem,
            somDireto,
            figurino,
            nomeAtores,
            classificacao,
            genero,
            categoria,
            capa,
            arquivoFilme,
            arquivoTrailer,
        };

        await createMovie(novoFilme);

        router.replace("/dashboard");
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

                <Input
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Título"
                />

                <Input
                    value={ano}
                    onChangeText={setAno}
                    placeholder="Ano"
                />

                <Input
                    value={duracao}
                    onChangeText={setDuracao}
                    placeholder="Duração"
                />

                <Input
                    value={sinopse}
                    onChangeText={setSinopse}
                    placeholder="Sinopse"
                />
                <Picker
                    selectedValue={classificacao}
                    onValueChange={setClassificacao}
                >
                    <Picker.Item label="Livre" value="Livre" />
                    <Picker.Item label="10 anos" value="10" />
                    <Picker.Item label="12 anos" value="12" />
                    <Picker.Item label="14 anos" value="14" />
                    <Picker.Item label="16 anos" value="16" />
                    <Picker.Item label="18 anos" value="18" />
                </Picker>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ficha Técnica</Text>

                <Input
                    value={direcao}
                    onChangeText={setDirecao}
                    placeholder="Direção"
                />

                <Input
                    value={producao}
                    onChangeText={setProducao}
                    placeholder="Produção"
                />

                <Input
                    value={roteiro}
                    onChangeText={setRoteiro}
                    placeholder="Roteiro"
                />

                <Input
                    value={direcaoFotografia}
                    onChangeText={setDirecaoFotografia}
                    placeholder="Direção de Fotografia"
                />

                <Input
                    value={montagem}
                    onChangeText={setMontagem}
                    placeholder="Montagem"
                />

                <Input
                    value={direcaoArte}
                    onChangeText={setDirecaoArte}
                    placeholder="Direção de Arte"
                />

                <Input
                    value={trilhaSonora}
                    onChangeText={setTrilhaSonora}
                    placeholder="Trilha Sonora"
                />

                <Input
                    value={mixagem}
                    onChangeText={setMixagem}
                    placeholder="Mixagem"
                />
                <Input
                    value={somDireto}
                    onChangeText={setSomDireto}
                    placeholder="Som Direto"
                />
                <Input
                    value={figurino}
                    onChangeText={setFigurino}
                    placeholder="Figurino"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Elenco</Text>

                <Input
                    value={nomeAtores}
                    onChangeText={setNomeAtores}
                    placeholder="Nome dos atores"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Categorias e Gênero</Text>

                <Picker
                    selectedValue={categoria}
                    onValueChange={setCategoria}
                >
                    <Picker.Item label="Ficção" value="Ficção" />
                    <Picker.Item label="Animação" value="Animação" />
                    <Picker.Item label="Documentário" value="Documentário" />
                    <Picker.Item label="Experimental" value="Experimental" />
                    <Picker.Item label="Foto Filme" value="Foto Filme" />
                    <Picker.Item label="Híbrido" value="Híbrido" />
                </Picker>
                <Picker
                    selectedValue={genero}
                    onValueChange={setGenero}
                >
                    <Picker.Item label="Drama" value="Drama" />
                    <Picker.Item label="Comédia" value="Comédia" />
                    <Picker.Item label="Documentário" value="Documentário" />
                    <Picker.Item label="Terror" value="Terror" />
                    <Picker.Item label="Suspense" value="Suspense" />
                    <Picker.Item label="Romance" value="Romance" />
                    <Picker.Item label="Experimental" value="Experimental" />
                </Picker>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Mídia e Publicação</Text>

                <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={selecionarFilme}
                >
                    <Text style={styles.uploadText}>
                        {arquivoFilme
                            ? "Arquivo do filme selecionado"
                            : "Selecionar filme (.mp4)"}
                    </Text>
                </TouchableOpacity>

                {arquivoFilme ? (
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={removerFilme}
                    >
                        <Text style={styles.removeButtonText}>
                            Excluir filme
                        </Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={selecionarTrailer}
                >
                    <Text style={styles.uploadText}>
                        {arquivoTrailer
                            ? "Trailer selecionado"
                            : "Selecionar trailer (.mp4)"}
                    </Text>
                </TouchableOpacity>

                {arquivoTrailer ? (
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={removerTrailer}
                    >
                        <Text style={styles.removeButtonText}>
                            Excluir trailer
                        </Text>
                    </TouchableOpacity>
                ) : null}
                <View>
                    <TouchableOpacity
                        style={styles.uploadArea}
                        onPress={selecionarImagem}
                    >
                        {capa ? (
                            <Image
                                source={{ uri: capa }}
                                style={styles.preview}
                            />
                        ) : (
                            <Text style={styles.uploadText}>
                                Clique para inserir a capa do filme
                            </Text>
                        )}
                    </TouchableOpacity>

                    {capa ? (
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={removerImagem}
                        >
                            <Text style={styles.removeButtonText}>
                                Excluir imagem
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.replace("/dashboard")}
                >
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <Button
                    title="Salvar filme"
                    onPress={salvarFilme}
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

    uploadArea: {
        height: 200,
        borderWidth: 1,
        borderColor: "#444",
        borderStyle: "dashed",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    uploadText: {
        color: "#999",
    },

    preview: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },

    removeButton: {
        marginTop: 10,
        backgroundColor: "#222",
        padding: 12,
        borderRadius: 8,
    },

    removeButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});