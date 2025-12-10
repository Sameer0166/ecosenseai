import { SensorData } from '../types';

// Initial baseline values
let currentData: SensorData = {
  timestamp: Date.now(),
  aqi: 45,
  co2: 400,
  pm25: 12,
  pm10: 25,
  temperature: 24,
  humidity: 45,
};

// Generates the next data point using a "random walk" to make it look realistic
export const getNextSensorReading = (): SensorData => {
  // Helper to add random variance (-delta to +delta)
  const drift = (value: number, delta: number, min: number, max: number) => {
    const change = (Math.random() - 0.5) * delta * 2;
    let newValue = value + change;
    return Math.max(min, Math.min(max, newValue));
  };

  currentData = {
    timestamp: Date.now(),
    aqi: drift(currentData.aqi, 2, 10, 300), // AQI can fluctuate
    co2: drift(currentData.co2, 10, 350, 1200), // CO2 changes naturally
    pm25: drift(currentData.pm25, 1.5, 0, 150),
    pm10: drift(currentData.pm10, 2, 0, 200),
    temperature: drift(currentData.temperature, 0.1, 15, 40), // Temp changes slowly
    humidity: drift(currentData.humidity, 0.5, 20, 90),
  };

  // Recalculate AQI roughly based on PM2.5 (simplification for simulation)
  // US EPA standard roughly: PM2.5 of 12 = AQI 50, PM2.5 of 35 = AQI 100
  let calculatedAqi = currentData.pm25 * 3.5;
  
  // Add some random pollution "spikes" occasionally
  if (Math.random() > 0.95) {
      calculatedAqi += 20; 
  }
  
  currentData.aqi = Math.round(Math.max(calculatedAqi, currentData.aqi * 0.8)); // Blend with previous to smooth

  return { ...currentData };
};