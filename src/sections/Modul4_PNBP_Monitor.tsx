// ============================================
// MODUL 4: REVENUE LEAKAGE & PNBP MONITOR
// Kalkulator PNBP Otomatis berbasis PP No. 85/2021
// ============================================

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp,
  AlertTriangle,
  Calculator,
  Search,
  FileText,
  Wallet,
  PiggyBank,
  AlertOctagon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePNBPMonitor, formatRupiah } from '@/hooks/usePNBPMonitor';
import type { PNBPData } from '@/types';

const STATUS_COLORS = {
  'Aman': '#16a34a',
  'Rendah': '#22c55e',
  'Sedang': '#eab308',
  'Tinggi': '#f97316',
  'Kritis': '#dc2626',
};

export const Modul4_PNBP_Monitor: React.FC = () => {
  const { 
    data, 
    summary, 
    chartData, 
    topKebocoran,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    calculatePNBP
  } = usePNBPMonitor();

  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInputs, setCalcInputs] = useState({
    ukuran: '',
    tarifDasar: '',
    indeksLokasi: '1.0',
  });
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const ukuran = parseFloat(calcInputs.ukuran);
    const tarif = parseFloat(calcInputs.tarifDasar);
    const indeks = parseFloat(calcInputs.indeksLokasi);
    
    if (!isNaN(ukuran) && !isNaN(tarif) && !isNaN(indeks)) {
      setCalcResult(calculatePNBP(ukuran, tarif, indeks));
    }
  };

  // Data untuk pie chart status
  const statusPieData = Object.entries(chartData.byStatus).map(([status, count]) => ({
    name: status,
    value: count,
    color: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
  }));

  // Data untuk bar chart jenis asset
  const jenisBarData = Object.entries(chartData.byJenis).map(([jenis, data]) => ({
    name: jenis,
    count: data.count,
    kebocoran: data.kebocoran,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-cyan-400" />
            REVENUE LEAKAGE & PNBP MONITOR
          </h2>
          <p className="text-slate-400 mt-1">
            Kalkulator PNBP Otomatis berbasis PP No. 85 Tahun 2021
          </p>
        </div>
        <Button
          onClick={() => setShowCalculator(!showCalculator)}
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Kalkulator PNBP
        </Button>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <Card className="bg-slate-900/80 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                Kalkulator PNBP (PP No. 85/2021)
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCalculator(false)}
                className="text-slate-400"
              >
                Tutup
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Luas/Panjang</label>
                <Input
                  type="number"
                  value={calcInputs.ukuran}
                  onChange={(e) => setCalcInputs({ ...calcInputs, ukuran: e.target.value })}
                  placeholder="Contoh: 100"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Tarif Dasar (Rp)</label>
                <Input
                  type="number"
                  value={calcInputs.tarifDasar}
                  onChange={(e) => setCalcInputs({ ...calcInputs, tarifDasar: e.target.value })}
                  placeholder="Contoh: 50000"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Indeks Lokasi</label>
                <select
                  value={calcInputs.indeksLokasi}
                  onChange={(e) => setCalcInputs({ ...calcInputs, indeksLokasi: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2"
                >
                  <option value="0.5">0.5 (Terdepan/Terluar)</option>
                  <option value="1.0">1.0 (Standar)</option>
                  <option value="1.5">1.5 (Strategis)</option>
                  <option value="2.0">2.0 (Sangat Strategis)</option>
                  <option value="2.5">2.5 (Khusus)</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleCalculate} className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Hitung
                </Button>
              </div>
            </div>
            
            {calcResult !== null && (
              <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <p className="text-slate-400 text-sm">PNBP yang Harus Dibayar:</p>
                <p className="text-3xl font-bold text-cyan-400">{formatRupiah(calcResult)}</p>
                <p className="text-slate-500 text-xs mt-1">
                  Rumus: {calcInputs.ukuran} × {formatRupiah(parseFloat(calcInputs.tarifDasar) || 0)} × {calcInputs.indeksLokasi}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">PNBP Seharusnya</p>
                <p className="text-xl font-bold text-white">{formatRupiah(summary.totalSeharusnya)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">PNBP Terbayar</p>
                <p className="text-xl font-bold text-green-400">{formatRupiah(summary.totalTerbayar)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-red-700/50 border-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm">Potensi Kebocoran</p>
                <p className="text-xl font-bold text-red-400">{formatRupiah(summary.totalKebocoran)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center animate-pulse">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Asset Bermasalah</p>
                <p className="text-xl font-bold text-yellow-400">
                  {summary.assetBermasalah} <span className="text-sm text-slate-500">/ {summary.jumlahAsset}</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Distribusi Status PNBP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusPieData.map((entry, index) => (
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
          </CardContent>
        </Card>

        {/* Kebocoran by Jenis */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Kebocoran per Jenis Asset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={jenisBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} angle={-45} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  formatter={(value: number) => formatRupiah(value)}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="kebocoran" fill="#dc2626" name="Nilai Kebocoran" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Kebocoran */}
      <Card className="bg-slate-900/80 border-red-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-400" />
            Top 5 Potensi Kebocoran Terbesar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topKebocoran.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.namaAsset}</p>
                    <p className="text-slate-500 text-sm">{item.assetId} • {item.jenisAsset}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-bold text-lg">{formatRupiah(item.selisih)}</p>
                  <p className="text-slate-500 text-sm">{item.potensiKebocoran}% tidak terbayar</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Daftar Asset & PNBP</span>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari asset..."
                  className="pl-10 bg-slate-800 border-slate-600 text-white w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as PNBPData['status'] | 'all')}
                className="bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2"
              >
                <option value="all">Semua Status</option>
                <option value="Aman">Aman</option>
                <option value="Rendah">Rendah</option>
                <option value="Sedang">Sedang</option>
                <option value="Tinggi">Tinggi</option>
                <option value="Kritis">Kritis</option>
              </select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Asset ID</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Nama Asset</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Jenis</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Seharusnya</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Terbayar</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Selisih</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 15).map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-cyan-400 font-mono">{item.assetId}</td>
                    <td className="py-3 px-4 text-white">{item.namaAsset}</td>
                    <td className="py-3 px-4 text-slate-300">{item.jenisAsset}</td>
                    <td className="py-3 px-4 text-right text-white">{formatRupiah(item.pnbpSeharusnya)}</td>
                    <td className="py-3 px-4 text-right text-green-400">{formatRupiah(item.pnbpTerbayar)}</td>
                    <td className="py-3 px-4 text-right text-red-400">{formatRupiah(item.selisih)}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        style={{ 
                          backgroundColor: `${STATUS_COLORS[item.status]}20`,
                          color: STATUS_COLORS[item.status],
                          borderColor: STATUS_COLORS[item.status]
                        }}
                        variant="outline"
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 15 && (
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-slate-600 text-slate-400">
                Lihat {data.length - 15} Data Lainnya
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formula Info */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Rumus Perhitungan PNBP (PP No. 85/2021)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <p className="text-2xl font-mono text-cyan-400">
              PNBP = Luas/Panjang × Tarif Dasar × Indeks Lokasi
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-slate-700 rounded">
                <p className="text-slate-400">Luas/Panjang</p>
                <p className="text-white">m², km², km, GT</p>
              </div>
              <div className="p-3 bg-slate-700 rounded">
                <p className="text-slate-400">Tarif Dasar</p>
                <p className="text-white">Sesuai jenis pemanfaatan</p>
              </div>
              <div className="p-3 bg-slate-700 rounded">
                <p className="text-slate-400">Indeks Lokasi</p>
                <p className="text-white">0.5 - 2.5</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
