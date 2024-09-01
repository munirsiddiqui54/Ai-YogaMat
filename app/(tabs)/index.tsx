
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Home from '../components/Home';
import Sidebar from '../components/Sidebar';
import Recommendations from '../components/Recommendations';
import { useFonts } from 'expo-font';

const backgd = require('../../assets/images/backgd.jpeg');


const App = () => {
  const [fontsLoaded] = useFonts({
    "Open-Sans": require("../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground source={backgd} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>

        <Sidebar />

        <Home/>
    
      
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // Add more styling here if needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity:100
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the rgba value to control opacity
    flexDirection: "row",
  },
});

export default App;
