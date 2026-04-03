// ============================================
// NEXGOV INTELEJEN DASHBOARD
// KKP (Kementerian Kelautan dan Perikanan)
// Tema: Cyber-Intelligence War Room
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Layers, 
  DollarSign, 
  Radio,
  Menu,
  Bell,
  Settings,
  User,
  LogOut,
  Activity,
  Clock,
  Server
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Modul1_KKPRL_Tracker } from '@/sections/Modul1_KKPRL_Tracker';
import { Modul2_UnderseaAsset } from '@/sections/Modul2_UnderseaAsset';
import { Modul3_SpatialConflict } from '@/sections/Modul3_SpatialConflict';
import { Modul4_PNBP_Monitor } from '@/sections/Modul4_PNBP_Monitor';
import { Modul5_SentimentAnalysis } from '@/sections/Modul5_SentimentAnalysis';
import './App.css';

type ViewMode = 'overview' | 'module1' | 'module2' | 'module3' | 'module4' | 'module5';

interface MenuItem {
  id: ViewMode;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  { 
    id: 'module1', 
    label: 'Smart KKPRL Tracker', 
    icon: FileText, 
    description: 'Monitoring Perizinan',
    color: '#06b6d4'
  },
  { 
    id: 'module2', 
    label: 'Undersea Asset Integrity', 
    icon: Shield, 
    description: 'AIS Geofencing',
    color: '#8b5cf6'
  },
  { 
    id: 'module3', 
    label: 'AI Spatial Conflict', 
    icon: Layers, 
    description: 'Deteksi Konflik',
    color: '#f59e0b'
  },
  { 
    id: 'module4', 
    label: 'PNBP Monitor', 
    icon: DollarSign, 
    description: 'Revenue Leakage',
    color: '#10b981'
  },
  { 
    id: 'module5', 
    label: 'Social & Indopol Pulse', 
    icon: Radio, 
    description: 'Sentiment Analysis',
    color: '#ec4899'
  },
];

// Real-time clock component
const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider">
        <Clock className="w-3.5 h-3.5" />
        <span>{time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      </div>
      <div className="w-px h-3 bg-slate-800" />
      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">WIB / UTC+7</span>
    </div>
  );
};

