import { View, StyleSheet, StatusBar } from "react-native";

export function Screen({children, ...props}){
  return <View style={styles.screen} {...props}>
    <StatusBar barStyle="light-content" backgroundColor="#000"/>
    {children}
  </View>
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