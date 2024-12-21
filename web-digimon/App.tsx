import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [file, setFile] = useState<any>(null); 
  const [digimonName, setDigimonName] = useState<string>(''); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); 

  const url = 'https://dry-sands-47061-8d2e711f5b8e.herokuapp.com/prediccion/';

  const getDigimon = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const digimon = await response.json();
      setDigimonName(digimon.Nombre);
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);

      // Crear una URL temporal para mostrar la imagen seleccionada
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={{alignSelf: "center", backgroundColor: "gold"}}>
        <Card.Title title="Encuentra tu Digimon" style= {{alignSelf:"center"}} />
        <Card.Content style={{alignItems: "center"}}>
          <input type="file" onChange={handleFileChange} style={{marginBottom: 5}}/>
          
          {imagePreview && (
            <div style={{margin: 5}}>
              <img 
                src={imagePreview} 
                alt="Vista previa" 
                style={{ width: '200px', height: '200px'}}
              />
            </div>
          )}
          <Button
            title="Enviar Imagen"
            onPress={() => file && getDigimon(file)}
          />
          {digimonName && <Text style={{marginTop: 5}}>{digimonName}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60b4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
