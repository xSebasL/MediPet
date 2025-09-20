import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function AuthLayout(){
  return <View style={styles.layout} >
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#0ff',
        contentStyle: {backgroundColor: '#000'},
        headerTitle: "",
        headerLeft: ()=> {},
        headerRight: ()=> {}
      }}
    >
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
    </Stack>
  </View>
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
})
