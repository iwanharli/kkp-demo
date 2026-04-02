// ============================================
// NEXGOV INTELEJEN DASHBOARD - TYPE DEFINITIONS
// KKP (Kementerian Kelautan dan Perikanan)
// ============================================

// ============================================
// MODUL 1: SMART KKPRL TRACKER
// ============================================

export type TahapProses = 'Administrasi' | 'Teknis' | 'Final' | 'Selesai';

export interface PerizinanData {
  id: string;
  idIzin: string;
  lokasi: {
    koordinat: [number, number]; // [lat, lng]
    nama: string;
  };
  tanggalPengajuan: Date;
  tahapProses: TahapProses;
  durasiHari: number;
  isBottleneck: boolean;
  pemohon: string;
  jenisIzin: string;
}

export interface SankeyNode {
  name: string;
  category: TahapProses;
  value: number;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  isBottleneck: boolean;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

// ============================================
// MODUL 2: UNDERSEA ASSET INTEGRITY
// ============================================

export type VesselType = 'Cargo' | 'Tanker' | 'Fishing' | 'Passenger' | 'Other';
export type AlertLevel = 'Critical' | 'Warning' | 'Normal';

export interface VesselAIS {
  mmsi: string;
  name: string;
  type: VesselType;
  position: [number, number]; // [lat, lng]
  speed: number; // knots
  heading: number; // degrees
  timestamp: Date;
}

export interface UnderseaAsset {
  id: string;
  name: string;
  type: 'Kabel' | 'Pipa' | 'Platform';
  coordinates: [number, number][]; // Polyline
  radius: number; // meter
  depth: number; // meter
  operator: string;
}

export interface GeofenceAlert {
  id: string;
  vessel: VesselAIS;
  asset: UnderseaAsset;
  distance: number; // meter
  alertLevel: AlertLevel;
  timestamp: Date;
  message: string;
}

// ============================================
// MODUL 3: AI SPATIAL CONFLICT DETECTOR
// ============================================

export type LayerType = 'KawasanKonservasi' | 'AlurPelayaran' | 'KawasanStrategisNasional' | 'KKPRL';

export interface SpatialLayer {
  id: string;
  name: string;
  type: LayerType;
  coordinates: [number, number][];
  color: string;
  opacity: number;
  metadata: {
    deskripsi: string;
    regulasi: string;
    status: string;
  };
}

export interface ConflictResult {
  hasConflict: boolean;
  conflicts: {
    layer: SpatialLayer;
    intersectionArea: number; // persen
    intersectionCoords: [number, number][];
  }[];
  status: 'Conflict' | 'Clear' | 'Warning';
  message: string;
}

export interface KoordinatInput {
  id: string;
  name: string;
  coordinates: [number, number][];
  timestamp: Date;
}

// ============================================
// MODUL 4: REVENUE LEAKAGE & PNBP MONITOR
// ============================================

export interface PNBPData {
  id: string;
  assetId: string;
  namaAsset: string;
  jenisAsset: string;
  luas: number; // m2 atau km2
  panjang?: number; // meter (untuk kabel/pipa)
  tarifDasar: number; // Rp per unit
  indeksLokasi: number; // 0.5 - 3.0
  pnbpSeharusnya: number; // Rupiah
  pnbpTerbayar: number; // Rupiah (dari SIMPONI)
  selisih: number; // Rupiah
  potensiKebocoran: number; // persen
  status: 'Aman' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis';
}

export interface PNBPSummary {
  totalSeharusnya: number;
  totalTerbayar: number;
  totalKebocoran: number;
  jumlahAsset: number;
  assetBermasalah: number;
}

// ============================================
// MODUL 5: SOCIAL & INDOPOL PULSE
// ============================================

export type SentimentType = 'Positif' | 'Netral' | 'Negatif';

export interface SentimentData {
  id: string;
  lokasi: {
    nama: string;
    koordinat: [number, number];
  };
  sentiment: SentimentType;
  score: number; // -1 to 1
  volume: number; // jumlah mention
  topKeywords: string[];
  sources: {
    news: number;
    social: number;
    forum: number;
  };
  timestamp: Date;
}

export interface IndopolNews {
  id: string;
  title: string;
  source: string;
  url: string;
  sentiment: SentimentType;
  lokasi: string;
  timestamp: Date;
  summary: string;
}

// ============================================
// DASHBOARD GLOBAL TYPES
// ============================================

export interface DashboardStats {
  totalAssets: number;
  activeAlerts: number;
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  systemStatus: 'Online' | 'Maintenance' | 'Offline';
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  module: string;
}

export type ViewMode = 'overview' | 'module1' | 'module2' | 'module3' | 'module4' | 'module5';
