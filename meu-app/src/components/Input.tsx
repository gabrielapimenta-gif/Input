import { TextInput, StyleSheet } from "react-native";

export function Input(props: any) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#666"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
});