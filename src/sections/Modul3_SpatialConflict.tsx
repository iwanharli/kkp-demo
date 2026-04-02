// ============================================
// MODUL 3: AI SPATIAL CONFLICT DETECTOR
// Deteksi Tumpang Tindih Ruang Laut
// ============================================

import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import { 
  Layers, 
  CheckCircle, 
  MapPin,
  Search,
  X,
  Activity,
  Shield,
  FileWarning,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSpatialConflict } from '@/hooks/useSpatialConflict';
import type { LayerType } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Layer colors
const LAYER_COLORS: Record<LayerType, string> = {
  'KawasanKonservasi': '#16a34a',
  'AlurPelayaran': '#06b6d4',
  'KawasanStrategisNasional': '#dc2626',
  'KKPRL': '#f59e0b',
};

const LAYER_NAMES: Record<LayerType, string> = {
  'KawasanKonservasi': 'Kawasan Konservasi',
  'AlurPelayaran': 'Alur Pelayaran',
  'KawasanStrategisNasional': 'Kawasan Strategis Nasional',
  'KKPRL': 'KKPRL',
};

// Parse koordinat input
const parseCoordinates = (input: string): [number, number][] | null => {
  try {
    // Format: "lat,lng;lat,lng;lat,lng"
    const coords = input.split(';').map(pair => {
      const [lat, lng] = pair.split(',').map(Number);
      if (isNaN(lat) || isNaN(lng)) throw new Error('Invalid coordinate');
      return [lat, lng] as [number, number];
    });
    return coords.length >= 3 ? coords : null;
  } catch {
    return null;
  }
};

// Map fit bounds
const MapFitBounds: React.FC<{ coords: [number, number][] }> = ({ coords }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  
  return null;
};

