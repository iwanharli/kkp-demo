// ============================================
// MODUL 1: SMART KKPRL TRACKER - HOOK
// ============================================

import { useState, useMemo } from 'react';
import type { PerizinanData, SankeyData, TahapProses } from '@/types';

// Data simulasi perizinan KKPRL
const generateMockData = (): PerizinanData[] => {
  const tahapList: TahapProses[] = ['Administrasi', 'Teknis', 'Final', 'Selesai'];
  const jenisIzinList = ['KKPRL-Perikanan', 'KKPRL-Minyak', 'KKPRL-Gas', 'KKPRL-Pelabuhan'];
  const lokasiList = [
    { nama: 'Laut Natuna', koordinat: [3.5, 108.2] as [number, number] },
    { nama: 'Selat Malaka', koordinat: [2.8, 100.3] as [number, number] },
    { nama: 'Laut Sulawesi', koordinat: [-0.5, 121.0] as [number, number] },
    { nama: 'Laut Banda', koordinat: [-5.5, 126.5] as [number, number] },
    { nama: 'Laut Jawa', koordinat: [-6.0, 110.5] as [number, number] },
    { nama: 'Perairan Papua', koordinat: [-2.5, 138.0] as [number, number] },
  ];

  const data: PerizinanData[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 45; i++) {
    const tahapIndex = Math.floor(Math.random() * 4);
    const tahap = tahapList[tahapIndex];
    const durasi = Math.floor(Math.random() * 25) + 1;
    const lokasi = lokasiList[Math.floor(Math.random() * lokasiList.length)];
    
    data.push({
      id: `izin-${i + 1}`,
      idIzin: `KKPRL/${new Date().getFullYear()}/${String(i + 1).padStart(4, '0')}`,
      lokasi,
      tanggalPengajuan: new Date(baseDate.getTime() - durasi * 24 * 60 * 60 * 1000),
      tahapProses: tahap,
      durasiHari: durasi,
      isBottleneck: durasi > 14 && tahap !== 'Selesai',
      pemohon: `Perusahaan ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) || ''}`,
      jenisIzin: jenisIzinList[Math.floor(Math.random() * jenisIzinList.length)],
    });
  }

  return data;
};

export const useKKPRLTracker = () => {
  const [data] = useState<PerizinanData[]>(generateMockData());
  const [filterTahap, setFilterTahap] = useState<TahapProses | 'all'>('all');

  // Filter data berdasarkan tahap
  const filteredData = useMemo(() => {
    if (filterTahap === 'all') return data;
    return data.filter(item => item.tahapProses === filterTahap);
  }, [data, filterTahap]);

  // Hitung statistik
  const stats = useMemo(() => {
    const total = data.length;
    const bottleneck = data.filter(d => d.isBottleneck).length;
    const selesai = data.filter(d => d.tahapProses === 'Selesai').length;
    const rataRataDurasi = Math.round(data.reduce((acc, d) => acc + d.durasiHari, 0) / total);
    
    return {
      total,
      bottleneck,
      selesai,
      rataRataDurasi,
      efisiensi: Math.round((selesai / total) * 100),
    };
  }, [data]);

  // Generate data untuk Sankey Diagram
  const sankeyData = useMemo((): SankeyData => {
    const nodes = [
      { name: 'Pengajuan', category: 'Administrasi' as TahapProses, value: 0 },
      { name: 'Administrasi', category: 'Administrasi' as TahapProses, value: 0 },
      { name: 'Teknis', category: 'Teknis' as TahapProses, value: 0 },
      { name: 'Final', category: 'Final' as TahapProses, value: 0 },
      { name: 'Selesai', category: 'Selesai' as TahapProses, value: 0 },
      { name: 'Bottleneck', category: 'Administrasi' as TahapProses, value: 0 },
    ];

    const links: SankeyData['links'] = [];

    // Hitung jumlah di setiap tahap
    data.forEach(item => {
      if (item.tahapProses === 'Administrasi') {
        nodes[1].value++;
        if (item.isBottleneck) nodes[5].value++;
      } else if (item.tahapProses === 'Teknis') {
        nodes[2].value++;
        if (item.isBottleneck) nodes[5].value++;
      } else if (item.tahapProses === 'Final') {
        nodes[3].value++;
        if (item.isBottleneck) nodes[5].value++;
      } else if (item.tahapProses === 'Selesai') {
        nodes[4].value++;
      }
    });

    nodes[0].value = data.length;

    // Buat links
    const adminCount = nodes[1].value;
    const teknisCount = nodes[2].value;
    const finalCount = nodes[3].value;
    const selesaiCount = nodes[4].value;

    // Pengajuan -> Administrasi
    links.push({
      source: 0,
      target: 1,
      value: adminCount + teknisCount + finalCount + selesaiCount,
      isBottleneck: false,
    });

    // Administrasi -> Teknis
    links.push({
      source: 1,
      target: 2,
      value: teknisCount + finalCount + selesaiCount,
      isBottleneck: data.some(d => d.tahapProses === 'Administrasi' && d.isBottleneck),
    });

    // Administrasi -> Bottleneck
    const adminBottleneck = data.filter(d => d.tahapProses === 'Administrasi' && d.isBottleneck).length;
    if (adminBottleneck > 0) {
      links.push({
        source: 1,
        target: 5,
        value: adminBottleneck,
        isBottleneck: true,
      });
    }

    // Teknis -> Final
    links.push({
      source: 2,
      target: 3,
      value: finalCount + selesaiCount,
      isBottleneck: data.some(d => d.tahapProses === 'Teknis' && d.isBottleneck),
    });

    // Teknis -> Bottleneck
    const teknisBottleneck = data.filter(d => d.tahapProses === 'Teknis' && d.isBottleneck).length;
    if (teknisBottleneck > 0) {
      links.push({
        source: 2,
        target: 5,
        value: teknisBottleneck,
        isBottleneck: true,
      });
    }

    // Final -> Selesai
    links.push({
      source: 3,
      target: 4,
      value: selesaiCount,
      isBottleneck: false,
    });

    // Final -> Bottleneck
    const finalBottleneck = data.filter(d => d.tahapProses === 'Final' && d.isBottleneck).length;
    if (finalBottleneck > 0) {
      links.push({
        source: 3,
        target: 5,
        value: finalBottleneck,
        isBottleneck: true,
      });
    }

    return { nodes, links };
  }, [data]);

  // Lead time analysis per tahap
  const leadTimeAnalysis = useMemo(() => {
    const analysis = {
      Administrasi: { avg: 0, max: 0, bottleneck: 0 },
      Teknis: { avg: 0, max: 0, bottleneck: 0 },
      Final: { avg: 0, max: 0, bottleneck: 0 },
    };

    (Object.keys(analysis) as Array<keyof typeof analysis>).forEach(tahap => {
      const items = data.filter(d => d.tahapProses === tahap);
      if (items.length > 0) {
        analysis[tahap].avg = Math.round(items.reduce((acc, d) => acc + d.durasiHari, 0) / items.length);
        analysis[tahap].max = Math.max(...items.map(d => d.durasiHari));
        analysis[tahap].bottleneck = items.filter(d => d.isBottleneck).length;
      }
    });

    return analysis;
  }, [data]);

  return {
    data: filteredData,
    allData: data,
    stats,
    sankeyData,
    leadTimeAnalysis,
    filterTahap,
    setFilterTahap,
  };
};
