import React from 'react';
import MetricCard from './MetricCard';
import { AqiHistoryChart, PollutantBarChart } from './Charts';
import { SensorData } from '../types';
import { Icons } from '../constants';

interface DashboardProps {
  currentData: SensorData;
  history: SensorData[];
}

const Dashboard: React.FC<DashboardProps> = ({ currentData, history }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Main AQI Card (Spans 2 cols on tablet, 1 on desktop but visually prominent) */}
        <div className="md:col-span-2 lg:col-span-1">
          <MetricCard 
            title="Air Quality Index" 
            value={currentData.aqi} 
            unit="US AQI" 
            icon={<Icons.Activity className="w-6 h-6" />}
            isAqi={true}
          />
        </div>

        <MetricCard 
          title="Carbon Dioxide" 
          value={currentData.co2} 
          unit="ppm" 
          icon={<Icons.CloudFog className="w-6 h-6" />}
          trend={currentData.co2 > 450 ? 'up' : 'stable'}
        />

        <MetricCard 
          title="Particulate Matter 2.5" 
          value={currentData.pm25} 
          unit="µg/m³" 
          icon={<Icons.Wind className="w-6 h-6" />}
        />

        <MetricCard 
          title="Temperature" 
          value={currentData.temperature} 
          unit="°C" 
          icon={<Icons.Thermometer className="w-6 h-6" />}
        />

      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <MetricCard 
          title="Humidity" 
          value={currentData.humidity} 
          unit="%" 
          icon={<Icons.Droplets className="w-6 h-6" />}
        />
        <MetricCard 
          title="Particulate Matter 10" 
          value={currentData.pm10} 
          unit="µg/m³" 
          icon={<Icons.Wind className="w-6 h-6" />}
        />
        {/* Placeholders for future expansion */}
        <div className="hidden lg:block lg:col-span-2 glass-panel rounded-xl p-6 flex items-center justify-center text-slate-500 text-sm">
           System Status: All Sensors Online
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AqiHistoryChart data={history} />
        <PollutantBarChart current={currentData} />
      </div>

    </div>
  );
};

export default Dashboard;