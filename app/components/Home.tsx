import { useEffect ,useState} from 'react';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// import posesData from '../assets/poses.json';

const Home = () => {

  const [poses, setPoses] = useState([]);

  useEffect(() => {
    // Load the JSON file from the assets folder
    let jsonData = require('../poses.json');
    jsonData=jsonData.filter((pose:any) => pose.id !== 0);
    setPoses(jsonData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Trending Now Section */}
      <View style={styles.trendingContainer}>
        <Image 
          source={{ uri: 'https://example.com/yoga-image.png' }} 
          style={styles.trendingImage} 
        />
        <TouchableOpacity style={styles.watchButton}>
          <Text style={styles.watchButtonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>

      {/* Date Section */}
      <Text style={styles.dateText}>Monday 19 August</Text>

      {/* Health Overview Section */}
      <View style={styles.healthOverviewContainer}>
        <Text style={styles.healthText}>Health Overview</Text>
        <Text style={styles.healthDetails}>
          Blood Pressure : 200 bpm{'\n'}
          Calories Burned : 200Kcal / 300Kcal{'\n'}
          Oxygen : 95%
        </Text>
      </View>

      {/* Yoga Poses Section */}
      <Text style={styles.posesHeader}>My Poses:</Text>
      <View style={styles.posesContainer}>
      {poses!.map((pose:any) => (
        <View key={pose.id} style={styles.poseContainer}>
          <Image source={{ uri: pose.image_url }} style={styles.poseImage} />
          <Text style={styles.poseText}>{pose.english_name}</Text>
          <Text style={styles.poseSubText}>{pose.sanskrit_name}</Text>

          {/* <Text style={styles.poseDetailText}>Target Body Parts: {pose.target_body_parts.join(', ')}</Text>
          <Text style={styles.poseDetailText}>Benefits: {pose.benefits.join(', ')}</Text>
          <Text style={styles.poseDetailText}>Contraindications: {pose.contraindications.join(', ')}</Text> */}
        </View>
      ))}
      </View>
    </ScrollView>
  );
};

const Pose = ({ name }:{name:any}) => (
  <View style={styles.poseContainer}>
    <Image 
      source={{ uri: 'https://example.com/pose-icon.png' }} 
      style={styles.poseImage} 
    />
    <Text style={styles.poseText}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  trendingContainer: {
    marginBottom: 20,
    position: 'relative', 
  },
  trendingImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  watchButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  poseContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 5,
  },
  poseSubText: {
    fontSize: 16,
    color: '#555',
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
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  healthOverviewContainer: {
    backgroundColor: '#E8FCE8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  healthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  healthDetails: {
    fontSize: 16,
    color: '#333',
  },
  posesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  posesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
 
});

export default Home;
