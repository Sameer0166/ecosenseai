import React, { useState, useEffect } from 'react';
import { ViewState, SensorData } from './types';
import { SIMULATION_INTERVAL, Icons } from './constants';
import { getNextSensorReading } from './services/simulationService';
import Dashboard from './components/Dashboard';
import LiveData from './components/LiveData';
import Prediction from './components/Prediction';
import About from './components/About';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [currentData, setCurrentData] = useState<SensorData>(getNextSensorReading());
  const [history, setHistory] = useState<SensorData[]>([]);

  // Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      const next = getNextSensorReading();
      setCurrentData(next);
      setHistory(prev => {
        const newHistory = [...prev, next];
        // Keep last 30 data points for performance
        if (newHistory.length > 30) return newHistory.slice(newHistory.length - 30);
        return newHistory;
      });
    }, SIMULATION_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const NavItem = ({ id, label, icon }: { id: ViewState, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setView(id)}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-200 ${
        view === id 
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-100 font-sans selection:bg-emerald-500/30">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-[#0f172a] fixed h-full z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Icons.Wind className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">EcoSense AI</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem id="dashboard" label="Dashboard" icon={<Icons.LayoutDashboard className="w-5 h-5"/>} />
          <NavItem id="live" label="Live Data" icon={<Icons.Activity className="w-5 h-5"/>} />
          <NavItem id="prediction" label="AI Prediction" icon={<Icons.Brain className="w-5 h-5"/>} />
          <NavItem id="about" label="About System" icon={<Icons.Info className="w-5 h-5"/>} />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            Status: <span className="text-emerald-400 font-bold">Online</span>
            <br />
            Simulating IoT Network
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-white">
          <Icons.Wind className="text-emerald-400 w-5 h-5" /> EcoSense AI
        </div>
        <button className="text-slate-400" onClick={() => {
           // Simple toggle for mobile view logic could go here, 
           // but for simplicity we'll just use the bottom bar navigation for mobile
        }}>
           <span className="text-xs bg-slate-800 px-2 py-1 rounded">Menu</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white capitalize">{view.replace('-', ' ')}</h2>
            <p className="text-slate-400 mt-1">
              {view === 'dashboard' && 'Real-time environmental overview'}
              {view === 'live' && 'Incoming raw sensor telemetry'}
              {view === 'prediction' && 'Neural network forecasting model'}
              {view === 'about' && 'System documentation & info'}
            </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-sm text-slate-400">Current Time</div>
             <div className="text-xl font-mono text-emerald-400">
               {new Date(currentData.timestamp).toLocaleTimeString()}
             </div>
          </div>
        </header>

        {view === 'dashboard' && <Dashboard currentData={currentData} history={history} />}
        {view === 'live' && <LiveData history={history} />}
        {view === 'prediction' && <Prediction currentData={currentData} />}
        {view === 'about' && <About />}

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#0f172a] border-t border-slate-800 flex justify-around p-3 z-50">
        <button onClick={() => setView('dashboard')} className={`p-2 rounded-lg ${view === 'dashboard' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400'}`}><Icons.LayoutDashboard /></button>
        <button onClick={() => setView('live')} className={`p-2 rounded-lg ${view === 'live' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400'}`}><Icons.Activity /></button>
        <button onClick={() => setView('prediction')} className={`p-2 rounded-lg ${view === 'prediction' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400'}`}><Icons.Brain /></button>
        <button onClick={() => setView('about')} className={`p-2 rounded-lg ${view === 'about' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400'}`}><Icons.Info /></button>
      </div>

    </div>
  );
};

export default App;