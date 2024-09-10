import { View, Text } from 'react-native';
import { StyleSheet, ImageBackground } from 'react-native';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';


const backgd = require('../assets/images/backgd.jpeg');


const profile = () => {
  
  return (
    <ImageBackground source={backgd} style={styles.backgroundImage}>
      {/* Overlay to make the background image dull */}
      <View style={styles.overlay} />
      
      {/* Main content */}
      <View style={styles.container}>
        <Sidebar />
        <Profile/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire background
    backgroundColor: 'rgba(255,255, 255, 0.5)', // Dark overlay with 50% opacity
  },
});

export default profile;
