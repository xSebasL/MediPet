// frontend/src/screens/pets/PetFormScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useSearchParams, router } from "expo-router";
import {PhotoPicker} from "../components/PhotoPicker";
import {Button} from "../components/Button";
import * as petsApi from "../services/api";

export function PetForm() {
  /* const { id } = useSearchParams(); // undefined = new, otherwise edit
  const isEdit = !!id; // true si es edición */

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("0");
  const [photoUrl, setPhotoUrl] = useState(null);

  /* useEffect(() => {
    if (isEdit) load();
  }, [id]); */

  const load = async () => {
    /* try {
      const pets = await petsApi.getPets();
      const pet = pets.find(p => p.id === parseInt(id));
      if (!pet) return;
      setNombre(pet.nombre);
      setEspecie(pet.especie);
      setRaza(pet.raza || "");
      setEdad(pet.edad.toString());
      setPhotoUrl(pet.photoUrl || null);
    } catch (err) {
      Alert.alert("Error", "No se pudo cargar la mascota");
    } */
  };

  const handleSave = async () => {
    /* // validaciones
    if (!nombre || !especie) { Alert.alert("Error", "Nombre y especie son obligatorios"); return; }
    const payload = { nombre, especie, raza, edad: parseInt(edad) || 0, photoUrl };

    try {
      if (isEdit) {
        await petsApi.updatePet(parseInt(id), payload);
        Alert.alert("Éxito", "Mascota actualizada");
      } else {
        await petsApi.createPet(payload);
        Alert.alert("Éxito", "Mascota creada");
      }
      router.replace("/main/pets");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo guardar la mascota");
    } */
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      <Text style={styles.label}>Especie</Text>
      <TextInput style={styles.input} value={especie} onChangeText={setEspecie} />
      <Text style={styles.label}>Raza</Text>
      <TextInput style={styles.input} value={raza} onChangeText={setRaza} />
      <Text style={styles.label}>Edad</Text>
      <TextInput style={styles.input} value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <Text style={styles.label}>Foto</Text>
      <PhotoPicker photo={photoUrl} onChange={setPhotoUrl} />
      <Button style={styles.saveBtn} onPress={handleSave}>Guardar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 },
  saveBtn: { 
    backgroundColor: "#4CAF50", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 12,
    width: '100%'
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ccc"
  }
});
