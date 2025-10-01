import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import {Button} from './Button'
import {Link} from 'expo-router'

export function PetCard({ pet, onEdit, onDelete }) {
  return (

      <View style={styles.card}>
        {pet.photoUrl ? <Image source={{ uri: pet.photoUrl }} style={styles.image} /> : <View style={styles.placeholder}><Text>Sin foto</Text></View>}
        <View style={styles.info}>
          <Text style={styles.name}>{pet.nombre}</Text>
          <Text>{pet.especie}</Text>
          <Text>{pet.edad} años</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 12, borderRadius: 8, backgroundColor: "#fff", marginBottom: 10, elevation: 1 },
  image: { width: 80, height: 80, borderRadius: 8 },
  placeholder: { width: 80, height: 80, borderRadius: 8, borderWidth: 1, borderColor: "#ccc", alignItems: "center", justifyContent: "center" },
  info: { marginLeft: 12, flex: 1 },
  name: { fontWeight: "bold", fontSize: 16 },
  actions: { flexDirection: "row", marginTop: 8, gap: 8 },
  btn: { padding: 8, backgroundColor: "#4CAF50", borderRadius: 6 },
  btnDelete: { backgroundColor: "#E53935", marginLeft: 8 },
  btnText: { color: "white", fontWeight: "bold" },
});
