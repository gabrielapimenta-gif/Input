import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { register } from "../services/authService";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleRegister() {
    await register(
      nome.trim(),
      email.trim(),
      senha.trim()
    );

    router.push("/");
  }

  return (
    <View style={styles.container}>
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
});