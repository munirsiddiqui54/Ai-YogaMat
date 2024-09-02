import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Switch } from 'react-native';
import Orientation from 'react-native-orientation-locker';

const LandscapeScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    // Lock orientation to landscape for this screen
    Orientation.lockToLandscape();

    // Cleanup function to unlock orientation when leaving the screen
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Your existing UI components */}
      <View style={styles.header}>
        <Text style={styles.title}>Camel Pose</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Pose Image with Controls */}
      <View style={styles.poseContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/300x200' }} style={styles.poseImage} />
        <View style={styles.controlsContainer}>
          <Text style={styles.controlIcon}>⏮️</Text>
          <Text style={styles.controlIcon}>⏯️</Text>
          <Text style={styles.controlIcon}>⏭️</Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          Start in a Kneeling Position: Kneel on the mat with your knees hip-width apart and your thighs perpendicular to the floor. Keep your feet flat and toes pointing backward.
        </Text>
      </View>


      {/* Health Overview */}
      <View style={styles.healthOverviewContainer}>
        <Text style={styles.healthTitle}>Health Overview</Text>
        <View style={styles.healthMetrics}>
          <Text style={styles.healthText}>Blood Pressure: 200 bpm</Text>
          <Text style={styles.healthText}>Calories Burned: 200Kcal / 300Kcal</Text>
          <Text style={styles.healthText}>Oxygen: 95%</Text>
        </View>
      </View>

      {/* Yoga Mat Visual */}
      <View style={styles.matContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.matImage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  poseContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  poseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
  },
  controlIcon: {
    fontSize: 24,
    color: '#000',
  },
  instructionsContainer: {
    backgroundColor: '#e6e6fa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  healthOverviewContainer: {
    backgroundColor: '#f0f8e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#90ee90',
    borderWidth: 1,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388e3c',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthText: {
    fontSize: 14,
    color: '#333',
  },
  matContainer: {
    alignItems: 'center',
  },
  matImage: {
    width: 150,
    height: 300,
    borderRadius: 10,
  },
});

export default LandscapeScreen;
