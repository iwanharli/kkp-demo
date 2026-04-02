// ============================================
// MODUL 2: UNDERSEA ASSET INTEGRITY - HOOK
// ============================================

import { useState, useMemo, useEffect } from 'react';
import type { VesselAIS, UnderseaAsset, GeofenceAlert, AlertLevel } from '@/types';

// Data simulasi aset bawah laut
const mockAssets: UnderseaAsset[] = [
  {
    id: 'asset-1',
    name: 'Kabel Komunikasi SEA-ME-WE 3',
    type: 'Kabel',
    coordinates: [
      [5.5, 95.3],
      [3.2, 98.5],
      [1.1, 103.8],
      [-0.8, 106.0],
    ],
    radius: 500,
    depth: 2500,
    operator: 'Telkom Indonesia',
  },
  {
    id: 'asset-2',
    name: 'Pipa Gas Cirebon-Semarang',
    type: 'Pipa',
    coordinates: [
      [-6.7, 108.5],
      [-6.2, 109.5],
      [-5.9, 110.4],
    ],
    radius: 500,
    depth: 150,
    operator: 'PGN',
  },
  {
    id: 'asset-3',
    name: 'Kabel Listrik Jawa-Bali',
    type: 'Kabel',
    coordinates: [
      [-7.2, 112.0],
      [-7.5, 113.0],
      [-8.1, 114.3],
      [-8.5, 115.2],
    ],
    radius: 500,
    depth: 80,
    operator: 'PLN',
  },
  {
    id: 'asset-4',
    name: 'Platform Minyak Cepu',
    type: 'Platform',
    coordinates: [[-7.2, 111.5]],
    radius: 1000,
    depth: 45,
    operator: 'Pertamina',
  },
  {
    id: 'asset-5',
    name: 'Kabel Komunikasi Palapa Ring',
    type: 'Kabel',
    coordinates: [
      [-6.1, 106.8],
      [-2.1, 115.8],
      [0.5, 123.2],
      [-3.2, 128.8],
    ],
    radius: 500,
    depth: 2000,
    operator: 'Telkom Indonesia',
  },
];

// Data simulasi kapal AIS
const generateMockVessels = (): VesselAIS[] => {
  const vesselTypes = ['Cargo', 'Tanker', 'Fishing', 'Passenger', 'Other'] as const;
  const vessels: VesselAIS[] = [];

  // Kapal berbahaya (dekat aset, kecepatan rendah)
  vessels.push({
    mmsi: '123456789',
    name: 'MT OCEAN STAR',
    type: 'Tanker',
    position: [3.21, 98.52], // Dekat kabel SEA-ME-WE 3
    speed: 0.5,
    heading: 180,
    timestamp: new Date(),
  });

  vessels.push({
    mmsi: '987654321',
    name: 'MV CARGO MAS',
    type: 'Cargo',
    position: [-6.71, 108.52], // Dekat pipa Cirebon
    speed: 0.3,
    heading: 90,
    timestamp: new Date(),
  });

  vessels.push({
    mmsi: '456789123',
    name: 'KM NUSANTARA',
    type: 'Cargo',
    position: [-7.19, 111.51], // Dekat platform Cepu
    speed: 0.8,
    heading: 45,
    timestamp: new Date(),
  });

  // Kapal normal
  for (let i = 0; i < 15; i++) {
    vessels.push({
      mmsi: `999${String(i).padStart(6, '0')}`,
      name: `VESSEL ${i + 1}`,
      type: vesselTypes[Math.floor(Math.random() * vesselTypes.length)],
      position: [
        -8 + Math.random() * 16, // Lat: -8 to 8
        95 + Math.random() * 35, // Lng: 95 to 130
      ] as [number, number],
      speed: Math.random() * 15 + 2,
      heading: Math.floor(Math.random() * 360),
      timestamp: new Date(),
    });
  }

  return vessels;
};

