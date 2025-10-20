import {Text} from "react-native"
import { useLocalSearchParams } from "expo-router"

export function PetDetail(){
  const {id} = useLocalSearchParams()

  return <Text style={{color: "#fff"}}>ID: {id}</Text>
}