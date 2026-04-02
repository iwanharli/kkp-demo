// ============================================
// MODUL 5: SOCIAL & INDOPOL PULSE
// Analisis Sentimen Sosial & Media Monitoring
// ============================================

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
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
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Newspaper,
  MapPin,
  Hash,
  Activity,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Radio
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';
import type { SentimentType } from '@/types';
import 'leaflet/dist/leaflet.css';

const SENTIMENT_COLORS = {
  'Positif': '#16a34a',
  'Netral': '#6b7280',
  'Negatif': '#dc2626',
};

const SENTIMENT_ICONS = {
  'Positif': ThumbsUp,
  'Netral': Minus,
  'Negatif': ThumbsDown,
};

export const Modul5_SentimentAnalysis: React.FC = () => {
  const { 
    sentimentData, 
    stats, 
    newsBySentiment,
    trendingKeywords,
    chartData 
  } = useSentimentAnalysis();

  // Data untuk pie chart
  const sentimentPieData = [
    { name: 'Positif', value: stats.positif, color: SENTIMENT_COLORS.Positif },
    { name: 'Netral', value: stats.netral, color: SENTIMENT_COLORS.Netral },
    { name: 'Negatif', value: stats.negatif, color: SENTIMENT_COLORS.Negatif },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Radio className="w-6 h-6 text-cyan-400" />
            SOCIAL & INDOPOL PULSE
          </h2>
          <p className="text-slate-400 mt-1">
            Analisis Sentimen Sosial dari Indopol Network (Berita & Media Sosial)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">LIVE MONITORING</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Mention</p>
                <p className="text-2xl font-bold text-white">{stats.totalVolume.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-green-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm">Sentimen Positif</p>
                <p className="text-2xl font-bold text-white">{stats.positifPercent}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-red-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm">Sentimen Negatif</p>
                <p className="text-2xl font-bold text-white">{stats.negatifPercent}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Wilayah</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Score</p>
                <p className={`text-2xl font-bold ${
                  stats.avgScore > 0 ? 'text-green-400' : 
                  stats.avgScore < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {stats.avgScore > 0 ? '+' : ''}{stats.avgScore}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Heatmap */}
        <Card className="bg-slate-900/80 border-slate-700 lg:col-span-2 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Map-based Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="flex-1 min-h-[450px] rounded-b-lg overflow-hidden relative">
              <MapContainer
                center={[-2.5, 115]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {sentimentData.map((item) => {
                  const color = item.sentiment === 'Positif' ? '#16a34a' :
                    item.sentiment === 'Negatif' ? '#dc2626' : '#6b7280';
                  
                  return (
                    <CircleMarker
                      key={item.id}
                      center={item.lokasi.koordinat}
                      radius={Math.sqrt(item.volume) * 2}
                      pathOptions={{
                        fillColor: color,
                        color: color,
                        fillOpacity: 0.6,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h4 className="font-bold text-slate-800">{item.lokasi.nama}</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                              <span className="text-slate-500">Sentimen:</span>
                              <span 
                                className="font-medium"
                                style={{ color }}
                              >
                                {item.sentiment}
                              </span>
                            </p>
                            <p><span className="text-slate-500">Score:</span> {item.score}</p>
                            <p><span className="text-slate-500">Volume:</span> {item.volume} mention</p>
                            <div className="mt-2">
                              <p className="text-slate-500 text-xs">Top Keywords:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.topKeywords.map((kw, idx) => (
                                  <span 
                                    key={idx}
                                    className="text-[10px] bg-slate-200 px-2 py-0.5 rounded"
                                  >
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trending Keywords */}
        <Card className="bg-slate-900/80 border-slate-700 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              Trending Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingKeywords.map(([keyword, count], idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold w-6">#{idx + 1}</span>
                    <span className="text-white">{keyword}</span>
                  </div>
                  <Badge variant="outline" className="text-slate-400">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Distribusi Sentimen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sentimentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {sentimentPieData.map((entry, index) => (
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

              {/* Legend */}
              <div className="space-y-3 flex flex-col justify-center">
                {sentimentPieData.map((item) => {
                  const Icon = SENTIMENT_ICONS[item.name as SentimentType];
                  return (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <span className="text-white">{item.name}</span>
                      </div>
                      <span className="text-slate-400">{item.value} wilayah</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment by Location */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-cyan-400" />
              Volume Mention per Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} angle={-45} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="positif" stackId="a" fill="#16a34a" name="Positif" />
                <Bar dataKey="netral" stackId="a" fill="#6b7280" name="Netral" />
                <Bar dataKey="negatif" stackId="a" fill="#dc2626" name="Negatif" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* News Feed */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            Indopol Network - Berita Terkini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Positive News */}
            <div>
              <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                Berita Positif
              </h4>
              <div className="space-y-3">
                {newsBySentiment.Positif.slice(0, 3).map((news) => (
                  <div key={news.id} className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h5 className="text-white text-sm font-medium line-clamp-2">{news.title}</h5>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{news.source}</span>
                      <span>{news.lokasi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral News */}
            <div>
              <h4 className="text-slate-400 font-medium mb-3 flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Berita Netral
              </h4>
              <div className="space-y-3">
                {newsBySentiment.Netral.slice(0, 3).map((news) => (
                  <div key={news.id} className="p-3 bg-slate-800 rounded-lg">
                    <h5 className="text-white text-sm font-medium line-clamp-2">{news.title}</h5>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{news.source}</span>
                      <span>{news.lokasi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative News */}
            <div>
              <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4" />
                Berita Negatif
              </h4>
              <div className="space-y-3">
                {newsBySentiment.Negatif.slice(0, 3).map((news) => (
                  <div key={news.id} className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                    <h5 className="text-white text-sm font-medium line-clamp-2">{news.title}</h5>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{news.source}</span>
                      <span>{news.lokasi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Table */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-400" />
            Detail Analisis Sentimen per Wilayah
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Wilayah</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Sentimen</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Score</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Volume</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Sumber</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Keywords</th>
                </tr>
              </thead>
              <tbody>
                {sentimentData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-white">{item.lokasi.nama}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge 
                        style={{ 
                          backgroundColor: `${SENTIMENT_COLORS[item.sentiment]}20`,
                          color: SENTIMENT_COLORS[item.sentiment],
                          borderColor: SENTIMENT_COLORS[item.sentiment]
                        }}
                        variant="outline"
                      >
                        {item.sentiment}
                      </Badge>
                    </td>
                    <td className={`py-3 px-4 text-center font-medium ${
                      item.score > 0 ? 'text-green-400' : 
                      item.score < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {item.score > 0 ? '+' : ''}{item.score}
                    </td>
                    <td className="py-3 px-4 text-right text-white">{item.volume}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs">
                      <div className="flex gap-2">
                        <span>📰 {item.sources.news}</span>
                        <span>💬 {item.sources.social}</span>
                        <span>📝 {item.sources.forum}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.topKeywords.slice(0, 3).map((kw, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
