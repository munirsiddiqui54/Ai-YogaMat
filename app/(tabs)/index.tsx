import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Home from '../components/Home';
import Sidebar from '../components/SideBar';
import Recommendations from '../components/Recommendations';

const backgd = require('../../assets/images/backgd.jpeg');

const App = () => {
  return (
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
  },
});

export default App;
