// ============================================
// MODUL 2: UNDERSEA ASSET INTEGRITY
// Deteksi Keamanan Infrastruktur Bawah Laut
// ============================================

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import { 
  AlertTriangle, 
  Anchor, 
  Activity,
  Shield,
  MapPin,
  Navigation,
  AlertOctagon,
  Bell,
  Ship
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUnderseaAsset } from '@/hooks/useUnderseaAsset';
import type { GeofenceAlert } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const createVesselIcon = (type: string, hasAlert: boolean) => {
  const color = hasAlert ? '#dc2626' : 
    type === 'Cargo' ? '#3b82f6' :
    type === 'Tanker' ? '#f59e0b' :
    type === 'Fishing' ? '#10b981' : '#6b7280';
  
  return L.divIcon({
    className: 'custom-vessel-icon',
    html: `<div style="
      width: 24px; 
      height: 24px; 
      background: ${color}; 
      border-radius: 50%; 
      border: 2px solid white;
      box-shadow: 0 0 10px ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ${hasAlert ? 'pulse 1s infinite' : 'none'};
    ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 22h20L12 2z"/>
      </svg>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createAssetIcon = (type: string) => {
  const color = type === 'Kabel' ? '#06b6d4' :
    type === 'Pipa' ? '#8b5cf6' : '#f59e0b';
  
  return L.divIcon({
    className: 'custom-asset-icon',
    html: `<div style="
      width: 20px; 
      height: 20px; 
      background: ${color}; 
      border-radius: 4px; 
      border: 2px solid white;
      box-shadow: 0 0 8px ${color};
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Map bounds setter
const MapBounds: React.FC<{ alerts: GeofenceAlert[] }> = ({ alerts }) => {
  const map = useMap();
  
  useEffect(() => {
    if (alerts.length > 0) {
      const bounds = L.latLngBounds(alerts.map(a => a.vessel.position));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [alerts, map]);
  
  return null;
};

export const Modul2_UnderseaAsset: React.FC = () => {
  const { 
    vessels, 
    assets, 
    alerts, 
    stats, 
    selectedAsset,
    setSelectedAsset 
  } = useUnderseaAsset();

  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  // Filter vessels berdasarkan alert
  const displayedVessels = showAlertsOnly 
    ? vessels.filter(v => alerts.some(a => a.vessel.mmsi === v.mmsi))
    : vessels;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            UNDERSEA ASSET INTEGRITY
          </h2>
          <p className="text-slate-400 mt-1">
            Sistem Deteksi Keamanan Infrastruktur Bawah Laut dengan AIS Geofencing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={showAlertsOnly ? "default" : "outline"}
            onClick={() => setShowAlertsOnly(!showAlertsOnly)}
            className={showAlertsOnly ? "bg-red-600" : "border-slate-600"}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            {showAlertsOnly ? 'Tampilkan Semua' : 'Hanya Alert'}
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
            <AlertOctagon className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-red-400 font-bold text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              EARLY WARNING ALERT AKTIF
            </h3>
            <p className="text-slate-300">
              Terdeteksi {alerts.length} kapal berpotensi membahayakan aset bawah laut
            </p>
          </div>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {stats.critical} KRITIS
          </Badge>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Aset</p>
                <p className="text-2xl font-bold text-white">{assets.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Kapal Terdeteksi</p>
                <p className="text-2xl font-bold text-white">{stats.monitored}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Ship className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-red-700/50 border-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm">Alert Kritis</p>
                <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center animate-pulse">
                <AlertOctagon className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-yellow-700/50 border-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm">Peringatan</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.warning}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="bg-slate-900/80 border-slate-700 lg:col-span-2 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Peta Monitoring AIS & Aset Bawah Laut
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="flex-1 min-h-[500px] rounded-b-lg overflow-hidden relative">
              <MapContainer
                center={[-2.5, 115]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                <MapBounds alerts={alerts} />

                {/* Render Assets */}
                {assets.map(asset => (
                  <React.Fragment key={asset.id}>
                    {/* Asset Line/Point */}
                    {asset.coordinates.length > 1 ? (
                      <Polyline
                        positions={asset.coordinates}
                        color={asset.type === 'Kabel' ? '#06b6d4' : asset.type === 'Pipa' ? '#8b5cf6' : '#f59e0b'}
                        weight={4}
                        opacity={0.8}
                        eventHandlers={{
                          click: () => setSelectedAsset(asset),
                        }}
                      />
                    ) : (
                      <Marker
                        position={asset.coordinates[0]}
                        icon={createAssetIcon(asset.type)}
                        eventHandlers={{
                          click: () => setSelectedAsset(asset),
                        }}
                      />
                    )}
                    
                    {/* Geofence Circle */}
                    {asset.coordinates.length > 1 ? (
                      asset.coordinates.map((coord, idx) => (
                        <Circle
                          key={`${asset.id}-circle-${idx}`}
                          center={coord}
                          radius={asset.radius}
                          pathOptions={{
                            color: asset.type === 'Kabel' ? '#06b6d4' : '#8b5cf6',
                            fillColor: asset.type === 'Kabel' ? '#06b6d4' : '#8b5cf6',
                            fillOpacity: 0.1,
                            weight: 1,
                            dashArray: '5, 5',
                          }}
                        />
                      ))
                    ) : (
                      <Circle
                        center={asset.coordinates[0]}
                        radius={asset.radius}
                        pathOptions={{
                          color: '#f59e0b',
                          fillColor: '#f59e0b',
                          fillOpacity: 0.1,
                          weight: 1,
                          dashArray: '5, 5',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}

                {/* Render Vessels */}
                {displayedVessels.map(vessel => {
                  const hasAlert = alerts.some(a => a.vessel.mmsi === vessel.mmsi);
                  return (
                    <Marker
                      key={vessel.mmsi}
                      position={vessel.position}
                      icon={createVesselIcon(vessel.type, hasAlert)}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h4 className="font-bold text-slate-800">{vessel.name}</h4>
                          <div className="space-y-1 mt-2 text-sm">
                            <p><span className="text-slate-500">MMSI:</span> {vessel.mmsi}</p>
                            <p><span className="text-slate-500">Tipe:</span> {vessel.type}</p>
                            <p><span className="text-slate-500">Kecepatan:</span> {vessel.speed} knot</p>
                            <p><span className="text-slate-500">Heading:</span> {vessel.heading}°</p>
                            {hasAlert && (
                              <div className="mt-2 p-2 bg-red-100 rounded text-red-700 text-xs">
                                <AlertTriangle className="w-4 h-4 inline mr-1" />
                                ALERT: Dalam zona berbahaya!
                              </div>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alert Panel */}
        <Card className="bg-slate-900/80 border-slate-700 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-400" />
              Alert Geofencing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[450px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Tidak ada alert aktif</p>
                  <p className="text-sm">Semua aset dalam kondisi aman</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.alertLevel === 'Critical'
                        ? 'bg-red-500/10 border-red-500/50'
                        : 'bg-yellow-500/10 border-yellow-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.alertLevel === 'Critical' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                      }`}>
                        {alert.alertLevel === 'Critical' ? (
                          <AlertOctagon className="w-4 h-4 text-red-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium text-sm">{alert.vessel.name}</h4>
                          <Badge 
                            variant={alert.alertLevel === 'Critical' ? 'destructive' : 'default'}
                            className="text-[10px]"
                          >
                            {alert.alertLevel}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-xs mt-1">{alert.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {alert.vessel.speed} knot
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.distance}m
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Detail */}
      {selectedAsset && (
        <Card className="bg-slate-900/80 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Anchor className="w-5 h-5 text-cyan-400" />
                Detail Aset: {selectedAsset.name}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400"
              >
                Tutup
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Tipe Aset</p>
                <p className="text-white font-bold text-lg">{selectedAsset.type}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Operator</p>
                <p className="text-white font-bold text-lg">{selectedAsset.operator}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Kedalaman</p>
                <p className="text-white font-bold text-lg">{selectedAsset.depth} m</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Radius Geofence</p>
                <p className="text-white font-bold text-lg">{selectedAsset.radius} m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
          <span className="text-slate-400">Cargo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white" />
          <span className="text-slate-400">Tanker</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          <span className="text-slate-400">Fishing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-cyan-500 border-2 border-white" />
          <span className="text-slate-400">Kabel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500 border-2 border-white" />
          <span className="text-slate-400">Pipa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500 border-2 border-white" />
          <span className="text-slate-400">Platform</span>
        </div>
      </div>
    </div>
  );
};
