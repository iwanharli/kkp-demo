// ============================================
// MODUL 1: SMART KKPRL TRACKER
// Monitoring Perizinan dengan Sankey Diagram
// ============================================

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Filter,
  TrendingUp,
  Activity,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useKKPRLTracker } from '@/hooks/useKKPRLTracker';
import type { TahapProses } from '@/types';

const TAHAP_COLORS: Record<TahapProses, string> = {
  'Administrasi': '#06b6d4',
  'Teknis': '#3b82f6',
  'Final': '#8b5cf6',
  'Selesai': '#16a34a',
};

export const Modul1_KKPRL_Tracker: React.FC = () => {
  const { 
    data, 
    stats, 
    sankeyData, 
    leadTimeAnalysis,
    filterTahap, 
    setFilterTahap 
  } = useKKPRLTracker();

  // Data untuk chart tahap
  const tahapChartData = [
    { name: 'Administrasi', value: data.filter(d => d.tahapProses === 'Administrasi').length, color: TAHAP_COLORS.Administrasi },
    { name: 'Teknis', value: data.filter(d => d.tahapProses === 'Teknis').length, color: TAHAP_COLORS.Teknis },
    { name: 'Final', value: data.filter(d => d.tahapProses === 'Final').length, color: TAHAP_COLORS.Final },
    { name: 'Selesai', value: data.filter(d => d.tahapProses === 'Selesai').length, color: TAHAP_COLORS.Selesai },
  ];

  // Data untuk bottleneck chart
  const bottleneckData = [
    { 
      name: 'Administrasi', 
      normal: data.filter(d => d.tahapProses === 'Administrasi' && !d.isBottleneck).length,
      bottleneck: data.filter(d => d.tahapProses === 'Administrasi' && d.isBottleneck).length,
    },
    { 
      name: 'Teknis', 
      normal: data.filter(d => d.tahapProses === 'Teknis' && !d.isBottleneck).length,
      bottleneck: data.filter(d => d.tahapProses === 'Teknis' && d.isBottleneck).length,
    },
    { 
      name: 'Final', 
      normal: data.filter(d => d.tahapProses === 'Final' && !d.isBottleneck).length,
      bottleneck: data.filter(d => d.tahapProses === 'Final' && d.isBottleneck).length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            SMART KKPRL TRACKER
          </h2>
          <p className="text-slate-400 mt-1">
            Sistem Monitoring Perizinan Kelautan & Deteksi Bottleneck
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterTahap}
            onChange={(e) => setFilterTahap(e.target.value as TahapProses | 'all')}
            className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">Semua Tahap</option>
            <option value="Administrasi">Administrasi</option>
            <option value="Teknis">Teknis</option>
            <option value="Final">Final</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Pengajuan</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Bottleneck</p>
                <p className="text-2xl font-bold text-red-400">{stats.bottleneck}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Selesai</p>
                <p className="text-2xl font-bold text-green-400">{stats.selesai}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Rata-rata Lead Time</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.rataRataDurasi} hari</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sankey Diagram Simulation */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Alur Proses Perizinan (Sankey)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-80">
              {/* Custom Sankey Visualization */}
              <div className="flex items-center justify-between h-full px-4">
                {/* Nodes */}
                {sankeyData.nodes.map((node, index) => {
                  const height = Math.max(30, (node.value / stats.total) * 250);
                  const isBottleneck = node.name === 'Bottleneck';
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`rounded-lg transition-all duration-500 flex items-center justify-center text-xs font-medium ${
                          isBottleneck 
                            ? 'bg-red-500/80 text-white' 
                            : 'bg-cyan-500/80 text-white'
                        }`}
                        style={{ 
                          height: `${height}px`, 
                          width: '80px',
                          minHeight: '30px'
                        }}
                      >
                        <div className="text-center p-1">
                          <div className="font-bold">{node.name}</div>
                          <div className="text-[10px]">{node.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Flow Lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
                {sankeyData.links.map((link, index) => {
                  const sourceY = 40 + (link.source * 60);
                  const targetY = 40 + (link.target * 60);
                  const strokeWidth = Math.max(2, (link.value / stats.total) * 40);
                  
                  return (
                    <path
                      key={index}
                      d={`M 100 ${sourceY} Q 200 ${sourceY} 250 ${(sourceY + targetY) / 2} Q 300 ${targetY} 400 ${targetY}`}
                      fill="none"
                      stroke={link.isBottleneck ? '#dc2626' : '#06b6d4'}
                      strokeWidth={strokeWidth}
                      opacity={0.5}
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded" />
                <span className="text-slate-400">Alur Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="text-slate-400">Bottleneck (&gt;14 hari)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Time Analysis */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Analisis Lead Time per Tahap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bottleneckData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="normal" stackId="a" fill="#06b6d4" name="Normal" />
                <Bar dataKey="bottleneck" stackId="a" fill="#dc2626" name="Bottleneck" />
              </BarChart>
            </ResponsiveContainer>

            {/* Lead Time Detail */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {Object.entries(leadTimeAnalysis).map(([tahap, analysis]) => (
                <div key={tahap} className="bg-slate-800 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">{tahap}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white font-bold">{analysis.avg} hari</span>
                    {analysis.bottleneck > 0 && (
                      <Badge variant="destructive" className="text-[10px]">
                        {analysis.bottleneck}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-500 text-[10px] mt-1">Max: {analysis.max} hari</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Chart */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Distribusi Perizinan per Tahap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tahapChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {tahapChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend & Detail */}
            <div className="space-y-3">
              {tahapChartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">{item.value} izin</span>
                    <span className="text-cyan-400 font-bold">
                      {Math.round((item.value / stats.total) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Daftar Pengajuan Izin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">ID Izin</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Pemohon</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Jenis</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Lokasi</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Tahap</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Durasi</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-cyan-400 font-mono">{item.idIzin}</td>
                    <td className="py-3 px-4 text-white">{item.pemohon}</td>
                    <td className="py-3 px-4 text-slate-300">{item.jenisIzin}</td>
                    <td className="py-3 px-4 text-slate-300">{item.lokasi.nama}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        style={{ 
                          backgroundColor: `${TAHAP_COLORS[item.tahapProses]}20`,
                          color: TAHAP_COLORS[item.tahapProses],
                          borderColor: TAHAP_COLORS[item.tahapProses]
                        }}
                        variant="outline"
                      >
                        {item.tahapProses}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-white">{item.durasiHari} hari</td>
                    <td className="py-3 px-4">
                      {item.isBottleneck ? (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          Bottleneck
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500">
                          Normal
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-slate-600 text-slate-400">
                Lihat {data.length - 10} Data Lainnya
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