// Hitung jarak antara dua koordinat (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Radius bumi dalam meter
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Hitung jarak minimum dari titik ke garis (polyline)
const distanceToPolyline = (point: [number, number], line: [number, number][]): number => {
  let minDistance = Infinity;
  
  for (let i = 0; i < line.length - 1; i++) {
    const start = line[i];
    
    // Simplified distance calculation to line segment
    const dist = calculateDistance(point[0], point[1], start[0], start[1]);
    minDistance = Math.min(minDistance, dist);
  }
  
  return minDistance;
};

export const useUnderseaAsset = () => {
  const [vessels, setVessels] = useState<VesselAIS[]>(generateMockVessels());
  const [assets] = useState<UnderseaAsset[]>(mockAssets);
  const [selectedAsset, setSelectedAsset] = useState<UnderseaAsset | null>(null);
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([]);

  // Deteksi alert geofencing
  useEffect(() => {
    const newAlerts: GeofenceAlert[] = [];

    vessels.forEach(vessel => {
      // Hanya proses kapal Cargo dan Tanker dengan kecepatan < 1 knot
      if ((vessel.type === 'Cargo' || vessel.type === 'Tanker') && vessel.speed < 1) {
        assets.forEach(asset => {
          let distance: number;

          if (asset.coordinates.length === 1) {
            // Point asset (platform)
            distance = calculateDistance(
              vessel.position[0],
              vessel.position[1],
              asset.coordinates[0][0],
              asset.coordinates[0][1]
            );
          } else {
            // Line asset (kabel/pipa)
            distance = distanceToPolyline(vessel.position, asset.coordinates);
          }

          // Jika dalam radius 500m
          if (distance <= asset.radius) {
            const alertLevel: AlertLevel = distance < 200 ? 'Critical' : 'Warning';
            
            newAlerts.push({
              id: `alert-${vessel.mmsi}-${asset.id}`,
              vessel,
              asset,
              distance: Math.round(distance),
              alertLevel,
              timestamp: new Date(),
              message: `${vessel.name} (${vessel.type}) terdeteksi ${distance < 100 ? 'menjaring' : 'mendekati'} ${asset.name} pada jarak ${Math.round(distance)}m dengan kecepatan ${vessel.speed} knot`,
            });
          }
        });
      }
    });

    setAlerts(newAlerts);
  }, [vessels, assets]);

  // Simulasi update posisi kapal
  useEffect(() => {
    const interval = setInterval(() => {
      setVessels(prev => prev.map(vessel => {
        // Kapal dengan alert tetap diam (simulasi buang jangkar)
        const hasAlert = alerts.some(a => a.vessel.mmsi === vessel.mmsi);
        if (hasAlert) return vessel;

        // Kapal lain bergerak sedikit
        return {
          ...vessel,
          position: [
            vessel.position[0] + (Math.random() - 0.5) * 0.01,
            vessel.position[1] + (Math.random() - 0.5) * 0.01,
          ] as [number, number],
          heading: (vessel.heading + Math.floor((Math.random() - 0.5) * 10)) % 360,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts]);

  // Statistik
  const stats = useMemo(() => {
    const critical = alerts.filter(a => a.alertLevel === 'Critical').length;
    const warning = alerts.filter(a => a.alertLevel === 'Warning').length;
    const monitored = vessels.length;

    return {
      critical,
      warning,
      monitored,
      totalAlerts: alerts.length,
    };
  }, [alerts, vessels]);

  // Alert berdasarkan level
  const alertsByLevel = useMemo(() => {
    return {
      critical: alerts.filter(a => a.alertLevel === 'Critical'),
      warning: alerts.filter(a => a.alertLevel === 'Warning'),
    };
  }, [alerts]);

  return {
    vessels,
    assets,
    alerts,
    stats,
    alertsByLevel,
    selectedAsset,
    setSelectedAsset,
  };
};
