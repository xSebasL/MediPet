import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function Layout(){
  return <View style={styles.layout} >
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: '#007'},
        headerTintColor: '#0ff',
        contentStyle: {backgroundColor: '#000'},
        headerTitle: "",
        headerLeft: ()=> {},
        headerRight: ()=> {}
      }}
    >
    </Stack>
  </View>
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
})
