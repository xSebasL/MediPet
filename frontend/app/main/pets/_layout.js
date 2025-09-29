import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function PetsLayout(){
  return <View style={styles.layout} >
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: '#f00'},
        headerTintColor: '#0ff',
        contentStyle: {backgroundColor: '#000'},
        headerTitle: "",
        headerLeft: ()=> {},
        headerRight: ()=> {}
      }}
    >
      <Stack.Screen name="index"/>
    </Stack>
  </View>
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
})