export const Modul3_SpatialConflict: React.FC = () => {
  const { 
    layers, 
    inputKoordinat, 
    conflictResult, 
    isChecking,
    stats,
    checkConflict,
    clearConflict 
  } = useSpatialConflict();

  const [coordInput, setCoordInput] = useState('');
  const [visibleLayers, setVisibleLayers] = useState<Record<LayerType, boolean>>({
    'KawasanKonservasi': true,
    'AlurPelayaran': true,
    'KawasanStrategisNasional': true,
    'KKPRL': true,
  });

  const handleCheckConflict = useCallback(() => {
    const coords = parseCoordinates(coordInput);
    if (coords) {
      checkConflict(coords);
    }
  }, [coordInput, checkConflict]);

  const toggleLayer = (type: LayerType) => {
    setVisibleLayers(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Sample coordinates for demo
  const sampleCoords = [
    '-6.10,106.75;-6.10,106.80;-6.15,106.80;-6.15,106.75', // Jakarta Bay area
    '3.20,100.00;3.25,100.05;3.30,100.00;3.25,99.95', // Malacca Strait
    '-8.30,129.60;-8.30,129.70;-8.40,129.70;-8.40,129.60', // Masela block area
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Layers className="w-6 h-6 text-cyan-400" />
            AI SPATIAL CONFLICT DETECTOR
          </h2>
          <p className="text-slate-400 mt-1">
            Sistem Auto-Overlay Deteksi Konflik Ruang Laut
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-cyan-400 font-mono">AI POWERED</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <p className="text-slate-400 text-sm">Total Layer</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-green-700/50">
          <CardContent className="p-4">
            <p className="text-green-400 text-sm">Konservasi</p>
            <p className="text-2xl font-bold text-white">{stats.kawasanKonservasi}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-cyan-700/50">
          <CardContent className="p-4">
            <p className="text-cyan-400 text-sm">Alur Pelayaran</p>
            <p className="text-2xl font-bold text-white">{stats.alurPelayaran}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-red-700/50">
          <CardContent className="p-4">
            <p className="text-red-400 text-sm">KSN</p>
            <p className="text-2xl font-bold text-white">{stats.kawasanStrategis}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-yellow-700/50">
          <CardContent className="p-4">
            <p className="text-yellow-400 text-sm">KKPRL</p>
            <p className="text-2xl font-bold text-white">{stats.kkprl}</p>
          </CardContent>
        </Card>
      </div>

      {/* Conflict Checker */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            Input Koordinat untuk Pengecekan Konflik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={coordInput}
                onChange={(e) => setCoordInput(e.target.value)}
                placeholder="Format: lat,lng;lat,lng;lat,lng (minimal 3 titik)"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <Button
              onClick={handleCheckConflict}
              disabled={isChecking || !coordInput}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isChecking ? (
                <Activity className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Cek Konflik
            </Button>
            {conflictResult && (
              <Button
                variant="outline"
                onClick={clearConflict}
                className="border-slate-600"
              >
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
          
          {/* Sample coordinates */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-slate-500 text-sm">Contoh koordinat:</span>
            {sampleCoords.map((coords, idx) => (
              <button
                key={idx}
                onClick={() => setCoordInput(coords)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-2 py-1 rounded transition-colors"
              >
                Area {idx + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conflict Result */}
      {conflictResult && (
        <Card className={`border-2 ${
          conflictResult.hasConflict 
            ? 'bg-red-500/10 border-red-500/50' 
            : 'bg-green-500/10 border-green-500/50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                conflictResult.hasConflict ? 'bg-red-500/20' : 'bg-green-500/20'
              }`}>
                {conflictResult.hasConflict ? (
                  <FileWarning className="w-8 h-8 text-red-400" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${
                  conflictResult.hasConflict ? 'text-red-400' : 'text-green-400'
                }`}>
                  {conflictResult.status === 'Conflict' ? 'KONFLIK TERDETEKSI!' : 'TIDAK ADA KONFLIK'}
                </h3>
                <p className="text-slate-300 mt-1">{conflictResult.message}</p>
              </div>
              {conflictResult.hasConflict && (
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  {conflictResult.conflicts.length} Konflik
                </Badge>
              )}
            </div>

            {/* Conflict Details */}
            {conflictResult.hasConflict && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {conflictResult.conflicts.map((conflict, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 rounded-lg p-4 border border-red-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: conflict.layer.color }}
                      />
                      <h4 className="text-white font-medium">{conflict.layer.name}</h4>
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      <p className="text-slate-400">
                        <span className="text-slate-500">Tipe:</span>{' '}
                        {LAYER_NAMES[conflict.layer.type]}
                      </p>
                      <p className="text-slate-400">
                        <span className="text-slate-500">Irisan Area:</span>{' '}
                        <span className="text-red-400 font-bold">{conflict.intersectionArea.toFixed(1)}%</span>
                      </p>
                      <p className="text-slate-400">
                        <span className="text-slate-500">Regulasi:</span>{' '}
                        {conflict.layer.metadata.regulasi}
                      </p>
                      <p className="text-slate-400">
                        <span className="text-slate-500">Status:</span>{' '}
                        {conflict.layer.metadata.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Map */}
      <Card className="bg-slate-900/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Peta Layer Spasial
            </span>
            <div className="flex gap-2">
              {(Object.keys(LAYER_COLORS) as LayerType[]).map(type => (
                <button
                  key={type}
                  onClick={() => toggleLayer(type)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    visibleLayers[type]
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                  style={{
                    borderLeft: `3px solid ${visibleLayers[type] ? LAYER_COLORS[type] : 'transparent'}`
                  }}
                >
                  {LAYER_NAMES[type]}
                </button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] rounded-b-lg overflow-hidden">
            <MapContainer
              center={[-2.5, 115]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* Render Layers */}
              {layers.map(layer => (
                visibleLayers[layer.type] && (
                  <Polygon
                    key={layer.id}
                    positions={layer.coordinates}
                    pathOptions={{
                      color: layer.color,
                      fillColor: layer.color,
                      fillOpacity: layer.opacity,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h4 className="font-bold text-slate-800">{layer.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{layer.metadata.deskripsi}</p>
                        <div className="mt-2 text-xs text-slate-500">
                          <p>Regulasi: {layer.metadata.regulasi}</p>
                          <p>Status: {layer.metadata.status}</p>
                        </div>
                      </div>
                    </Popup>
                  </Polygon>
                )
              ))}

              {/* Render Input Koordinat */}
              {inputKoordinat && (
                <>
                  <MapFitBounds coords={inputKoordinat.coordinates} />
                  <Polygon
                    positions={inputKoordinat.coordinates}
                    pathOptions={{
                      color: conflictResult?.hasConflict ? '#dc2626' : '#16a34a',
                      fillColor: conflictResult?.hasConflict ? '#dc2626' : '#16a34a',
                      fillOpacity: 0.3,
                      weight: 3,
                      dashArray: '5, 5',
                    }}
                  />
                  {inputKoordinat.coordinates.map((coord, idx) => (
                    <Marker
                      key={idx}
                      position={coord}
                      icon={L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="
                          width: 12px; 
                          height: 12px; 
                          background: ${conflictResult?.hasConflict ? '#dc2626' : '#16a34a'}; 
                          border-radius: 50%; 
                          border: 2px solid white;
                        "></div>`,
                        iconSize: [12, 12],
                        iconAnchor: [6, 6],
                      })}
                    />
                  ))}
                </>
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Layer Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Daftar Layer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: layer.color }}
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{layer.name}</p>
                      <p className="text-slate-500 text-xs">{LAYER_NAMES[layer.type]}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {layer.metadata.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Statistik Konflik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Pengecekan</span>
                  <span className="text-white font-bold">{conflictResult ? 1 : 0}</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Konflik Terdeteksi</span>
                  <span className="text-red-400 font-bold">
                    {conflictResult?.conflicts.length || 0}
                  </span>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Area Aman</span>
                  <span className="text-green-400 font-bold">
                    {conflictResult && !conflictResult.hasConflict ? 1 : 0}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
