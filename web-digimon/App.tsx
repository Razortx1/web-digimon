import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [file, setFile] = useState<any>(null);
  const [digimonName, setDigimonName] = useState<string>('');

  const url = 'https://dry-sands-47061-8d2e711f5b8e.herokuapp.com/prediccion'; // Cambia la URL si es necesario

  const getDigimon = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/prediccion', {
        method: 'POST',
        body: formData,
      });

      const digimon = await response.json();
      console.log(digimon);
      setDigimonName(digimon.Nombre); // Mostrar el nombre del Digimon
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Encuentra tu Digimon" />
        <Card.Content>
          <input type="file" onChange={handleFileChange} style={{marginBottom:5}} />
          <Button
            title="Enviar Imagen"
            onPress={() => file && getDigimon(file)}
          />
          {digimonName && <Text>{digimonName}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
