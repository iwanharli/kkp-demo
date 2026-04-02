// ============================================
// MODUL 5: SOCIAL & INDOPOL PULSE - HOOK
// ============================================

import { useState, useMemo, useEffect } from 'react';
import type { SentimentData, IndopolNews, SentimentType } from '@/types';

// Data simulasi sentimen berdasarkan lokasi
const generateMockSentimentData = (): SentimentData[] => {
  const lokasiList = [
    { nama: 'Jakarta', koordinat: [-6.2088, 106.8456] as [number, number] },
    { nama: 'Surabaya', koordinat: [-7.2575, 112.7521] as [number, number] },
    { nama: 'Makassar', koordinat: [-5.1477, 119.4327] as [number, number] },
    { nama: 'Manado', koordinat: [1.4748, 124.8421] as [number, number] },
    { nama: 'Balikpapan', koordinat: [-1.2379, 116.8529] as [number, number] },
    { nama: 'Batam', koordinat: [1.0456, 104.0305] as [number, number] },
    { nama: 'Aceh', koordinat: [4.6951, 96.7494] as [number, number] },
    { nama: 'Papua', koordinat: [-2.5489, 140.3487] as [number, number] },
    { nama: 'Lombok', koordinat: [-8.6500, 116.3249] as [number, number] },
    { nama: 'Bali', koordinat: [-8.4095, 115.1889] as [number, number] },
    { nama: 'Pontianak', koordinat: [-0.0263, 109.3425] as [number, number] },
    { nama: 'Ambon', koordinat: [-3.6547, 128.1906] as [number, number] },
  ];

  const keywordsPositif = [
    'pembangunan', 'kemajuan', 'kesempatan kerja', 'investasi', 'berkelanjutan',
    'perlindungan', 'kerja sama', 'inovasi', 'kesejahteraan', 'peningkatan'
  ];

  const keywordsNegatif = [
    'polusi', 'kerusakan', 'konflik', 'penolakan', 'kerugian',
    'pencemaran', 'overfishing', 'ilegal', 'kerusakan terumbu', 'penangkapan liar'
  ];

  const keywordsNetral = [
    'proyek', 'kebijakan', 'perizinan', 'pengawasan', 'monitoring',
    'evaluasi', 'rapat', 'koordinasi', 'pelaporan', 'assesment'
  ];

  return lokasiList.map((lokasi, index) => {
    const sentimentRoll = Math.random();
    let sentiment: SentimentType;
    let score: number;

    if (sentimentRoll < 0.25) {
      sentiment = 'Negatif';
      score = -0.3 - Math.random() * 0.7;
    } else if (sentimentRoll < 0.65) {
      sentiment = 'Positif';
      score = 0.3 + Math.random() * 0.7;
    } else {
      sentiment = 'Netral';
      score = -0.3 + Math.random() * 0.6;
    }

    const volume = Math.floor(Math.random() * 500) + 50;
    
    const keywords = sentiment === 'Positif' 
      ? keywordsPositif.slice(0, Math.floor(Math.random() * 3) + 2)
      : sentiment === 'Negatif'
      ? keywordsNegatif.slice(0, Math.floor(Math.random() * 3) + 2)
      : keywordsNetral.slice(0, Math.floor(Math.random() * 3) + 2);

    return {
      id: `sentiment-${index}`,
      lokasi,
      sentiment,
      score: Math.round(score * 100) / 100,
      volume,
      topKeywords: keywords,
      sources: {
        news: Math.floor(volume * 0.3),
        social: Math.floor(volume * 0.5),
        forum: Math.floor(volume * 0.2),
      },
      timestamp: new Date(),
    };
  });
};

