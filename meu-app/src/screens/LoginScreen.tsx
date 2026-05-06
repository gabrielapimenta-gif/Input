import { View, Text, StyleSheet, Alert } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { login } from "../services/authService";
import { saveUser } from "../hooks/useAuth";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
  const result = await login(
    email.trim(),
    senha.trim()
  );

  if (result.error === "EMAIL_NOT_FOUND") {
    Alert.alert(
      "Email incorreto",
      "O Email está incorreto. Tente novamente."
    );
    return;
  }

  if (result.error === "WRONG_PASSWORD") {
    Alert.alert(
      "Senha incorreta",
      "A senha está incorreta. Tente novamente."
    );
    return;
  }

  if (result.user) {
    await saveUser(result.user);
    router.push("/dashboard");
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>UNA CINE+</Text>
      <Text style={styles.subtitle}>Área Administrativa</Text>

      <View style={styles.card}>
        <View style={styles.tabs}>
          <Text style={styles.activeTab}>Login</Text>
          <Text
            style={styles.tab}
            onPress={() => router.push("/cadastro")}
          >
            Cadastrar
          </Text>
        </View>

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

        <Button title="Entrar" onPress={handleLogin} />

        <Text style={styles.back}>← Voltar para o site</Text>
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

  tabs: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  activeTab: {
    backgroundColor: "#E50914",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    textAlign: "center",
  },

  tab: {
    backgroundColor: "#222",
    color: "#aaa",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    textAlign: "center",
  },

  label: {
    color: "#fff",
    marginBottom: 8,
  },

  back: {
    color: "#999",
    marginTop: 20,
    textAlign: "center",
  },
});