import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Href, router, usePathname } from "expo-router";
import { useFonts } from "expo-font";
import { useWindowDimensions } from "react-native";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to handle sidebar toggle
  const currentRoute = usePathname(); // Get the current route
  const { width } = useWindowDimensions(); // Get the screen width

  const [fontsLoaded] = useFonts({
    "open-v": require("../../assets/fonts/openvar.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Determine if it's a mobile device based on width
  const isMobile = width < 768;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile ? (
    <View style={styles.containermobile}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleSidebar}
          >
            <Text style={styles.toggleButtonText}>☰</Text>
          </TouchableOpacity>
          {isSidebarOpen && (
            <View style={styles.sidebarContent}>
              {renderSidebarContent(currentRoute)}
            </View>
          )}
    </View>
      ) : (
        <View style={styles.container}>

        <View style={styles.sidebarContent}>
          {renderSidebarContent(currentRoute)}
        </View>
        </View>
      )}
    </>
  );
};

const renderSidebarContent = (currentRoute) => (
  <>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/aura.png")}
      />
      <Image
        style={styles.image}
        source={require("../../assets/images/auraName.png")}
      />
    </View>
    <View style={styles.navigation}>
      {navigationElements.map((element, index) => {
        const isActive = currentRoute === element.slug; // Check if this button's route is active
        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(element.slug as Href<string | object>)}
          >
            <View
              style={[
                styles.navigationBtn,
                isActive
                  ? styles.activeNavigationBtn
                  : styles.inactiveNavigationBtn, // Conditional styles
              ]}
            >
              <Image
                source={element.iconUrl}
                style={[
                  styles.icons,
                  isActive ? styles.activeicon : styles.icons,
                ]}
              />
              <Text
                style={[
                  styles.navigationText,
                  isActive
                    ? styles.activeNavigationText
                    : styles.inactiveNavigationText, // Conditional text styles
                ]}
              >
                {element.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
    <View style={styles.devices}>
      <View>
        <Text style={styles.deviceText}>Devices</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.devicesContainer}>
        {pairedDevices.length > 0 ? (
          pairedDevices.map((device, index) => (
            <View key={index} style={styles.deviceItem}>
              <Text style={styles.deviceName}>{device.deviceName}</Text>
              <Text style={styles.deviceStatus}>
                {device.status ? "Connected" : "Disconnected"}
              </Text>
            </View>
          ))
        ) : (
          <Text>No paired devices</Text>
        )}
      </View>
    </View>
  </>
);



const navigationElements = [
  {
    title: "Home",
    slug: "/",
    iconUrl: require("../../assets/images/icons/homeicon.png"),
  },
  {
    title: "Recommendations",
    slug: "/recommendation",
    iconUrl: require("../../assets/images/icons/recommendations.png"),
  },
  {
    title: "Assistant",
    slug: "/challenges",
    iconUrl: require("../../assets/images/icons/challenge.png"),
  },
  {
    title: "Discover",
    slug: "/discover",
    iconUrl: require("../../assets/images/icons/discovericon.png"),
  },
  {
    title: "My Profile",
    slug: "/profile",
    iconUrl: require("../../assets/images/icons/profile.png"),
  },
  // Add more elements as needed
];

const pairedDevices = [
  {
    deviceName: "Device 1",
    status: true,
  },
  {
    deviceName: "Device 2",
    status: false,
  },
  // Add more devices as needed
];

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff65",
  },
  containermobile: {
    position:'absolute',
    left:30,
    top:30,
    zIndex:1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor:'#4E3B7A',
    borderRadius: 50,
    borderWidth:2,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#4E3B7A",
    fontSize: 24,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Center items vertically
    gap: 16,
    paddingBottom: 20,
    marginBottom: 10, // Adjust this if needed
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  navigation: {
    // Remove flex: 1 to avoid extra space
  },
  navigationBtn: {
    height: 35,
    margin: 3,
    marginHorizontal: 2,
    flexDirection: "row",
    backgroundColor: "#ffffff65",
    borderRadius: 50,
    justifyContent: "flex-start",
    alignItems: "center", // Center items vertically within the button
    paddingHorizontal: 20,
  },
  icons: {
    width: 20,
    height: 20, // Ensure the icon size is consistent
    marginRight: 10, // Add margin to the right to separate the icon from the text
    resizeMode: "contain",
  },
  activeicon:{
     tintColor:'white',
  },

  activeNavigationBtn: {
    backgroundColor: "#4E3B7A", // Active background color
  },
  inactiveNavigationBtn: {
    backgroundColor: "#ffffff20", // Inactive background color
  },
  navigationText: {
    fontSize: 14,
    fontFamily: "Open-Sans",
    fontWeight: "semibold",
  },
  activeNavigationText: {
    color: "#fff", // Text color for active button
  },
  inactiveNavigationText: {
    color: "#4E3B7A", // Text color for inactive button
  },
  devices: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 10,
    marginTop: 10, // Adjust margin to avoid extra space
    paddingBottom: 90,
  },
  deviceText: {
    color: "#4E3B7A",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  line: {
    height: 2,
    backgroundColor: "#111",
    marginHorizontal: 15,
  },
  deviceItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#F2EDFF",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  devicesContainer: {
    paddingTop: 10,
  },
});


export default Sidebar;
