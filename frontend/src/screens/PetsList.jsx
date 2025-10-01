import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import {PetCard} from "../components/PetCard";
import {getPets, deletePet} from "../services/api";
import { Screen } from "./_screen.jsx";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function PetsList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudieron cargar las mascotas.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  /* const handleEdit = (pet) => {
    router.push({ pathname: `/main/pets/${pet.id}`, params: { id: pet.id } });
  };

  const handleDelete = async (pet) => {
    Alert.alert("Confirmar", `Eliminar ${pet.nombre}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: async () => {
        try {
          await deletePet(pet.id);
          load();
        } catch (err) { Alert.alert("Error", "No se pudo eliminar"); }
      } }
    ]);
  }; */

  return (
    <Screen style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PetCard pet={item} /* onEdit={handleEdit} onDelete={handleDelete} */ />}
        refreshing={loading}
        onRefresh={load}
        />
        <View style={styles.fabContainer}>
          <Pressable
            onPress={() => {router.push("/main/pets/new");}}
            style={({ pressed }) => [
              {backgroundColor: pressed ? "#f00" : "#008"},
              styles.button,
            ]}>
            <FontAwesome6 name="add" size={28} color="#ccc" />
          </Pressable>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
})
