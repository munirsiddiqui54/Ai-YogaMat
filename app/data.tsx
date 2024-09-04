import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

const backgd = require('../assets/images/backgd.jpeg');

let socket: WebSocket | null = null;

const connectSocket = (url: string): void => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('Connected to the WebSocket server');
    socket?.send(JSON.stringify({type:"connect", ymid:"12345"}))
  };

  socket.onclose = () => {
    console.log('Disconnected from the WebSocket server');
  };

  socket.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
  };
};

const disconnectSocket = (): void => {
  if (socket) {
    socket.close();
    console.log('Socket disconnected');
  }
};

interface SubscribeToEventParams {
  eventName: string;
  callback: (data: any) => void;
}

const subscribeToEvent = ({ eventName, callback }: SubscribeToEventParams): void => {
  if (!socket) return;

  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (data.type === eventName) {
      callback(data);
    }
  };
};

interface EmitEventParams {
  eventName: string;
  data: Record<string, any>;
}

const emitEvent = ({ eventName, data }: EmitEventParams): void => {
  if (!socket) return;

  const message = JSON.stringify({ type: eventName, ...data });
  socket.send(message);
};

const HomeScreen: React.FC = () => {
  useEffect(() => {
    const url = 'wss://aura-mat.athrva.in'; // Replace with your WebSocket server URL
    connectSocket(url);

    // const roomId = 'your-room-id'; // Replace with your room ID
    const eventName = 'FilteredData'; // Replace with your event name

    subscribeToEvent({
      eventName,
      callback: (data) => {
        console.log('Received data:', data);
      },
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <ImageBackground source={backgd} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Sidebar />
        <Home />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Light overlay with 50% opacity
  },
});

export default HomeScreen;
