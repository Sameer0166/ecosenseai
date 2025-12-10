import React, { useState, useEffect, useRef } from 'react';
import { getAQILevel, getLevelColor, getBgColor } from '../constants';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  isAqi?: boolean; // Special styling for AQI card
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, isAqi, trend }) => {
  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
  const aqiLevel = isAqi ? getAQILevel(numValue) : null;
  
  // Animation state
  const [animate, setAnimate] = useState(false);
  const prevValueRef = useRef(numValue);

  useEffect(() => {
    if (isAqi) {
      // Trigger animation if value changes by more than 1 unit (significant enough for display)
      if (Math.abs(numValue - prevValueRef.current) > 1) {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500); // 500ms pulse duration
        return () => clearTimeout(timer);
      }
    }
    prevValueRef.current = numValue;
  }, [numValue, isAqi]);

  // Dynamic border/bg if it's the AQI card
  let containerClass = isAqi && aqiLevel
    ? `glass-panel rounded-xl p-6 transition-all duration-300 ${getBgColor(aqiLevel)} border-opacity-50`
    : `glass-panel rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300`;

  // Add pulse animation classes if triggered
  if (animate) {
    containerClass += ` scale-[1.03] brightness-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]`;
  }

  const textColor = isAqi && aqiLevel ? getLevelColor(aqiLevel) : 'text-cyan-400';

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-700/50 p-3 rounded-lg text-gray-300">
          {icon}
        </div>
        {trend && (
           <span className={`text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
             {trend === 'up' ? '↑ Rising' : '↓ Falling'}
           </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className="flex items-end mt-2 gap-2">
          <span className={`text-4xl font-bold ${textColor}`}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-slate-500 mb-1 text-sm font-semibold">{unit}</span>
        </div>
        {isAqi && aqiLevel && (
          <p className={`mt-2 text-sm font-medium ${textColor}`}>
            {aqiLevel}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;