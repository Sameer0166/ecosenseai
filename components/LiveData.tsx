import React from 'react';
import { SensorData } from '../types';

interface LiveDataProps {
  history: SensorData[];
}

const LiveData: React.FC<LiveDataProps> = ({ history }) => {
  // Show last 15 records in reverse order
  const logs = [...history].reverse().slice(0, 15);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        Live Sensor Stream
      </h2>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">AQI</th>
                <th className="p-4 font-medium">CO2 (ppm)</th>
                <th className="p-4 font-medium">PM2.5</th>
                <th className="p-4 font-medium">PM10</th>
                <th className="p-4 font-medium">Temp (°C)</th>
                <th className="p-4 font-medium">Humidity (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {logs.map((row, idx) => (
                <tr key={row.timestamp} className="hover:bg-slate-700/30 transition-colors text-sm text-slate-300">
                  <td className="p-4 font-mono text-xs text-slate-500">
                    {new Date(row.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-4 font-semibold text-slate-200">{row.aqi}</td>
                  <td className="p-4">{row.co2.toFixed(0)}</td>
                  <td className="p-4">{row.pm25.toFixed(1)}</td>
                  <td className="p-4">{row.pm10.toFixed(1)}</td>
                  <td className="p-4">{row.temperature.toFixed(1)}</td>
                  <td className="p-4">{row.humidity.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveData;