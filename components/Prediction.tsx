import React, { useState } from 'react';
import { SensorData, PollutionLevel, PredictionResult } from '../types';
import { Icons, getAQILevel, getLevelColor } from '../constants';
import { getGeminiPollutionAnalysis } from '../services/geminiService';

interface PredictionProps {
  currentData: SensorData;
}

const Prediction: React.FC<PredictionProps> = ({ currentData }) => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState<string | null>(null);
  const [activityLevel, setActivityLevel] = useState(50); // 0-100, 50 is default/normal

  // Validate and update slider value
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    
    // Validation: Ensure value is a number
    if (isNaN(val)) {
      return; 
    }
    
    // Validation: Clamp value between 0 and 100
    val = Math.max(0, Math.min(100, val));
    
    setActivityLevel(val);
  };

  const handleRunPrediction = async () => {
    setLoading(true);
    setPrediction(null);
    setGeminiAnalysis(null);

    // 1. Simulate Local Calculation
    // Base the numeric prediction on the current AQI + the "Activity Level" slider influence
    // Activity > 50 adds pollution, < 50 subtracts it (simulating lower emissions)
    const activityImpact = (activityLevel - 50) * 1.5; // Scale factor
    const randomVariation = (Math.random() * 15) - 5; // Slight randomness
    
    let predictedVal = currentData.aqi + activityImpact + randomVariation;
    predictedVal = Math.max(10, Math.round(predictedVal)); // Ensure realistic minimum
    
    const level = getAQILevel(predictedVal);

    // 2. Call Gemini for Textual Analysis with the scenario parameter
    const analysisPromise = getGeminiPollutionAnalysis(currentData, activityLevel);
    
    // Simulate processing delay for effect
    setTimeout(async () => {
      setPrediction({
        predictedAqi: predictedVal,
        level: level,
        advisory: "Wind patterns suggest a stagnation of pollutants in the next 12 hours.",
        confidence: 87
      });
      
      const analysisText = await analysisPromise;
      setGeminiAnalysis(analysisText);
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          AI Environmental Forecast
        </h2>
        <p className="text-slate-400 mt-2">
          Adjust simulation parameters and run our deep learning model to predict future air quality.
        </p>
      </div>

      {/* Control Panel */}
      <div className="glass-panel p-8 rounded-2xl text-center border-t-4 border-cyan-500/50">
        <div className="flex flex-col items-center justify-center gap-8">
          
          {/* Icon Header */}
          <div className="p-4 bg-cyan-500/10 rounded-full animate-pulse">
            <Icons.Brain className="w-12 h-12 text-cyan-400" />
          </div>

          {/* Scenario Slider */}
          {!loading && !prediction && (
            <div className="w-full max-w-md bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <label htmlFor="activity-slider" className="block text-left text-sm font-medium text-slate-300 mb-4">
                Hypothetical Local Activity (Traffic / Industry)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 font-mono w-8">0%</span>
                <input 
                  id="activity-slider"
                  type="range" 
                  min="0" 
                  max="100" 
                  value={activityLevel} 
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
                />
                <span className="text-xs text-slate-500 font-mono w-8">100%</span>
              </div>
              <div className="flex justify-between mt-2">
                 <span className="text-xs text-emerald-400">Low Emission</span>
                 <span className="text-xs text-slate-400 font-bold">{activityLevel === 50 ? 'Baseline' : `${activityLevel}% Intensity`}</span>
                 <span className="text-xs text-red-400">High Emission</span>
              </div>
            </div>
          )}
          
          {/* Action Button */}
          {!prediction && !loading && (
            <div className="space-y-4">
              <button 
                onClick={handleRunPrediction}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                Run Prediction Model
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-3 w-full max-w-md">
              <div className="flex justify-between text-xs text-cyan-300 font-mono mb-1">
                <span>Processing Sensor Data...</span>
                <span>Applying Scenario ({activityLevel}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 animate-progress origin-left w-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {prediction && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
          
          {/* Numeric Result */}
          <div className="glass-panel p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-400 text-sm uppercase font-semibold">24-Hour Forecast</h3>
              <button onClick={() => setPrediction(null)} className="text-xs text-cyan-400 hover:underline">
                Reset
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`text-6xl font-bold ${getLevelColor(prediction.level)}`}>
                {prediction.predictedAqi}
              </div>
              <div>
                 <div className="text-slate-500 text-sm">Expected AQI</div>
                 <div className={`text-lg font-medium ${getLevelColor(prediction.level)}`}>{prediction.level}</div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
               <div className="text-xs text-slate-400 mb-1">Scenario Applied:</div>
               <div className="flex items-center gap-2">
                 <div className="flex-1 h-1.5 bg-slate-700 rounded-full">
                   <div 
                      className={`h-1.5 rounded-full ${activityLevel > 50 ? 'bg-red-400' : 'bg-emerald-400'}`} 
                      style={{ width: `${activityLevel}%` }}
                   ></div>
                 </div>
                 <span className="text-xs font-mono text-slate-300">{activityLevel}% Intensity</span>
               </div>
            </div>

            <div className="mt-4">
               <div className="flex justify-between text-xs text-slate-500 mb-1">
                 <span>Model Confidence</span>
                 <span>{prediction.confidence}%</span>
               </div>
               <div className="w-full bg-slate-700 h-1.5 rounded-full">
                 <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${prediction.confidence}%` }}></div>
               </div>
            </div>
          </div>

          {/* Textual Analysis (Gemini) */}
          <div className="glass-panel p-6 rounded-xl border border-slate-700 flex flex-col">
            <h3 className="text-slate-400 text-sm uppercase font-semibold mb-2 flex items-center gap-2">
              <Icons.Zap className="w-4 h-4 text-yellow-400" />
              AI Insight
            </h3>
            <div className="flex-1 bg-slate-800/50 rounded-lg p-4 text-slate-300 text-sm leading-relaxed border border-slate-700/50">
               {geminiAnalysis ? geminiAnalysis : "Analyzing data..."}
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Prediction;