import { Pressable, StyleSheet, Text } from "react-native";

export function Button({ children, ...props }) {
  return (
    <Pressable {...props}  
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "#f00" : "#00f",
      },
      styles.button,
      props.style
    ]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  }
})