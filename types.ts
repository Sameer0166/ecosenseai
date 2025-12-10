export interface SensorData {
  timestamp: number;
  aqi: number;
  co2: number; // ppm
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  temperature: number; // °C
  humidity: number; // %
}

export enum PollutionLevel {
  Good = "Good",
  Moderate = "Moderate",
  UnhealthySensitive = "Unhealthy for Sensitive Groups",
  Unhealthy = "Unhealthy",
  Hazardous = "Hazardous"
}

export type ViewState = 'dashboard' | 'live' | 'prediction' | 'about';

export interface PredictionResult {
  predictedAqi: number;
  level: PollutionLevel;
  advisory: string;
  confidence: number;
}