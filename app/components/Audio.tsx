import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useVoiceRecognition } from "./hooks/useVoiceRecognition";

import * as Speech from 'expo-speech'; // Import Expo Speech

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "AIzaSyBCjp1LFsPShGlGg66Wak9ZlJ0J_Wl5lRs";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are Aura, a smart Yoga Mat assistant designed to help users with their yoga practice.Dont use any emojis. Begin by collecting essential information from the user to provide personalized guidance. Use the following steps to interact with the user:\n\n1. **Welcome the User**\n   - \"Hello! I’m Aura, your smart Yoga Mat assistant. I’m here to support your yoga journey. To start, I need to gather some details about you so I can give you the best recommendations. Can we begin?\"\n\n2. **Collect User Information**\n   - Ask for height: \n   - Ask for weight: \n   - Ask for age: \n  - store the data in {{}}\n3. **Inquire About Medical Conditions**\n   - \"To ensure your safety, I need to know if you have any medical conditions that might affect your yoga practice, such as pregnancy, injuries, or chronic illnesses. Please let me know.\"\n\n4. **Provide Personalized Guidance**\n   - Based on the information provided, offer general yoga recommendations. For example: \"Based on your details, I can suggest some yoga poses and practices tailored to your needs. If you have any specific questions or need recommendations on certain aspects of your practice, feel free to ask!\"\n\n5. **Handle User Queries**\n   - Respond to user queries with specific yoga advice. For example: \n     - User asks for poses to improve flexibility: \"Here are a few poses that can help improve flexibility: Downward Dog (Adho Mukha Svanasana), Seated Forward Bend (Paschimottanasana), and Pigeon Pose (Eka Pada Rajakapotasana). Would you like detailed instructions on any of these poses?\"\n   - Provide step-by-step instructions if requested.\n\n6. **End Interaction**\n   - \"If you have any more questions or need further assistance, just let me know. Enjoy your yoga practice!\"\n\n---\n\n**Example Interaction:**\n\n- **User:** \"I’m 170 cm tall, weigh 65 kg, and I’m 25 years old. I’m also pregnant.\"\n- **Aura:** \"Thank you for providing your details. Given that you’re pregnant, I’ll recommend poses that are safe and gentle. Do you have any specific questions or areas where you need guidance?\"\n\n- **User:** \"Can you suggest some poses for relaxation?\"\n- **Aura:** \"Certainly! Here are a few safe and relaxing poses: Child’s Pose (Balasana), Legs Up the Wall (Viparita Karani), and Corpse Pose (Savasana). Would you like instructions on any of these poses or more information?\"\n\n---\n\nUse this prompt to guide the model’s interactions with users, ensuring it collects relevant information and provides helpful, personalized yoga advice.\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

  
  

export default function Audio() {
  const { state, startRecognizing, stopRecognizing } = useVoiceRecognition();
  const [borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray");
  const [message, setMessage] = useState(""); // For real-time message updates
  const [geminiResponse, setGeminiResponse] = useState(""); // For Gemini response
  const [history, setHistory] = useState([
    {
      role: "user",
      parts: [{ text: "hello" }],
    },
   
  ]);
  useEffect(() => {
    if (state.partialResults[0]) {
      setMessage(state.partialResults[0]); // This shows real-time spoken words
    }
  }, [state.partialResults]);

  useEffect(() => {
    // Update the message when speech recognition is finalized (full result)
    if (state.results[0]) {
      setMessage(state.results[0]); // This shows the final recognized message
    }
  }, [state.results]);
  const chatSession = model.startChat({
    generationConfig,
    history,
  });
  useEffect(()=>{
    handleSubmit("hello")
  },[])
 
 
  
  // Handle submit and fetch response from Gemini API
  const handleSubmit = async (msg:any) => {
    Speech.stop()
    if (!msg) return; // No message to submit

    try {
       
        const result = await chatSession.sendMessage(msg);
        const responseText = result.response.text();
        setGeminiResponse(responseText);
   // Use Expo Speech to read the response
   Speech.speak(responseText, { language: 'en' });
        // Update the history with the new message and response
        setHistory((prevHistory) => [
          ...prevHistory,
          { role: "user", parts: [{ text: msg}] },
          { role: "model", parts: [{ text: responseText }] },
        ]);

    } catch (error:any) {
      if (error.response?.status === 429) {
        console.error("Quota exceeded. Please check your plan and billing details.");
        // Implement retry logic if needed
      } else {
        console.error("Error fetching Gemini response:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 30 }}>
        Aura Ai 
      </Text>
      <Text style={styles.instructions}>
        Press and hold this button to record your voice. Release the button to
        send the recording, and you'll hear a response
      </Text>
      <Text style={styles.welcome}>"{message}"</Text>
      <Pressable
        onPressIn={() => {
          setBorderColor("lightgreen");
          startRecognizing();
          Speech.stop();
        }}
        onPressOut={() => {
          setBorderColor("lightgray");
          stopRecognizing();
          handleSubmit(message); // Call Gemini API after recording
        }}
        style={{
          width: "90%",
          padding: 30,
          gap: 10,
          borderWidth: 3,
          alignItems: "center",
          borderRadius: 10,
          borderColor: borderColor,
        }}
      >
        <Text style={styles.welcome}>
          {state.isRecording ? "Release to Send" : "Hold to Speak"}
        </Text>
        <Image style={styles.button} source={require("../../assets/button.png")} />
      </Pressable>

      {geminiResponse && (
        <>
        <Text style={styles.head}>
            Gemini Response:
        </Text>
        <Text style={styles.response}> {geminiResponse}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    head:{
        marginTop:40,
        fontSize:16
    },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: 12,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
});
