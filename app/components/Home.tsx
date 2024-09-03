import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const poster=require('../../assets/images/homeposter.png')

const imageMapping = {
  0: require('../../assets/images/poses/000.png'),
  1: require('../../assets/images/poses/001.png'),
  2: require('../../assets/images/poses/002.png'),
  3: require('../../assets/images/poses/003.png'),
  4: require('../../assets/images/poses/004.png'),
};

const Home = () => {
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
      {/* Trending Now Section */}
      <View style={styles.trendingContainer}>
        <Image source={poster} style={styles.trendingImage} />
        <Text style={styles.subheading}>Trending Now</Text>
        <Text style={styles.heading}>Yoga by ALICE</Text>
        <TouchableOpacity style={styles.watchButton}>
          <Text style={styles.watchButtonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>

      {/* Date Section */}
      <Text style={styles.dateText}>Wednesday 19 August</Text>

      {/* Health Overview Section */}
      <View style={styles.healthOverviewContainer}>
        <Text style={styles.healthText}>Health Overview</Text>
        <Text style={styles.healthDetails}>
          Blood Pressure : 200 bpm. {'    '}
          Calories Burned : 200Kcal / 300Kcal{'\n'}
          Oxygen : 95%
        </Text>
      </View>

      {/* Yoga Poses Section */}
      <Text style={styles.posesHeader}>My Poses:</Text>
      <View style={styles.posesContainer}>
      {poses.map((pose:any) => (
        <Pressable onPress={()=>router.push(`/exercise/${JSON.stringify(pose.id)}`)}><View key={pose.id} style={styles.poseContainer}>
          {pose.id==0&&console.log(pose)}
        <Image source={imageMapping[pose.id]} style={styles.poseImage} />
        <Text style={styles.poseText}>{pose.english_name}</Text>
        <Text style={styles.poseSubText}>{pose.sanskrit_name}</Text>

        {/* <Text style={styles.poseDetailText}>Target Body Parts: {pose.target_body_parts.join(', ')}</Text>
        <Text style={styles.poseDetailText}>Benefits: {pose.benefits.join(', ')}</Text>
        <Text style={styles.poseDetailText}>Contraindications: {pose.contraindications.join(', ')}</Text> */}
      </View></Pressable>
        
      ))}
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop:15,
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
  poseContainer: {
    padding: 10,
    width:180,
    marginBottom: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  poseImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  poseText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'nexa',
    marginBottom: 5,
  },
  poseSubText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'nexa',
    marginBottom: 10,
  },
  poseDetailText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  watchButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  dateText: {
    fontSize: 28,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'nexa-xl',
  },
  healthOverviewContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#B2D941',
  },
  healthText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'nexa',
    marginBottom: 10,
    color: '#B2D941',
  },
  healthDetails: {
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'nexa-xl',
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
});

export default Home;
