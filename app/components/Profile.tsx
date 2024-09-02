import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

const progressCircle= require('../../assets/images/Ellipse 9.png');
const profilePic=require('../../assets/images/Ellipse 8.png');

const Profile = () => {
  const [fontsLoaded] = useFonts({
    'nexa-xl': require('../../assets/fonts/Nexa-ExtraLight.ttf'),
    'nexa': require('../../assets/fonts/Nexa-Heavy.ttf'),
    'open-v': require('../../assets/fonts/openvar.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or replace with a loading spinner
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={profilePic} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Harshal Nelge</Text>
          <Text style={styles.username}>Username_123</Text>
          <Text style={styles.bio}>Bio :</Text>
          <View style={styles.personalStats}>
            <Text style={styles.statText}>Age : 20</Text>
            <Text style={styles.statText}>Weight : 62kg</Text>
            <Text style={styles.statText}>Height : 168cm</Text>
          </View>
        </View>
      </View>

      <View style={styles.healthOverview}>
        <Text style={styles.healthHeader}>Health Overview</Text>
        <Text style={styles.healthText}>Blood Pressure : 200 bpm</Text>
        <Text style={styles.healthText}>Oxygen : 95%</Text>
        <Text style={styles.healthText}>Calories Burned : 200Kcal / 300Kcal</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.dateText}>Monday 19 August</Text>
        <Image style={styles.progressCircle} source={progressCircle}/>
        
        <Text style={styles.progressText}>70% complete</Text>
        <Text style={styles.progressDetails}>Calories Burned : 200Kcal / 300Kcal</Text>
        <Text style={styles.progressDetails}>Heart Rate : </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  profileHeader: {
    padding:10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'nexa-xl',
    fontSize: 20,
  },
  username: {
    fontFamily: 'open',
    fontSize: 16,
    color: 'grey',
  },
  bio: {
    fontFamily: 'open',
    fontSize: 14,
    color: 'grey',
  },
  personalStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statText: {
    fontFamily: 'open-v',
    marginRight: 10,
  },
  healthOverview: {
    borderColor: '#B2D941',
    borderWidth: 1,
    
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  healthHeader: {
    fontFamily: 'nexa',
    fontSize: 18,
    
    color: '#B2D941',
    marginBottom: 5,
  },
  healthText: {
    fontFamily: 'open-v',
    fontSize: 14,
  },
  progressSection: {
    borderColor: '#D3E9D2',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  dateText: {
    fontFamily: 'nexa-xl',
    fontSize: 16,
    marginBottom: 10,
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontFamily: 'nexa',
    fontSize: 16,
    marginTop: 10,
  },
  progressDetails: {
    fontFamily: 'open-v',
    fontSize: 14,
  },
});

export default Profile;
