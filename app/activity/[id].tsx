import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, Pressable } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Svg, Rect } from 'react-native-svg';
import YoutubeIframe from 'react-native-youtube-iframe';
import { generateMockIoTData } from "@/utils/mockIotData";
import { getDatabase, ref, set } from 'firebase/database';
import database from '@/datab/firebase';
import { getMockIoTDataFromFirebase } from "@/utils/getDataFromFirebase";
const poses = require('../poses.json');

const LandscapeScreen = () => {
  const [processedData, setProcessedData] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { id } = useLocalSearchParams();
  const O = poses[Number(id)];
  const [yogaMasterArray, setYogaMasterArray] = useState<number[]>([]);

  const dbRef = ref(database, "iotData");
  const [rawFirebaseData, setRawFirebaseData] = useState<number[]>([]);

  // State to manage previous values
  const [previousValues, setPreviousValues] = useState<number[]>([]);

  useEffect(() => {
    // Set initial random arrays and update every 10 seconds
    const intervalId = setInterval(async () => {
      try {
        const mockData = generateMockIoTData();
        await set(dbRef, mockData);
        console.log("Mock IoT data uploaded successfully!");

        // Fetch and process data from Firebase
        const fetchedData = await getMockIoTDataFromFirebase();
        setRawFirebaseData(fetchedData);

        // Ensure previousValues is set before comparison
        if (previousValues.length > 0) {
          const comparisonResult = compareWithPrevious(fetchedData, 20);
          setProcessedData(comparisonResult);
        } else {
          // Initialize previousValues on first run
          setPreviousValues([...fetchedData]);
        }
      } catch (error) {
        console.error("Error handling data:", error);
      }
    }, 1
    000);

    handleStartStop();
    return () => clearInterval(intervalId);
  }, [previousValues]);

  console.log("raw", rawFirebaseData);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const [finalRes, setFinalRes] = useState([])
  const compareWithPrevious = (currentValues: number[], thresholdPercentage = 20) => {
    if (previousValues.length === 0) {
      // Initialize previousValues only once during the first run
      setPreviousValues([...currentValues]);
      return Array(currentValues.length).fill(0); // No comparison can be made yet
    }

    const result = currentValues.map((currentValue, index) => {
      const previousValue = previousValues[index];
      const difference = previousValue - currentValue;

      // Handle edge cases like division by zero or negative values
      if (previousValue === 0) {
        return 0; // Avoid division by zero
      }

      const percentageChange = (difference / previousValue) * 100;
      return percentageChange >= thresholdPercentage ? 1 : 0;
    });

    // Check if there are any significant changes
    const hasSignificantChange = result.some(value => value === 1);

    // If no significant change, retain previous results
    const finalResult = hasSignificantChange ? result : previousValues;

    console.log("prev ", previousValues);
    console.log("curr ", currentValues);
    console.log("res ", finalResult);
    setFinalRes([...finalResult])
    // Update previousValues with current values for the next comparison
    setPreviousValues([...currentValues]);
    return finalResult;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setIsRunning(false);
  };

  const updateSvg = (user = [] as any, yogaMaster = [] as any) => {
    const byDefault = "black";
    const userActive = "red";
    const correct = "green";

    const getColor = (index: any) => {
      if (user[index] === 1 && yogaMaster[index] === 1) {
        return correct;
      } else if (user[index] === 1) {
        return userActive;
      } else {
        return byDefault;
      }
    };

    return (
      <svg width="50%" height="50%" viewBox="0 0 1470 2937" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Frame 2">
<rect id="image 17" y="16" width="1470" height="2921" fill="#D9CAFF"/>
<rect id="Rectangle 75" x="99" y="116" width="173" height="297" rx="20" fill={getColor(0)}/>
<rect id="Rectangle 89" x="99" y="1823" width="173" height="318" rx="20" fill={getColor(1)}/>
<path id="Rectangle 93" d="M99 2195.5C99 2184.45 107.954 2175.5 119 2175.5H252C263.046 2175.5 272 2184.45 272 2195.5V2473.5C272 2484.55 263.046 2493.5 252 2493.5H119C107.954 2493.5 99 2484.55 99 2473.5V2195.5Z" fill={getColor(2)}/>
<rect id="Rectangle 90" x="99" y="1477" width="173" height="318" rx="20" fill={getColor(3)}/>
<rect id="Rectangle 91" x="101" y="1136" width="173" height="318" rx="20" fill={getColor(4)}/>
<rect id="Rectangle 88" x="101" y="795" width="173" height="318" rx="20" fill={getColor(5)}/>
<rect id="Rectangle 87" x="99" y="447" width="173" height="318" rx="20" fill={getColor(6)}/>
<rect id="Rectangle 94" x="320" y="116" width="173" height="297" rx="20" fill={getColor(7)}/>
<rect id="Rectangle 95" x="320" y="447" width="173" height="318" rx="20" fill={getColor(8)}/>
<rect id="Rectangle 96" x="322" y="795" width="173" height="318" rx="20" fill={getColor(9)}/>
<rect id="Rectangle 97" x="322" y="1136" width="173" height="318" rx="20" fill={getColor(10)}/>
<rect id="Rectangle 98" x="320" y="1477" width="173" height="318" rx="20" fill={getColor(11)}/>
<rect id="Rectangle 99" x="320" y="1823" width="173" height="318" rx="20" fill={getColor(12)}/>
<path id="Rectangle 100" d="M320 2195.5C320 2184.45 328.954 2175.5 340 2175.5H473C484.046 2175.5 493 2184.45 493 2195.5V2473.5C493 2484.55 484.046 2493.5 473 2493.5H340C328.954 2493.5 320 2484.55 320 2473.5V2195.5Z" fill={getColor(13)}/>
<rect id="Rectangle 93_2" x="325" y="2555" width="173" height="318" rx="20" fill={getColor(14)}/>
<rect id="Rectangle 101" x="544" y="116" width="173" height="297" rx="20" fill={getColor(15)}/>
<rect id="Rectangle 102" x="544" y="1823" width="173" height="318" rx="20" fill={getColor(16)}/>
<path id="Rectangle 103" d="M544 2195.5C544 2184.45 552.954 2175.5 564 2175.5H697C708.046 2175.5 717 2184.45 717 2195.5V2473.5C717 2484.55 708.046 2493.5 697 2493.5H564C552.954 2493.5 544 2484.55 544 2473.5V2195.5Z" fill={getColor(17)}/>
<rect id="Rectangle 104" x="544" y="1477" width="173" height="318" rx="20" fill={getColor(18)}/>
<rect id="Rectangle 105" x="546" y="1136" width="173" height="318" rx="20" fill={getColor(19)}/>
<rect id="Rectangle 106" x="546" y="795" width="173" height="318" rx="20" fill={getColor(20)}/>
<rect id="Rectangle 107" x="544" y="447" width="173" height="318" rx="20" fill={getColor(21)}/>
<rect id="Rectangle 92" x="549" y="2555" width="173" height="318" rx="20" fill={getColor(22)}/>
<rect id="Rectangle 108" x="768" y="116" width="173" height="297" rx="20" fill={getColor(23)}/>
<rect id="Rectangle 109" x="768" y="1823" width="173" height="318" rx="20" fill={getColor(24)}/>
<path id="Rectangle 110" d="M768 2195.5C768 2184.45 776.954 2175.5 788 2175.5H921C932.046 2175.5 941 2184.45 941 2195.5V2473.5C941 2484.55 932.046 2493.5 921 2493.5H788C776.954 2493.5 768 2484.55 768 2473.5V2195.5Z" fill={getColor(25)}/>
<rect id="Rectangle 111" x="768" y="1477" width="173" height="318" rx="20" fill={getColor(26)}/>
<rect id="Rectangle 112" x="770" y="1136" width="173" height="318" rx="20" fill={getColor(27)}/>
<rect id="Rectangle 113" x="770" y="795" width="173" height="318" rx="20" fill={getColor(28)}/>
<rect id="Rectangle 114" x="768" y="447" width="173" height="318" rx="20" fill={getColor(29)}/>
<rect id="Rectangle 115" x="773" y="2555" width="173" height="318" rx="20" fill={getColor(30)}/>
<rect id="Rectangle 116" x="1205" y="116" width="173" height="297" rx="20" fill={getColor(31)}/>
<rect id="Rectangle 117" x="1205" y="1823" width="173" height="318" rx="20" fill={getColor(32)}/>
<path id="Rectangle 118" d="M1205 2195.5C1205 2184.45 1213.95 2175.5 1225 2175.5H1358C1369.05 2175.5 1378 2184.45 1378 2195.5V2473.5C1378 2484.55 1369.05 2493.5 1358 2493.5H1225C1213.95 2493.5 1205 2484.55 1205 2473.5V2195.5Z" fill={getColor(33)}/>
<rect id="Rectangle 119" x="1205" y="1477" width="173" height="318" rx="20" fill={getColor(34)}/>
<rect id="Rectangle 120" x="1207" y="1136" width="173" height="318" rx="20" fill={getColor(35)}/>
<rect id="Rectangle 121" x="1207" y="795" width="173" height="318" rx="20" fill={getColor(36)}/>
<rect id="Rectangle 122" x="1205" y="447" width="173" height="318" rx="20" fill={getColor(37)}/>
<rect id="Rectangle 123" x="1210" y="2555" width="173" height="318" rx="20" fill={getColor(38)}/>
<rect id="Rectangle 116_2" x="989" y="116" width="173" height="297" rx="20" fill={getColor(39)}/>
<rect id="Rectangle 117_2" x="989" y="1823" width="173" height="318" rx="20" fill={getColor(40)}/>
<path id="Rectangle 118_2" d="M989 2195.5C989 2184.45 997.954 2175.5 1009 2175.5H1142C1153.05 2175.5 1162 2184.45 1162 2195.5V2473.5C1162 2484.55 1153.05 2493.5 1142 2493.5H1009C997.954 2493.5 989 2484.55 989 2473.5V2195.5Z" fill={getColor(41)}/>
<rect id="Rectangle 119_2" x="989" y="1477" width="173" height="318" rx="20" fill={getColor(42)}/>
<rect id="Rectangle 120_2" x="991" y="1136" width="173" height="318" rx="20" fill={getColor(43)}/>
<rect id="Rectangle 121_2" x="991" y="795" width="173" height="318" rx="20" fill={getColor(44)}/>
<rect id="Rectangle 122_2" x="989" y="447" width="173" height="318" rx="20" fill={getColor(45)}/>
<rect id="Rectangle 123_2" x="994" y="2555" width="173" height="318" rx="20" fill={getColor(46)}/>
<rect id="Rectangle 92_2" x="104" y="2555" width="173" height="318" rx="20" fill={getColor(47)}/>
</g>
</svg>
      
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
      <View style={styles.header}>
        <Text style={styles.title}>| {O.english_name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.poseContainer}>
          <YoutubeIframe
            height={520}
            width={'60%'}
            videoId={O.yt_videos}
            play={true}
            onChangeState={(state) => console.log('State: ', state)}
            onReady={() => console.log('Video is ready')}
          />

          <View style={styles.toflex}>
            <View style={styles.healthOverviewContainer}>
              <Text style={styles.healthTitle}>Health Overview</Text>
              <View style={styles.healthMetrics}>
                <Text style={styles.healthText}>Blood Pressure: 200 bpm</Text>
                <Text style={styles.healthText}>Calories Burned: 200Kcal / 300Kcal</Text>
                <Text style={styles.healthText}>Oxygen: 95%</Text>
              </View>
            </View>

            <View style={styles.containertimer}>
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
              <View style={styles.timerControls}>
                <Pressable style={styles.button} onPress={handleStartStop}>
                  <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.svgContainer}>
            {updateSvg(finalRes, yogaMasterArray)}
          </View>

          <View style={styles.yogaMaster}>
            <Text style={styles.yogaMasterTitle}>Yoga Master Pose</Text>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  poseContainer: {
    marginBottom: 20,
  },
  toflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  healthOverviewContainer: {
    flex: 1,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  healthMetrics: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  healthText: {
    fontSize: 16,
  },
  containertimer: {
    flex: 1,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  timerControls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  svgContainer: {
    marginBottom: 20,
  },
  yogaMaster: {
    alignItems: 'center',
  },
  yogaMasterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LandscapeScreen;
