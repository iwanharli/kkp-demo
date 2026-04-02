// ============================================
// MODUL 4: REVENUE LEAKAGE & PNBP MONITOR - HOOK
// ============================================

import { useState, useMemo, useCallback } from 'react';
import type { PNBPData, PNBPSummary } from '@/types';

// Data simulasi PNBP berbasis PP No. 85/2021
const generateMockPNBPData = (): PNBPData[] => {
  const jenisAssetList = [
    { jenis: 'Kabel Laut', unit: 'km', tarif: 50000000 },
    { jenis: 'Pipa Bawah Laut', unit: 'km', tarif: 75000000 },
    { jenis: 'Platform Lepas Pantai', unit: 'm2', tarif: 100000 },
    { jenis: 'Pelabuhan Laut', unit: 'm2', tarif: 150000 },
    { jenis: 'Budidaya Perikanan', unit: 'ha', tarif: 2500000 },
    { jenis: 'Penangkapan Ikan', unit: 'GT', tarif: 50000 },
  ];

  const lokasiList = [
    { nama: 'Laut Natuna', indeks: 2.5 },
    { nama: 'Selat Malaka', indeks: 2.0 },
    { nama: 'Laut Jawa', indeks: 1.8 },
    { nama: 'Laut Sulawesi', indeks: 1.5 },
    { nama: 'Laut Banda', indeks: 1.3 },
    { nama: 'Perairan Papua', indeks: 1.2 },
  ];

  const data: PNBPData[] = [];

  for (let i = 0; i < 30; i++) {
    const assetType = jenisAssetList[Math.floor(Math.random() * jenisAssetList.length)];
    const lokasi = lokasiList[Math.floor(Math.random() * lokasiList.length)];
    
    // Generate ukuran berdasarkan jenis
    let ukuran = 0;
    if (assetType.unit === 'km') ukuran = Math.floor(Math.random() * 500) + 50;
    else if (assetType.unit === 'm2') ukuran = Math.floor(Math.random() * 10000) + 1000;
    else if (assetType.unit === 'ha') ukuran = Math.floor(Math.random() * 100) + 10;
    else if (assetType.unit === 'GT') ukuran = Math.floor(Math.random() * 500) + 50;

    // Hitung PNBP seharusnya
    const pnbpSeharusnya = Math.round(ukuran * assetType.tarif * lokasi.indeks);
    
    // Simulasi pembayaran (80-100% untuk yang aman, 0-70% untuk yang bermasalah)
    const isBermasalah = Math.random() < 0.3;
    const persenBayar = isBermasalah ? Math.random() * 0.7 : 0.8 + Math.random() * 0.2;
    const pnbpTerbayar = Math.round(pnbpSeharusnya * persenBayar);
    
    const selisih = pnbpSeharusnya - pnbpTerbayar;
    const potensiKebocoran = (selisih / pnbpSeharusnya) * 100;

    let status: PNBPData['status'] = 'Aman';
    if (potensiKebocoran > 50) status = 'Kritis';
    else if (potensiKebocoran > 30) status = 'Tinggi';
    else if (potensiKebocoran > 15) status = 'Sedang';
    else if (potensiKebocoran > 5) status = 'Rendah';

    data.push({
      id: `pnbp-${i + 1}`,
      assetId: `ASSET/${new Date().getFullYear()}/${String(i + 1).padStart(4, '0')}`,
      namaAsset: `${assetType.jenis} ${lokasi.nama} ${i + 1}`,
      jenisAsset: assetType.jenis,
      luas: assetType.unit === 'm2' || assetType.unit === 'ha' ? ukuran : 0,
      panjang: assetType.unit === 'km' ? ukuran : undefined,
      tarifDasar: assetType.tarif,
      indeksLokasi: lokasi.indeks,
      pnbpSeharusnya,
      pnbpTerbayar,
      selisih,
      potensiKebocoran: Math.round(potensiKebocoran * 100) / 100,
      status,
    });
  }

  return data;
};

// Format mata uang Rupiah
export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const usePNBPMonitor = () => {
  const [data] = useState<PNBPData[]>(generateMockPNBPData());
  const [filterStatus, setFilterStatus] = useState<PNBPData['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchSearch = searchQuery === '' || 
        item.namaAsset.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assetId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [data, filterStatus, searchQuery]);

  // Summary statistics
  const summary = useMemo((): PNBPSummary => {
    const totalSeharusnya = data.reduce((acc, item) => acc + item.pnbpSeharusnya, 0);
    const totalTerbayar = data.reduce((acc, item) => acc + item.pnbpTerbayar, 0);
    const totalKebocoran = totalSeharusnya - totalTerbayar;
    const assetBermasalah = data.filter(item => item.status !== 'Aman').length;

    return {
      totalSeharusnya,
      totalTerbayar,
      totalKebocoran,
      jumlahAsset: data.length,
      assetBermasalah,
    };
  }, [data]);

  // Data untuk chart
  const chartData = useMemo(() => {
    const byStatus = {
      Aman: data.filter(d => d.status === 'Aman').length,
      Rendah: data.filter(d => d.status === 'Rendah').length,
      Sedang: data.filter(d => d.status === 'Sedang').length,
      Tinggi: data.filter(d => d.status === 'Tinggi').length,
      Kritis: data.filter(d => d.status === 'Kritis').length,
    };

    const byJenis: Record<string, { count: number; kebocoran: number }> = {};
    data.forEach(item => {
      if (!byJenis[item.jenisAsset]) {
        byJenis[item.jenisAsset] = { count: 0, kebocoran: 0 };
      }
      byJenis[item.jenisAsset].count++;
      byJenis[item.jenisAsset].kebocoran += item.selisih;
    });

    return { byStatus, byJenis };
  }, [data]);

  // Top kebocoran
  const topKebocoran = useMemo(() => {
    return [...data]
      .filter(d => d.selisih > 0)
      .sort((a, b) => b.selisih - a.selisih)
      .slice(0, 5);
  }, [data]);

  // Kalkulator PNBP
  const calculatePNBP = useCallback((
    ukuran: number,
    tarifDasar: number,
    indeksLokasi: number
  ): number => {
    return Math.round(ukuran * tarifDasar * indeksLokasi);
  }, []);

  return {
    data: filteredData,
    allData: data,
    summary,
    chartData,
    topKebocoran,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    calculatePNBP,
    formatRupiah,
  };
};
