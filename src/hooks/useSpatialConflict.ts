// ============================================
// MODUL 3: AI SPATIAL CONFLICT DETECTOR - HOOK
// ============================================

import { useState, useMemo, useCallback } from 'react';
import type { SpatialLayer, ConflictResult, KoordinatInput } from '@/types';

// Data simulasi layer spasial
const mockLayers: SpatialLayer[] = [
  {
    id: 'layer-kk-1',
    name: 'KKLD Teluk Jakarta',
    type: 'KawasanKonservasi',
    coordinates: [
      [-6.05, 106.70],
      [-6.05, 106.85],
      [-6.20, 106.85],
      [-6.20, 106.70],
    ],
    color: '#16a34a',
    opacity: 0.4,
    metadata: {
      deskripsi: 'Kawasan Konservasi Laut Daerah Teluk Jakarta',
      regulasi: 'Perda DKI Jakarta No. 6/2014',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-kk-2',
    name: 'Taman Nasional Wakatobi',
    type: 'KawasanKonservasi',
    coordinates: [
      [-5.00, 123.50],
      [-5.00, 124.50],
      [-6.50, 124.50],
      [-6.50, 123.50],
    ],
    color: '#16a34a',
    opacity: 0.4,
    metadata: {
      deskripsi: 'Taman Nasional Laut Wakatobi',
      regulasi: 'UU No. 5/1990',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-ap-1',
    name: 'Alur Pelayaran Selat Malaka',
    type: 'AlurPelayaran',
    coordinates: [
      [2.50, 99.50],
      [2.80, 99.80],
      [3.20, 100.00],
      [3.50, 100.30],
    ],
    color: '#06b6d4',
    opacity: 0.5,
    metadata: {
      deskripsi: 'Alur Pelayaran Internasional Selat Malaka',
      regulasi: 'IMO Regulation',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-ap-2',
    name: 'Alur Pelayaran Laut Jawa',
    type: 'AlurPelayaran',
    coordinates: [
      [-5.50, 105.00],
      [-5.80, 107.00],
      [-6.00, 109.00],
      [-6.20, 111.00],
      [-6.50, 113.00],
    ],
    color: '#06b6d4',
    opacity: 0.5,
    metadata: {
      deskripsi: 'Alur Pelayaran Utara Jawa',
      regulasi: 'Permenhub No. 10/2020',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-ksn-1',
    name: 'KSN Laut Natuna',
    type: 'KawasanStrategisNasional',
    coordinates: [
      [2.00, 106.00],
      [2.00, 109.00],
      [5.00, 109.00],
      [5.00, 106.00],
    ],
    color: '#dc2626',
    opacity: 0.3,
    metadata: {
      deskripsi: 'Kawasan Strategis Nasional Laut Natuna',
      regulasi: 'PP No. 85/2021',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-ksn-2',
    name: 'KSN Perbatasan RI-PNG',
    type: 'KawasanStrategisNasional',
    coordinates: [
      [-8.00, 136.00],
      [-8.00, 141.00],
      [-3.00, 141.00],
      [-3.00, 136.00],
    ],
    color: '#dc2626',
    opacity: 0.3,
    metadata: {
      deskripsi: 'Kawasan Strategis Nasional Perbatasan Indonesia-Papua Nugini',
      regulasi: 'PP No. 85/2021',
      status: 'Aktif',
    },
  },
  {
    id: 'layer-kkprl-1',
    name: 'KKPRL Blok Masela',
    type: 'KKPRL',
    coordinates: [
      [-8.20, 129.50],
      [-8.20, 130.00],
      [-8.50, 130.00],
      [-8.50, 129.50],
    ],
    color: '#f59e0b',
    opacity: 0.5,
    metadata: {
      deskripsi: 'Kontrak Karya Pertambangan Rakyat Laut Blok Masela',
      regulasi: 'KKPRL No. 1/2020',
      status: 'Aktif',
    },
  },
];

// Fungsi untuk menghitung apakah dua polygon berpotongan
const polygonsIntersect = (
  poly1: [number, number][],
  poly2: [number, number][]
): boolean => {
  // Simplified intersection check - check if any point of poly1 is inside poly2
  const pointInPolygon = (point: [number, number], polygon: [number, number][]): boolean => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      
      const intersect = ((yi > point[1]) !== (yj > point[1])) &&
        (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Check if any point of poly1 is inside poly2
  for (const point of poly1) {
    if (pointInPolygon(point, poly2)) return true;
  }

  // Check if any point of poly2 is inside poly1
  for (const point of poly2) {
    if (pointInPolygon(point, poly1)) return true;
  }

  return false;
};

// Hitung area irisan (simplified)
const calculateIntersectionArea = (
  poly1: [number, number][],
  poly2: [number, number][]
): number => {
  // This is a simplified calculation
  // In real implementation, use a library like Turf.js
  const intersect = polygonsIntersect(poly1, poly2);
  if (!intersect) return 0;

  // Return approximate intersection percentage
  // This is a placeholder - real implementation needs proper polygon intersection
  return Math.random() * 30 + 5; // 5-35% intersection
};

export const useSpatialConflict = () => {
  const [layers] = useState<SpatialLayer[]>(mockLayers);
  const [inputKoordinat, setInputKoordinat] = useState<KoordinatInput | null>(null);
  const [conflictResult, setConflictResult] = useState<ConflictResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Filter layer berdasarkan tipe
  const layersByType = useMemo(() => {
    return {
      KawasanKonservasi: layers.filter(l => l.type === 'KawasanKonservasi'),
      AlurPelayaran: layers.filter(l => l.type === 'AlurPelayaran'),
      KawasanStrategisNasional: layers.filter(l => l.type === 'KawasanStrategisNasional'),
      KKPRL: layers.filter(l => l.type === 'KKPRL'),
    };
  }, [layers]);

  // Auto-detect conflict saat koordinat dimasukkan
  const checkConflict = useCallback((koordinat: [number, number][]) => {
    setIsChecking(true);
    
    // Simulasi processing delay
    setTimeout(() => {
      const conflicts: ConflictResult['conflicts'] = [];

      layers.forEach(layer => {
        const intersectionArea = calculateIntersectionArea(koordinat, layer.coordinates);
        
        if (intersectionArea > 0) {
          conflicts.push({
            layer,
            intersectionArea,
            intersectionCoords: [], // Would be calculated properly with Turf.js
          });
        }
      });

      const hasConflict = conflicts.length > 0;
      
      setConflictResult({
        hasConflict,
        conflicts,
        status: hasConflict ? 'Conflict' : 'Clear',
        message: hasConflict
          ? `Terdeteksi ${conflicts.length} konflik dengan layer yang ada`
          : 'Tidak ada konflik terdeteksi',
      });

      setInputKoordinat({
        id: `input-${Date.now()}`,
        name: 'Koordinat Baru',
        coordinates: koordinat,
        timestamp: new Date(),
      });

      setIsChecking(false);
    }, 500);
  }, [layers]);

  // Statistik layer
  const stats = useMemo(() => {
    return {
      total: layers.length,
      kawasanKonservasi: layers.filter(l => l.type === 'KawasanKonservasi').length,
      alurPelayaran: layers.filter(l => l.type === 'AlurPelayaran').length,
      kawasanStrategis: layers.filter(l => l.type === 'KawasanStrategisNasional').length,
      kkprl: layers.filter(l => l.type === 'KKPRL').length,
    };
  }, [layers]);

  // Clear conflict result
  const clearConflict = useCallback(() => {
    setConflictResult(null);
    setInputKoordinat(null);
  }, []);

  return {
    layers,
    layersByType,
    inputKoordinat,
    conflictResult,
    isChecking,
    stats,
    checkConflict,
    clearConflict,
  };
};
