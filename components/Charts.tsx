import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { SensorData } from '../types';

interface ChartsProps {
  history: SensorData[];
  current: SensorData;
}

export const AqiHistoryChart: React.FC<{ data: SensorData[] }> = ({ data }) => {
  // Format timestamp for X-Axis
  const formattedData = data.map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div className="glass-panel p-6 rounded-xl w-full h-[350px]">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        AQI Trend (Live)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="time" stroke="#94a3b8" tick={{fontSize: 12}} />
          <YAxis stroke="#94a3b8" tick={{fontSize: 12}} domain={[0, 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Line 
            type="monotone" 
            dataKey="aqi" 
            stroke="#22d3ee" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, fill: '#22d3ee' }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PollutantBarChart: React.FC<{ current: SensorData }> = ({ current }) => {
  const data = [
    { name: 'PM2.5', value: current.pm25, fill: '#34d399' },
    { name: 'PM10', value: current.pm10, fill: '#60a5fa' },
    { name: 'CO2 (x0.1)', value: current.co2 / 10, fill: '#f472b6' }, // Scaled down for visibility
  ];

  return (
    <div className="glass-panel p-6 rounded-xl w-full h-[350px]">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        Pollutant Composition
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
           <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
           <XAxis type="number" stroke="#94a3b8" />
           <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
           <Tooltip 
              cursor={{fill: '#1e293b'}}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
           />
           <Legend />
           <Bar dataKey="value" name="Concentration" radius={[0, 4, 4, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};