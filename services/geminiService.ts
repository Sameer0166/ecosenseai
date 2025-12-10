import { GoogleGenAI } from "@google/genai";
import { SensorData } from "../types";

// Initialize Gemini
// Note: In a real app, strict error handling for missing API keys is needed.
// Here we handle it gracefully if the key is missing by returning a mock "AI" response.
const getClient = () => {
  if (!process.env.API_KEY) return null;
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getGeminiPollutionAnalysis = async (data: SensorData, activityLevel: number = 50): Promise<string> => {
  const client = getClient();
  
  if (!client) {
    // Fallback if no API key is provided
    return new Promise((resolve) => {
      const impactText = activityLevel > 60 
        ? "High local activity is likely to exacerbate PM2.5 levels." 
        : activityLevel < 40 
        ? "Reduced local activity may help clear pollutants faster."
        : "Standard daily patterns expected.";

      setTimeout(() => {
        resolve(`Running in simulation mode (No API Key). ${impactText} Based on current patterns and your scenario, air quality might fluctuate. Recommendation: Monitor vulnerable groups.`);
      }, 1500);
    });
  }

  try {
    const prompt = `
      Act as an environmental scientist. Analyze this sensor data:
      AQI: ${data.aqi.toFixed(0)}
      CO2: ${data.co2.toFixed(0)} ppm
      PM2.5: ${data.pm25.toFixed(1)} µg/m³
      PM10: ${data.pm10.toFixed(1)} µg/m³
      Temp: ${data.temperature.toFixed(1)}°C
      Humidity: ${data.humidity.toFixed(1)}%

      User Scenario Adjustment: The user has set the "Local Event Intensity" (Traffic/Industry) to ${activityLevel}/100 (where 50 is normal baseline).
      - If > 50: assume increased emissions nearby.
      - If < 50: assume reduced emissions (e.g. holiday, night).

      Provide a concise 3-sentence health advisory and prediction for the next 24 hours considering this scenario.
      Do not use markdown formatting.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis service is temporarily unavailable. Please rely on standard AQI charts.";
  }
};