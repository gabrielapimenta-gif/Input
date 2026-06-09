import { View, Text, StyleSheet, Alert, TouchableOpacity, } from "react-native";
import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { register } from "../services/authService";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleRegister() {
    const data = {
      nome: nome.trim(),
      email: email.trim(),
      senha: senha.trim(),
    };

    if (!data.nome) {
      setErro("Informe o nome");
      return;
    }

    if (!data.email) {
      setErro("Informe o e-mail");
      return;
    }

    if (!data.senha) {
      setErro("Informe a senha");
      return;
    }

    try {
      const result = await register(
        data.nome,
        data.email,
        data.senha
      );

      if (result.error === "EMAIL_ALREADY_EXISTS") {
        setErro("Este e-mail já está cadastrado");
        return;
      }

      setErro("");

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso!"
      );

      router.push("/.");
    } catch (error) {
      setErro("Erro ao cadastrar usuário");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/.")}
        >
          <Text style={styles.back}>
            ← Voltar para Login
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.logo}>UNA CINE+</Text>
      <Text style={styles.subtitle}>Cadastro</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Input
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <Input
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <Input
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro ? (
          <Text style={styles.errorText}>
            {erro}
          </Text>
        ) : null}

        <Button
          title="Cadastrar"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    color: "#E50914",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
  },
  header: {
    marginBottom: 20,
  },
  back: {
    color: "#999",
    fontSize: 16,
  },
  errorText: {
    color: "#ff4d4f",
    backgroundColor: "#2a0d0d",
    borderWidth: 1,
    borderColor: "#ff4d4f",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});