import { router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import * as Speech from 'expo-speech';

const poses = require('../poses.json');

const App = () => {
  const { id } = useLocalSearchParams();
  const x = Number(id);

  

  const handlePress = () => {
    console.log("id", id);
    console.log("x", x);
    Speech.stop()
    router.push(`/activity/${id}`);
  };

  const O = poses[x];

  const [fontsLoaded] = useFonts({
    'nexa-xl': require('../../assets/fonts/Nexa-ExtraLight.ttf'),
    'nexa': require('../../assets/fonts/Nexa-Heavy.ttf'),
    'open-v': require('../../assets/fonts/openvar.ttf'),
  });

  const speak = () => {
    Speech.speak(O.about);
  };

  useEffect(() => {
    speak()
    // Cleanup function to stop speech when component unmounts or route changes
    // return () => {
    //   Speech.stop();
    // };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{O.english_name}</Text>
        <View style={styles.deviceItem}>
          <Text style={styles.deviceName}>Quba 02</Text>
          <Text style={styles.deviceStatus}>Connected</Text>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: O.image_url }} style={styles.image} />
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text>{O.about}</Text>
        <Pressable style={styles.speakButton} onPress={speak}>
          <Text style={styles.speakButtonText}>Speak Description</Text>
        </Pressable>
      </View>

      {/* Try Now Button */}
      <Pressable style={styles.tryNowButton} onPress={handlePress}>
        <Text style={styles.tryNowButtonText}>Try Now</Text>
      </Pressable>

      {/* Benefits and Contradictions */}
      <View style={styles.infoContainer}>
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Benefits</Text>
          {O.benefits.map((i, index) => (
            <Text key={index} style={styles.benefitsText}>- {i}</Text>
          ))}
        </View>
        <View style={styles.contradictionsContainer}>
          <Text style={styles.contradictionsTitle}>Contraindications</Text>
          {O.contraindications.map((i, index) => (
            <Text key={index} style={styles.contradictionsText}>- {i}</Text>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Similar:</Text>
        <ScrollView horizontal>
          {poses.filter(pose => pose.id != id).map((pose) => (
            <View key={pose.id} style={styles.poseContainer}>
              <Image source={{ uri: pose.image_url }} style={styles.poseImage} />
              <Text style={styles.poseText}>{pose.english_name}</Text>
              <Text style={styles.poseSubText}>{pose.sanskrit_name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  toflex:{
flexDirection:'row'
  },
  header: {
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 20,
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
  title: {
    color:'#6a1b9a',
    fontSize: 32,
    fontFamily:'nexa',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 450,
    height: 450,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  tryNowButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 35,
    alignSelf: 'center',
    marginBottom: 20,
  },
  tryNowButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  benefitsContainer: {
    width: '48%',
    borderColor:'#7A8A4C',
    borderWidth:2,
    padding: 10,
    borderRadius: 10,
  },
  benefitsTitle: {
    fontWeight: 'bold',
    color:'#7A8A4C',
    marginBottom: 5,
},
benefitsText: {
      color:'#7A8A4C',
    fontSize: 14,
  },
  contradictionsContainer: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2, 
    borderColor:'#FE6B6B',
  },
  contradictionsTitle: {
    fontWeight: 'bold',
    color:'#FE6B6B',
    marginBottom: 5,
  },
  contradictionsText: {
    fontSize: 14,
    color:'#FE6B6B'
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  similarPose: {
    backgroundColor: '#ddd',
    padding: 50,
    borderRadius: 5,
    marginBottom: 30,
  },
  poseText: {
    fontSize: 16,
  },
  deviceItem: {
    padding: 10,
    backgroundColor: "#F2EDFF",
    borderRadius: 10,
    width:200,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  deviceName: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Open-Sans",
  },
  deviceStatus: {
    flex: 1,
    fontSize: 10,
    textAlign: "right",
  },
});

export default App;
