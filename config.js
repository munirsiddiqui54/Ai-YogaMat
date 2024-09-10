// config.js
import Constants from 'expo-constants';

const { manifest } = Constants;

export const config = {
  OPENAI_API_KEY: manifest?.extra?.OPENAI_API_KEY,
};
