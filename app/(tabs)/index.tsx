import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Sidebar from '../components/Sidebar';
import Home from '../components/Home';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Sidebar /> */}
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#7B67C8"
  },
});

export default App;
