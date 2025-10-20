// frontend/src/components/PhotoPicker.js
import React, { useState } from "react";
import { View, Image, Pressable, Text, StyleSheet, Alert } from "react-native";
import {Button} from './Button';
import * as ImagePicker from "expo-image-picker";

// Componente para seleccionar una foto desde la galería o tomar una nueva foto
/* export default function PhotoPicker({ photo, onChange }) {
  const [local, setLocal] = useState(photo); // estado local para mostrar la imagen seleccionada

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync(); // pedir permiso para acceder a la galería
    if (!permission.granted) { // si no se concede el permiso, mostrar alerta
      Alert.alert("Permiso denegado", "Habilita permisos para acceder a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setLocal(result.uri);
      onChange(result.uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso denegado", "Habilita permisos para usar la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });
    if (!result.cancelled) {
      setLocal(result.uri);
      onChange(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {local ? <Image source={{ uri: local }} style={styles.image} /> : <View style={styles.placeholder}><Text>Sin foto</Text></View>}
      <View style={styles.buttons}>
        <Pressable onPress={pickImage} style={styles.btn}><Text style={styles.btnText}>Galería</Text></Pressable>
        <Pressable onPress={takePhoto} style={[styles.btn, styles.btnAlt]}><Text style={styles.btnText}>Cámara</Text></Pressable>
      </View>
    </View>
  );
} */

export function PhotoPicker({ photo, onChange }){
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ // opciones para seleccionar imagen
      mediaTypes: ['images', 'videos'], // permitir imágener y videos
      allowsEditing: true, // permitir edición
      aspect: [4, 3], // relación de aspecto
      quality: 1, // calidad de la imagen, 1 es la mejor
    });
    console.log(result);
    if (!result.canceled) { // si no se canceló la selección
      setImage(result.assets[0].uri); // actualizar estado con la URI de la imagen seleccionada
      onChange(result.assets[0].uri); // 
    }
  }
  return <View style={styles.container}>
      <Button onPress={pickImage} style={{width:'100%'}}>Seleccionar imagen</Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
  </View>
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  image: { width: 120, height: 120, borderRadius: 8 }
});
