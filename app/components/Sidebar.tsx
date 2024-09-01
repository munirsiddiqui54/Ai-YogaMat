import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Href, router, usePathname } from "expo-router";

const Sidebar = () => {
  const currentRoute = usePathname(); // Get the current route

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const navigationElements = [
  {
    title: "Home",
    slug: "/home",
    iconUrl: "",
  },
  {
    title: "Recommendations",
    slug: "/recommendations",
    iconUrl: "",
  },
  {
    title: "Challenges",
    slug: "/challenges",
    iconUrl: "",
  },
  {
    title: "Discover",
    slug: "/discover",
    iconUrl: "",
  },
  {
    title: "My Profile",
    slug: "/profile",
    iconUrl: "",
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
    width: "20%",
    padding: 10,
    backgroundColor: "white",
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
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  navigation: {
    // Remove flex: 1 to avoid extra space
  },
  navigationBtn: {
    height: 35,
    marginHorizontal: 10,
    borderRadius: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  activeNavigationBtn: {
    backgroundColor: "#4E3B7A", // Active background color
  },
  inactiveNavigationBtn: {
    backgroundColor: "white", // Inactive background color
  },
  navigationText: {
    fontSize: 20,
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
    flex: 1,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceName: {
    flex: 1,
  },
  deviceStatus: {
    flex: 1,
    textAlign: "right",
  },
  devicesContainer: {
    paddingTop: 10,
  },
});

export default Sidebar;
