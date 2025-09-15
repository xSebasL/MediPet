import { View, StyleSheet } from "react-native";

export function Screen({children,}){
  return <View style={styles.screen}>{children}</View>
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  }
})