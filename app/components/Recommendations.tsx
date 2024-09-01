import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

const poster=require('../../assets/images/balanceposter.jpeg')
const imageMapping = {
  0: "https://welltech.com/wp-content/uploads/2022/12/bff-2-persom-yoga-poses_cover.jpg",
  1: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/06/GettyImages-1081533656_header-1024x575.jpg?w=1155&h=1528",
  2: "https://www.health.com/thmb/11msnJqAW9XOyDhcvZ8nze9Ff0U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1395504255-33d159af773f45039286966a35dfd76d.jpg",
 3:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyvxqtEDdmrSuOhHC5hxEUzjRfXkb3DCutA&s",
 4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAk5zoRYOB50B8oIWWvZW2eFqxfdE4gMjl2Q&s",
};

const Recommendations= () => {
  const [fontsLoaded] = useFonts({
    'nexa-xl': require('../../assets/fonts/Nexa-ExtraLight.ttf'),
    'nexa': require('../../assets/fonts/Nexa-Heavy.ttf'),
  });
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    // Load the JSON file from the assets folder
    let jsonData = require('../poses.json');
    setPoses(jsonData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.trendingContainer}>
        <Image source={poster} style={styles.trendingImage} />
        <Text style={styles.subheading}>Trending Now</Text>
        <Text style={styles.heading}>Balance</Text>
        <TouchableOpacity style={styles.watchButton}>
          <Text style={styles.watchButtonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.light}>Top Recommendations</Text>
      <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false} // Optional: hide the scrollbar
    >
      {Object.keys(imageMapping).map(key => (
        <View key={key} style={styles.imageContainer}>
          <Image source={{uri:`${imageMapping[key]}`}} style={styles.image} />
        </View>
      ))}
    </ScrollView>

    <Text style={styles.light}>Outdoor Yoga</Text>
      <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false} // Optional: hide the scrollbar
    >
      {Object.keys(imageMapping).map(key => (
        <View key={key} style={styles.imageContainer}>
          <Image source={{uri:imageMapping[key]}} style={styles.image} />
        </View>
      ))}
    </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
    width: 950,
  },
  trendingContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: 210,
    marginTop: 20,
    borderRadius: 10,
  },
  light:{
    fontSize: 28,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'nexa-xl',
  },
  subheading: {
    position: 'absolute',
    left: 20,
    top: 40,
    color: '#FFF',
    fontFamily: 'nexa-xl',
    fontSize: 20,
  },
  heading: {
    position: 'absolute',
    left: 20,
    top: 65,
    color: '#FFF',
    fontSize: 37,
    fontFamily: 'nexa-xl',
  },
  watchButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ translateX: -50 }],
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
 
  watchButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
 
 

  posesHeader: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: 'nexa-xl',
  },
  posesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    width: 250, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginRight: 10, // Spacing between images
    borderRadius: 15, // To make it a circle
    overflow: 'hidden', // Hide overflow
    backgroundColor: '#f0f0f0', // Optional: background color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd', // Optional: border color
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Recommendations;
