
import { router, useLocalSearchParams } from 'expo-router'
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Switch, TouchableOpacity, Pressable } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const img = {
  0: require('../../assets/images/poses/000.png'),
  1: require('../../assets/images/poses/001.png'),
  2: require('../../assets/images/poses/002.png'),
  3: require('../../assets/images/poses/003.png'),
  4: require('../../assets/images/poses/004.png'),
};
const poses=require('../poses.json');
const App = () => {
  
  const {id} = useLocalSearchParams()
  const x=Number(id)
  const handlePress=()=>{
    router.push(`/activity/${JSON.stringify(x)}`)
  }
  const O=poses[Number(id)]
    const [fontsLoaded] = useFonts({
        'nexa-xl': require('../../assets/fonts/Nexa-ExtraLight.ttf'),
        'nexa': require('../../assets/fonts/Nexa-Heavy.ttf'),
        'open-v': require('../../assets/fonts/openvar.ttf'),
      });
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
   
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{O.english_name}</Text>


              <View style={styles.deviceItem}>
                <Text style={styles.deviceName}>Quba 02 </Text>
                <Text style={styles.deviceStatus}>
                   Connected
                </Text>
              </View>
        {/* <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={img[x]} style={styles.image} />
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        {O.procedure.map((i:any)=>
        <Text style={styles.description}>
        {i}
        </Text>
        )}
      </View>
{/* 
      <TouchableOpacity style={styles.tryNowButton} >
        <Text style={styles.tryNowButtonText}>Try Now</Text>
      </TouchableOpacity> */}

<Pressable style={styles.tryNowButton} onPress={handlePress}>
          <Text style={styles.tryNowButtonText}>Try Now</Text>
        </Pressable>

      {/* Benefits and Contradictions */}
      <View style={styles.infoContainer}>
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Benefits</Text>
         {O.benefits.map(i=>
             <Text style={styles.benefitsText}>
           - {i}
           </Text>
         )}
        </View>
        <View style={styles.contradictionsContainer}>
          <Text style={styles.contradictionsTitle}>Contraindications</Text>
          {O.contraindications.map(i=>
            <Text style={styles.contradictionsText}>
           - {i}
          </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Similar:</Text>
        {/* You can map over an array of similar poses here */}
        <View style={styles.similarPose}>
          <Text style={styles.poseText}>Camel Pose</Text>
        </View>
        <View style={styles.similarPose}>
          <Text style={styles.poseText}>Child Pose</Text>
        </View>
        {/* More similar poses */}
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
  header: {
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 20,
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