// Data simulasi berita Indopol
const generateMockNews = (): IndopolNews[] => {
  const newsData: IndopolNews[] = [
    {
      id: 'news-1',
      title: 'KKP Amankan 1000 Kg Ikan Illegal di Perairan Natuna',
      source: 'Kompas',
      url: '#',
      sentiment: 'Positif',
      lokasi: 'Laut Natuna',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      summary: 'Tim patroli KKP berhasil mengamankan kapal asing yang melakukan penangkapan ikan ilegal...',
    },
    {
      id: 'news-2',
      title: 'Warga Tolak Pembangunan Pelabuhan di Pesisir Lombok',
      source: 'Detik',
      url: '#',
      sentiment: 'Negatif',
      lokasi: 'Lombok',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      summary: 'Ratusan warga melakukan demonstrasi menolak pembangunan pelabuhan yang dianggap merusak ekosistem...',
    },
    {
      id: 'news-3',
      title: 'Investasi Budidaya Lobster di Sulawesi Capai Rp 500 Miliar',
      source: 'Bisnis',
      url: '#',
      sentiment: 'Positif',
      lokasi: 'Makassar',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      summary: 'Pemerintah menerima investasi besar untuk pengembangan budidaya lobster berkelanjutan...',
    },
    {
      id: 'news-4',
      title: 'Ditemukan Pencemaran Minyak di Perairan Kalimantan',
      source: 'CNN Indonesia',
      url: '#',
      sentiment: 'Negatif',
      lokasi: 'Balikpapan',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      summary: 'Nelayan melaporkan adanya tumpahan minyak yang diduga dari aktivitas kapal tanker...',
    },
    {
      id: 'news-5',
      title: 'KKP Luncurkan Program Digitalisasi Perizinan Kelautan',
      source: 'Tempo',
      url: '#',
      sentiment: 'Positif',
      lokasi: 'Jakarta',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      summary: 'Program baru bertujuan mempercepat proses perizinan dan meningkatkan transparansi...',
    },
    {
      id: 'news-6',
      title: 'Nelayan Tradisional Mengeluhkan Penurapan Hasil Tangkapan',
      source: 'Republika',
      url: '#',
      sentiment: 'Negatif',
      lokasi: 'Aceh',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      summary: 'Nelayan tradisional melaporkan penurunan hasil tangkapan akibat cuaca ekstrem...',
    },
    {
      id: 'news-7',
      title: 'Kerjasama Indonesia-Jepang untuk Konservasi Terumbu Karang',
      source: 'Antara',
      url: '#',
      sentiment: 'Positif',
      lokasi: 'Bali',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      summary: 'Kedua negara sepakat untuk bekerja sama dalam program restorasi terumbu karang...',
    },
  ];

  return newsData;
};

export const useSentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>(generateMockSentimentData());
  const [newsData] = useState<IndopolNews[]>(generateMockNews());
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Update sentimen secara periodik (simulasi real-time)
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentData(prev => prev.map(item => ({
        ...item,
        volume: item.volume + Math.floor(Math.random() * 10) - 5,
        score: Math.max(-1, Math.min(1, item.score + (Math.random() - 0.5) * 0.1)),
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Statistik sentimen
  const stats = useMemo(() => {
    const total = sentimentData.length;
    const positif = sentimentData.filter(s => s.sentiment === 'Positif').length;
    const netral = sentimentData.filter(s => s.sentiment === 'Netral').length;
    const negatif = sentimentData.filter(s => s.sentiment === 'Negatif').length;
    
    const totalVolume = sentimentData.reduce((acc, s) => acc + s.volume, 0);
    const avgScore = sentimentData.reduce((acc, s) => acc + s.score, 0) / total;

    return {
      total,
      positif,
      netral,
      negatif,
      totalVolume,
      avgScore: Math.round(avgScore * 100) / 100,
      positifPercent: Math.round((positif / total) * 100),
      negatifPercent: Math.round((negatif / total) * 100),
    };
  }, [sentimentData]);

  // Data untuk heatmap
  const heatmapData = useMemo(() => {
    return sentimentData.map(item => ({
      lat: item.lokasi.koordinat[0],
      lng: item.lokasi.koordinat[1],
      intensity: Math.abs(item.score),
      sentiment: item.sentiment,
      lokasi: item.lokasi.nama,
    }));
  }, [sentimentData]);

  // Filter berita berdasarkan sentimen
  const newsBySentiment = useMemo(() => {
    return {
      Positif: newsData.filter(n => n.sentiment === 'Positif'),
      Netral: newsData.filter(n => n.sentiment === 'Netral'),
      Negatif: newsData.filter(n => n.sentiment === 'Negatif'),
    };
  }, [newsData]);

  // Trending keywords
  const trendingKeywords = useMemo(() => {
    const keywordCount: Record<string, number> = {};
    
    sentimentData.forEach(item => {
      item.topKeywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + item.volume;
      });
    });

    return Object.entries(keywordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [sentimentData]);

  // Data untuk chart
  const chartData = useMemo(() => {
    return sentimentData.map(item => ({
      name: item.lokasi.nama,
      positif: item.sentiment === 'Positif' ? item.volume : 0,
      netral: item.sentiment === 'Netral' ? item.volume : 0,
      negatif: item.sentiment === 'Negatif' ? item.volume : 0,
      score: item.score,
    }));
  }, [sentimentData]);

  return {
    sentimentData,
    newsData,
    stats,
    heatmapData,
    newsBySentiment,
    trendingKeywords,
    chartData,
    selectedLocation,
    setSelectedLocation,
  };
};
