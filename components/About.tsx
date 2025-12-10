import React from 'react';
import { Icons } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 text-slate-300">
      <div className="glass-panel p-8 rounded-2xl border-l-4 border-emerald-500">
        <h2 className="text-2xl font-bold text-white mb-4">About EcoSense AI</h2>
        <p className="leading-relaxed">
          EcoSense AI is a conceptual next-generation pollution monitoring system designed to bridge the gap between raw environmental data and actionable health insights. By leveraging simulated IoT sensor networks and Artificial Intelligence, we provide real-time visibility into the air you breathe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl">
            <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                <Icons.Activity />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">What is Pollution Monitoring?</h3>
            <p className="text-sm text-slate-400">
                It involves the systematic tracking of airborne pollutants such as Particulate Matter (PM2.5, PM10), Carbon Dioxide (CO2), and Ozone. This data is aggregated to calculate the Air Quality Index (AQI), a standard metric for public health advisories.
            </p>
        </div>

        <div className="glass-panel p-6 rounded-xl">
            <div className="bg-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                <Icons.Brain />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">How AI Predicts Pollution</h3>
            <p className="text-sm text-slate-400">
                Machine Learning models analyze historical patterns, weather forecasts (wind speed, humidity), and traffic data. By recognizing correlations, the AI can forecast dangerous AQI spikes hours before they occur, allowing for proactive measures.
            </p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold text-white mb-4">Why This Matters</h3>
        <p className="max-w-2xl mx-auto">
            Air pollution is a leading cause of respiratory diseases globally. Systems like EcoSense empower communities with data, encouraging both personal protective actions and broader environmental policy changes.
        </p>
      </div>
    </div>
  );
};

export default About;