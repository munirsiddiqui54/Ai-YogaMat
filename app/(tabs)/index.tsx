<<<<<<< HEAD
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Home from '../components/Home';
import Sidebar from '../components/SideBar';
import Recommendations from '../components/Recommendations';

const backgd = require('../../assets/images/backgd.jpeg');
=======
import React from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
// import Sidebar from '../components/Sidebar';
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
>>>>>>> 2793c8d946f69c2ce17c415ccc9654b8471ac4b9

const App = () => {
  const [fontsLoaded] = useFonts({
    "Open-Sans": require("../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
<<<<<<< HEAD
    <ImageBackground source={backgd} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>

        {/* Should be fixed */}
        <Sidebar />

        {/* ANy one component to be render */}
        <Home/>
        <Recommendations/>
      
      </View>
    </ImageBackground>
=======
    <View style={styles.container}>
    
      <Home />
    </View>
>>>>>>> 2793c8d946f69c2ce17c415ccc9654b8471ac4b9
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
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
=======
    flexDirection: "row",
    backgroundColor: "#7B67C8",
>>>>>>> 2793c8d946f69c2ce17c415ccc9654b8471ac4b9
  },
});

export default App;