// Overview Dashboard
const OverviewDashboard: React.FC<{ onSelectModule: (id: ViewMode) => void }> = ({ onSelectModule }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-cyan-500/30 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwVjQwWiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMFY0MFoiIGZpbGw9IiMwNmI2ZDQiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="relative z-10 w-full max-w-[200px] flex justify-center">
          <div className="w-32 h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl p-4">
            <img src="/logo.svg" alt="Nexgov Logo" className="w-full h-full object-contain filter invert brightness-200" />
          </div>
        </div>

        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-[10px] font-bold tracking-widest">
              SYSTEM ONLINE
            </Badge>
            <Badge variant="outline" className="border-green-500/50 text-green-400 text-[10px] font-bold tracking-widest">
              SECURE
            </Badge>
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">
            NEXGOV <span className="text-cyan-400">INTELLIGENCE</span>
          </h1>
          <p className="text-slate-450 max-w-xl text-sm leading-relaxed">
            Pusat Command Center Intelijen Laut Kementerian Kelautan dan Perikanan. 
            Menganalisis data, memantau infrastruktur, dan memetakan persepsi publik secara real-time.
          </p>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className="group relative bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 text-left"
            >
              <div 
                className="absolute top-0 left-0 w-1 h-full rounded-l-xl transition-all duration-300 group-hover:w-2"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <Badge variant="outline" className="text-slate-500 border-slate-600">
                  MODUL
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {item.label}
              </h3>
              <p className="text-slate-500 text-sm">{item.description}</p>
              
              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-cyan-400 text-sm flex items-center gap-1">
                  Buka <span className="text-lg">→</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Server Status</p>
              <p className="text-green-400 font-medium">Operational</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Data Stream</p>
              <p className="text-cyan-400 font-medium">Active</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Security</p>
              <p className="text-blue-400 font-medium">Protected</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Last Update</p>
              <p className="text-purple-400 font-medium">Just now</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Info */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Informasi Sistem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Dashboard ini terintegrasi dengan sistem SIMPONI untuk data PNBP
              </p>
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Data AIS diperbarui real-time dari sumber terpercaya
              </p>
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Analisis sentimen menggunakan AI/ML model
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Regulasi referensi: PP No. 85 Tahun 2021
              </p>
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Data layer spasial sesuai dengan BAKOSURTANAL
              </p>
              <p className="text-slate-400">
                <span className="text-cyan-400">•</span> Sistem monitoring 24/7 aktif
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (currentView) {
      case 'module1':
        return <Modul1_KKPRL_Tracker />;
      case 'module2':
        return <Modul2_UnderseaAsset />;
      case 'module3':
        return <Modul3_SpatialConflict />;
      case 'module4':
        return <Modul4_PNBP_Monitor />;
      case 'module5':
        return <Modul5_SentimentAnalysis />;
      default:
        return <OverviewDashboard onSelectModule={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-header z-[2000]">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-300 group"
            >
              <Menu className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? 'rotate-90' : '0'}`} />
            </button>
              <div className="h-10 w-auto flex items-center justify-center overflow-hidden group">
                <img src="/logo.svg" alt="Nexgov Intelligence Logo" className="h-full w-auto object-contain filter invert brightness-200" />
              </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <RealTimeClock />
            </div>
            <div className="flex items-center gap-4 border-l border-slate-700/50 pl-6">
              <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
              </button>
              <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
              <div className="h-8 w-px bg-slate-700/50 mx-1" />
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-none">Admin Terminal</p>
                  <p className="text-[10px] text-green-500 font-medium leading-tight">Privileged</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors profile-img">
                  <User className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 glass-sidebar sidebar-container z-[1999] flex flex-col ${
          sidebarOpen ? 'w-64' : 'sidebar-collapsed'
        }`}
      >
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          <button
            onClick={() => setCurrentView('overview')}
            className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              currentView === 'overview'
                ? 'sidebar-item-active'
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="min-w-[24px] flex justify-center">
              <LayoutDashboard className={`w-5 h-5 ${currentView === 'overview' ? 'text-cyan-400' : ''}`} />
            </div>
            <span className={`font-semibold text-sm whitespace-nowrap nav-label ${!sidebarOpen ? 'nav-label-hidden' : ''}`}>
              Dashboard
            </span>
            {!sidebarOpen && <div className="nav-tooltip">Dashboard</div>}
          </button>

          <div className="pt-4 pb-2">
            <p className={`px-4 text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3 nav-label ${!sidebarOpen ? 'nav-label-hidden opacity-0' : ''}`}>
              Sektor Intelijen
            </p>
            <div className="space-y-1">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                      isActive
                        ? 'sidebar-item-active'
                        : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="min-w-[24px] flex justify-center">
                      <Icon 
                        className={`w-5 h-5 transition-colors duration-300`} 
                        style={{ color: isActive ? item.color : undefined }} 
                      />
                    </div>
                    <span className={`font-medium text-sm whitespace-nowrap nav-label ${!sidebarOpen ? 'nav-label-hidden' : ''}`}>
                      {item.label}
                    </span>
                    {!sidebarOpen && <div className="nav-tooltip">{item.label}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer / User Profile Area */}
        <div className="p-3 sidebar-footer">
          <button className="w-full sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all group">
            <div className="min-w-[24px] flex justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className={`font-medium text-sm whitespace-nowrap nav-label ${!sidebarOpen ? 'nav-label-hidden' : ''}`}>
              Sign Out System
            </span>
            {!sidebarOpen && <div className="nav-tooltip">Sign Out</div>}
          </button>
          
          {sidebarOpen && (
            <div className="mt-4 px-2 py-3 bg-slate-950/40 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Secured Node</p>
                  <p className="text-[11px] text-slate-300 font-mono truncate">192.168.1.104</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-[72px]'
        }`}
      >
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          {currentView !== 'overview' && (
            <div className="mb-6 flex items-center gap-3 text-xs">
              <button
                onClick={() => setCurrentView('overview')}
                className="text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold tracking-widest"
              >
                Intelligent Hub
              </button>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <span className="text-cyan-500 uppercase font-black tracking-widest">
                {MENU_ITEMS.find(item => item.id === currentView)?.label}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t border-slate-800/50 bg-[#0a0f1c] transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-[72px]'
        }`}
      >
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} KKP Republik Indonesia</span>
            <div className="w-1 h-1 bg-slate-800 rounded-full" />
            <span className="text-cyan-500/50 font-mono">Nexgov Intelligence v2.4-stable</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 bg-green-500/5 text-green-500 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Operational Reliability: 99.9%
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
