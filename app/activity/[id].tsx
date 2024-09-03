import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Switch } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Svg, Rect } from 'react-native-svg';
import YoutubeIframe from 'react-native-youtube-iframe';

const LandscapeScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const {id} = useLocalSearchParams()
  const x=id
  const [userArray, setUserArray] = useState([]);
  const [yogaMasterArray, setYogaMasterArray] = useState([]);

  const generateRandomArray = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 2));
  };

  useEffect(() => {
    // Set initial random arrays
    setUserArray(generateRandomArray());
    setYogaMasterArray(generateRandomArray());

    // Update arrays every 2 seconds
    const intervalId = setInterval(() => {
      setUserArray(generateRandomArray());
      setYogaMasterArray(generateRandomArray());
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  
const updateSvg = (user = [], yogaMaster = []) => {
    const bydefault = "black";
    const useractive = "red";
    const correct = "green";
  
    const getColor = (index) => {
      if (user[index] === 1 && yogaMaster[index] === 1) {
        return correct;
      } else if (user[index] === 1) {
        return useractive;
      } else {
        return bydefault;
      }
    };
  
    return (
      <Svg width="318" height="650" viewBox="0 0 318 740">
        <Rect x="0" y="0.717" width="133.664" height="124.828" rx="12" fill={getColor(0)} fillOpacity="0.4"/>
        <Rect y="136.665" width="134.462" height="62.0553" rx="12" fill={getColor(1)} fillOpacity="0.5"/>
        <Rect x="181.942" y="136.665" width="133.664" height="62.0553" rx="12" fill={getColor(2)} fillOpacity="0.5"/>
        <Rect y="531.595" width="133.664" height="62.0553" rx="12" fill={getColor(3)} fillOpacity="0.5"/>
        <Rect x="181.144" y="531.595" width="133.664" height="62.0553" rx="12" fill={getColor(4)} fillOpacity="0.5"/>
        <Rect y="209.123" width="134.462" height="151.013" rx="12" fill={getColor(5)} fillOpacity="0.5"/>
        <Rect x="181.942" y="209.123" width="133.664" height="151.013" rx="12" fill={getColor(6)} fillOpacity="0.7"/>
        <Rect y="370.538" width="133.664" height="151.013" rx="12" fill={getColor(7)} fillOpacity="0.5"/>
        <Rect x="181.144" y="370.538" width="133.664" height="151.013" rx="12" fill={getColor(8)} fillOpacity="0.5"/>
        <Rect x="181.144" width="133.664" height="126.263" rx="12" fill={getColor(9)} fillOpacity="0.5"/>
        <Rect x="1.59595" y="615.172" width="133.664" height="124.828" rx="12" fill={getColor(10)} fillOpacity="0.5"/>
        <Rect x="183.938" y="613.738" width="134.063" height="126.263" rx="12" fill={getColor(11)} fillOpacity="0.5"/>
      </Svg>
    );
  };
  
useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
    {/* Your existing UI components */}
    <View style={styles.header}>
      <Text style={styles.title}>| Camel Pose</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>

    <View style={styles.body}>


    {/* Pose Image with Controls */}
    <View style={styles.poseContainer}>
      {/* <Image source={{ uri: 'https://via.placeholder.com/500x200' }} style={styles.poseImage} /> */}
      <YoutubeIframe
        height={520}  // Ensure the height is enough
        width={'100%'}  // Set width to 100% to fill the parent container
        videoId="_NNnowkcIqU"
        play={true}
        onChangeState={(state) => console.log('State: ', state)}
        onReady={() => console.log('Video is ready')}
/>
      {/* <View style={styles.instructionsContainer}>
      <Text style={styles.instructions}>
        Start in a Kneeling Position: Kneel on the mat with your knees hip-width apart and your thighs perpendicular to the floor. Keep your feet flat and toes pointing backward.
      </Text>
    </View> */}
    <View style={styles.healthOverviewContainer}>
      <Text style={styles.healthTitle}>Health Overview</Text>
      <View style={styles.healthMetrics}>
        <Text style={styles.healthText}>Blood Pressure: 200 bpm</Text>
        <Text style={styles.healthText}>Calories Burned: 200Kcal / 300Kcal</Text>
        <Text style={styles.healthText}>Oxygen: 95%</Text>
      </View>
    </View>
    </View>
    <View style={styles.matContainer}>
      {updateSvg(userArray,yogaMasterArray)}
    </View>

    </View>

  </ScrollView>
  );
};

const styles = StyleSheet.create({
    body:{
        flexDirection:'row'
    },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    width:'100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  poseContainer: {
    width:'70%',
    justifyContent:'space-evenly',
    backgroundColor:'#ffffff',
margin:8,
    alignItems: 'center',
  },
  poseImage: {
    width: '100%',
    height: 450,
    borderRadius: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
  },
  
  instructionsContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width:'95%'
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
    width:'95%',
    borderColor: '#90ee90',
    borderWidth: 1,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  
});

export default LandscapeScreen;
