import { initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApfNv2NzNd0d8pKxi8av-yBIw-HHWnr5g",
  authDomain: "aura-6b9c6.firebaseapp.com",
  databaseURL: "https://aura-6b9c6-default-rtdb.firebaseio.com",
  projectId: "aura-6b9c6",
  storageBucket: "aura-6b9c6.appspot.com",
  messagingSenderId: "427155757445",
  appId: "1:427155757445:web:fb2dd288be7a6ddd324cec",
  measurementId: "G-9S2WCJG6ME"
};
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  export default database;