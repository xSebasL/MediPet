import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function HomeLayout(){
  return <View style={styles.layout} >
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#0ff',
        contentStyle: {backgroundColor: '#000'},
        headerTitle: "home",
        headerLeft: ()=> {},
        headerRight: ()=> {}
      }}
    >
      <Stack.Screen name="index" options={{headerShown: true}}/>
    </Stack>
  </View>
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
})
