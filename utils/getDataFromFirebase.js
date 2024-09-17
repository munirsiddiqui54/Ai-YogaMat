import { getDatabase, ref, get, child } from 'firebase/database';

export const getMockIoTDataFromFirebase = async () => {
  try {
    const dbRef = ref(getDatabase()); // Get the root reference of the database
    const snapshot = await get(child(dbRef, 'iotData')); // Read data from the 'iotData' node

    if (snapshot.exists()) {
      console.log("Data retrieved from Firebase:", snapshot.val());
      return snapshot.val(); // Return the array of data
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};
