// frontend/src/screens/pets/PetsListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import PetCard from "../components/PetCard";
import * as petsApi from "../services/petsApi";

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await petsApi.getPets();
      setPets(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudieron cargar las mascotas.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (pet) => {
    router.push({ pathname: `/main/pets/${pet.id}`, params: { id: pet.id } });
  };

  const handleDelete = async (pet) => {
    Alert.alert("Confirmar", `Eliminar ${pet.nombre}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: async () => {
        try {
          await petsApi.deletePet(pet.id);
          load();
        } catch (err) { Alert.alert("Error", "No se pudo eliminar"); }
      } }
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mis Mascotas</Text>
        <Link href="/main/pets/new" asChild><Pressable style={{ backgroundColor: "#4CAF50", padding: 8, borderRadius: 6 }}><Text style={{ color: "white" }}>+ Nueva</Text></Pressable></Link>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PetCard pet={item} onEdit={handleEdit} onDelete={handleDelete} />}
        refreshing={loading}
        onRefresh={load}
      />
    </View>
  );
}
