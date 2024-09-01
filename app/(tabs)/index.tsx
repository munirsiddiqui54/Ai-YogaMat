import React from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
// import Sidebar from '../components/Sidebar';
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Open-Sans": require("../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
    
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7B67C8",
  },
});

export default App;
