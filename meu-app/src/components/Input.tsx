import { TextInput, StyleSheet } from "react-native";

export function Input(props: any) {
  return (
    <TextInput
      {...props}
      value={props.value ?? ""}
      style={[styles.input, props.style]}
      placeholderTextColor="#666"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
});