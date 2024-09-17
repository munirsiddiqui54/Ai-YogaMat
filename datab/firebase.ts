import { initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDi4XvA20KocgRCHGUt9riEfFozlgDEZys",
  authDomain: "auramat-6d8f4.firebaseapp.com",
  databaseURL: "https://auramat-6d8f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auramat-6d8f4",
  storageBucket: "auramat-6d8f4.appspot.com",
  messagingSenderId: "1037447784611",
  appId: "1:1037447784611:web:4cc162d8bc8c6c628e3716",
  measurementId: "G-47XRH5BGR3"
};
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  export default database;