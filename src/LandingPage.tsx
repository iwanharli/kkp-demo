import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('t1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.reveal').forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="landing-page-container">
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <span className="wave">🌊</span>
           KKP · CONTROL TOWER
        </div>
        <ul className="nav-links">
          {/* <li><a href="#cara-kerja">Cara Kerja</a></li> */}
          <li><a href="#modul">5 Modul</a></li>
          <li><a href="#teknologi">Teknologi AI</a></li>
          <li><a href="#data">Data</a></li>
          <li><a href="#krostab">Krostab AI</a></li>
          <li><a href="#integrasi">Integrasi</a></li>
          <li>
            <a 
              href="/admin/" 
              style={{
                color: 'var(--accent)',
                border: '1px solid rgba(0,170,255,0.4)',
                padding: '5px 14px',
                borderRadius: '8px',
                background: 'rgba(0,170,255,0.08)',
                marginLeft: '14px',
                fontWeight: 700,
                transition: 'all .3s ease'
              }}
              className="admin-link"
            >
              Masuk Admin
            </a>
          </li>
        </ul>
        <div className="nav-badge">KKP RI · 2026</div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-orb o1"></div>
        <div className="hero-orb o2"></div>
        <div className="hero-orb o3"></div>
        <div>
          <div className="hero-kementerian">
            <span className="dot"></span>
            Kementerian Kelautan dan Perikanan · Republik Indonesia
          </div>
          <h1><span className="blue">KKP</span></h1>
          <h2>Command Center</h2>
          <p>Sistem Terpadu Pemantauan Ruang Laut Nasional — menyatukan Data GIS, Administratif & Sosial dalam satu layar cerdas berbasis Kecerdasan Buatan.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">6,4 Jt</div>
              <div className="label">km² Wilayah Laut</div>
            </div>
            <div className="hero-stat">
              <div className="num green">97%</div>
              <div className="label">Akurasi AI Spasial</div>
            </div>
            <div className="hero-stat">
              <div className="num">5</div>
              <div className="label">Modul Terintegrasi</div>
            </div>
            <div className="hero-stat">
              <div className="num gold">Rp 1,2T+</div>
              <div className="label">PNBP Terlindungi</div>
            </div>
            <div className="hero-stat">
              <div className="num">&lt;5 dtk</div>
              <div className="label">Respons AI</div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* CARA KERJA */}
      {/* 
      <section id="cara-kerja" className="reveal">
        <div className="section-label">01 — Alur Sistem</div>
        <h2 className="section-title">Bagaimana <span className="hlb">Control Tower</span> Bekerja?</h2>
        <p className="section-desc">Platform NexGov mengintegrasikan tiga lapisan data — Spasial/GIS, Administratif (Perizinan), dan Sosial (Sentimen Pesisir) — melalui pipeline AI yang berjalan 24/7 secara real-time.</p>

        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-num">01</div>
            <span className="flow-icon">📡</span>
            <div className="flow-title">Akuisisi Data Multi-Sumber</div>
            <div className="flow-desc">Data dikumpulkan otomatis dari SKKPRL/OSS, AIS Vessel Tracking, BIG Geoportal, Indopol Network, SIMPONI PNBP, dan DKP Provinsi secara real-time maupun terjadwal.</div>
          </div>
          <div className="flow-card">
            <div className="flow-num">02</div>
            <span className="flow-icon">⚙️</span>
            <div className="flow-title">Processing Engine L2</div>
            <div className="flow-desc">GeoServer + PostGIS memproses data spasial, AIS Stream Processor memantau kapal real-time, dan NLP Engine menganalisis sentimen teks dari media sosial & berita.</div>
          </div>
          <div className="flow-card">
            <div className="flow-num">03</div>
            <span className="flow-icon">🧠</span>
            <div className="flow-title">AI Spatial & Sentiment Engine</div>
            <div className="flow-desc">AI Spatial Conflict mendeteksi tumpang tindih izin secara otomatis (97% akurasi), sementara AI NLP Sentiment menganalisis persepsi masyarakat pesisir dari 450+ sumber data.</div>
          </div>
          <div className="flow-card">
            <div className="flow-num">04</div>
            <span className="flow-icon">🔗</span>
            <div className="flow-title">Krostabulasi Data AI</div>
            <div className="flow-desc">AI menggabungkan data GIS, izin KKPRL, posisi kapal (AIS), sentimen masyarakat, dan status PNBP untuk menghasilkan analisis multidimensi ruang laut yang komprehensif.</div>
          </div>
          <div className="flow-card">
            <div className="flow-num">05</div>
            <span className="flow-icon">🗺️</span>
            <div className="flow-title">Dashboard Spasial Interaktif</div>
            <div className="flow-desc">Peta interaktif, grafik real-time, dan tabel krostab ditampilkan dalam satu layar responsif yang dapat diakses dari desktop maupun perangkat mobile.</div>
          </div>
          <div className="flow-card">
            <div className="flow-num">06</div>
            <span className="flow-icon">🔴</span>
            <div className="flow-title">Alert & Red Flag Otomatis</div>
            <div className="flow-desc">Sistem mengirim notifikasi merah otomatis saat mendeteksi: tumpang tindih izin, kapal di zona merah, bottleneck birokrasi, lonjakan sentimen negatif, atau potensi revenue leakage.</div>
          </div>
        </div>

        <div className="section-label" style={{ marginBottom: '16px' }}>Arsitektur 3-Layer NexGov</div>
        <div className="arch-flow">
          <div className="arch-node">
            <span className="nicon">🗄️</span>
            <div className="nname">L1: Sumber Data</div>
            <div className="nsub">SKKPRL, AIS, BIG</div>
          </div>
          <div className="arch-arrow"><div className="arrow-line"></div><div className="arrow-head">▶</div></div>
          <div className="arch-node hl">
            <span className="nicon">⚙️</span>
            <div className="nname">L2: Processing</div>
            <div className="nsub">GeoServer + AI</div>
          </div>
          <div className="arch-arrow"><div className="arrow-line"></div><div className="arrow-head">▶</div></div>
          <div className="arch-node hl">
            <span className="nicon">🧠</span>
            <div className="nname">AI Engine</div>
            <div className="nsub">Spatial + NLP</div>
          </div>
          <div className="arch-arrow"><div className="arrow-line"></div><div className="arrow-head">▶</div></div>
          <div className="arch-node">
            <span className="nicon">🌊</span>
            <div className="nname">Data Lake</div>
            <div className="nsub">Centralized</div>
          </div>
          <div className="arch-arrow"><div className="arrow-line"></div><div className="arrow-head">▶</div></div>
          <div className="arch-node hl">
            <span className="nicon">📊</span>
            <div className="nname">L3: Dashboard</div>
            <div className="nsub">NexGov UI</div>
          </div>
          <div className="arch-arrow"><div className="arrow-line"></div><div className="arrow-head">▶</div></div>
          <div className="arch-node">
            <span className="nicon">👤</span>
            <div className="nname">Pengambil</div>
            <div className="nsub">Keputusan KKP</div>
          </div>
        </div>
      </section> 
      */}


      <div className="divider"></div>

      {/* 5 MODUL */}
      <section id="modul" className="reveal">
        <div className="section-label">02 — Modul Platform</div>
        <h2 className="section-title">5 Modul <span className="hl">Terintegrasi</span> KKP</h2>
        <p className="section-desc">Setiap modul dirancang khusus untuk kebutuhan pemantauan ruang laut KKP RI — bekerja secara mandiri maupun saling terhubung dalam satu platform.</p>

        <div className="mod-grid">
          <div className="mod-card">
            <div className="mod-num">MODUL 01</div>
            <span className="mod-icon">📋</span>
            <div className="mod-title">Smart KKPRL Tracker</div>
            <div className="mod-desc">Monitoring izin real-time dengan visualisasi spasial. Direktur dapat mendeteksi hambatan birokrasi secara langsung dan mengambil tindakan korektif sebelum investasi tertunda.</div>
            <div className="mod-stats">
              <div className="mod-stat"><div className="sv">247</div><div className="sl">Izin Aktif</div></div>
              <div className="mod-stat"><div className="sv" style={{ color: 'var(--accent4)' }}>83</div><div className="sl">Proses Review</div></div>
              <div className="mod-stat"><div className="sv r">12</div><div className="sl">Ditolak</div></div>
            </div>
          </div>
          <div className="mod-card">
            <div className="mod-num">MODUL 02</div>
            <span className="mod-icon">🔱</span>
            <div className="mod-title">Undersea Asset & Infrastructure</div>
            <div className="mod-desc">Pemantauan kabel internet bawah laut, pipa minyak/gas, dengan buffer zona aman. Integrasi AIS Data untuk notifikasi real-time jika kapal memasuki zona merah.</div>
            <div className="mod-stats">
              <div className="mod-stat"><div className="sv">28,4K</div><div className="sl">km Kabel</div></div>
              <div className="mod-stat"><div className="sv r">7</div><div className="sl">Aset Berisiko</div></div>
            </div>
          </div>
          <div className="mod-card">
            <div className="mod-num">MODUL 03</div>
            <span className="mod-icon">🤖</span>
            <div className="mod-title">Spatial Conflict AI Detector</div>
            <div className="mod-desc">Deteksi otomatis tumpang tindih izin dengan kawasan konservasi, alur pelayaran, atau zona militer. AI bekerja 24/7 dengan response time &lt;5 detik.</div>
            <div className="mod-stats">
              <div className="mod-stat"><div className="sv g">97%</div><div className="sl">Akurasi AI</div></div>
              <div className="mod-stat"><div className="sv r">8</div><div className="sl">Red Flag Aktif</div></div>
              <div className="mod-stat"><div className="sv">26</div><div className="sl">Terselesaikan</div></div>
            </div>
          </div>
          <div className="mod-card">
            <div className="mod-num">MODUL 04</div>
            <span className="mod-icon">💰</span>
            <div className="mod-title">Revenue Leakage & PNBP Monitor</div>
            <div className="mod-desc">Hitung otomatis estimasi PNBP sesuai PP 85/2021. Bandingkan data izin aktif vs tagihan yang diterima untuk mengidentifikasi gap revenue secara visual.</div>
            <div className="mod-stats">
              <div className="mod-stat"><div className="sv g" style={{ fontSize: '15px' }}>Rp847M</div><div className="sl">Tertagih</div></div>
              <div className="mod-stat"><div className="sv r" style={{ fontSize: '15px' }}>Rp234M</div><div className="sl">Potensi Bocor</div></div>
            </div>
          </div>
          <div className="mod-card">
            <div className="mod-num">MODUL 05</div>
            <span className="mod-icon">🌊</span>
            <div className="mod-title">Social & Environmental Pulse</div>
            <div className="mod-desc">Pemantauan sentimen masyarakat pesisir melalui jaringan Indopol. Deteksi lonjakan sentimen negatif sebelum eskalasi ke demonstrasi atau sengketa hukum.</div>
            <div className="mod-stats">
              <div className="mod-stat"><div className="sv g">64%</div><div className="sl">Sentimen Positif</div></div>
              <div className="mod-stat"><div className="sv r">24%</div><div className="sl">Negatif</div></div>
              <div className="mod-stat"><div className="sv">450+</div><div className="sl">Sumber Data</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* TEKNOLOGI AI */}
      <section id="teknologi" className="reveal">
        <div className="section-label">03 — Teknologi AI</div>
        <h2 className="section-title">Teknologi AI yang <span className="hlb">Digunakan</span></h2>
        <p className="section-desc"> Demo menggunakan kombinasi teknologi AI terdepan yang disesuaikan khusus untuk kebutuhan pemantauan ruang laut, perizinan, dan sentimen sosial pesisir.</p>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-tag tag-geo">GEOSPATIAL AI</div>
            <div className="tech-title">GeoServer + PostGIS & AI Spatial</div>
            <div className="tech-desc">Tulang punggung analisis spasial platform. GeoServer melayani peta interaktif berbasis WMS/WFS, PostGIS menyimpan data koordinat, dan AI Spatial Conflict Engine mendeteksi tumpang tindih ruang laut secara otomatis dengan akurasi 97%.</div>
            <div className="chip-list">
              <span className="chip">GeoServer</span>
              <span className="chip">PostGIS</span>
              <span className="chip">Spatial Overlap</span>
              <span className="chip">WMS/WFS API</span>
              <span className="chip">Heat Map</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-nlp">NLP SENTIMENT AI</div>
            <div className="tech-title">NLP Sentiment Analysis (Indopol)</div>
            <div className="tech-desc">Model Natural Language Processing berbahasa Indonesia untuk menganalisis sentimen masyarakat pesisir dari media sosial, berita lokal, dan laporan lapangan. Mengklasifikasikan per tema: penambangan pasir, reklamasi, budidaya laut, dan energi offshore.</div>
            <div className="chip-list">
              <span className="chip">IndoBERT</span>
              <span className="chip">Sentiment Classify</span>
              <span className="chip">Topic Modeling</span>
              <span className="chip">Early Warning</span>
              <span className="chip">Indopol API</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-ais">AIS STREAM AI</div>
            <div className="tech-title">AIS Stream Processor & Vessel AI</div>
            <div className="tech-desc">Pemrosesan data Automatic Identification System (AIS) secara real-time dari MarineTraffic/AIS Hub untuk memantau posisi kapal, mendeteksi masuk zona merah, dan memberikan notifikasi ancaman terhadap aset bawah laut.</div>
            <div className="chip-list">
              <span className="chip">AIS Real-Time</span>
              <span className="chip">Zone Detection</span>
              <span className="chip">MarineTraffic API</span>
              <span className="chip">Buffer Analysis</span>
              <span className="chip">Alert Engine</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-ai">MACHINE LEARNING</div>
            <div className="tech-title">Red Flag & Anomaly Detection</div>
            <div className="tech-desc">Algoritma Machine Learning untuk deteksi otomatis anomali perizinan, bottleneck birokrasi, dan potensi revenue leakage. Model dilatih pada data historis KKPRL untuk memberikan rekomendasi resolusi yang akurat.</div>
            <div className="chip-list">
              <span className="chip">Random Forest</span>
              <span className="chip">Anomaly Detect</span>
              <span className="chip">Red Flag System</span>
              <span className="chip">Audit Trail AI</span>
              <span className="chip">XGBoost</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-ai">REVENUE AI</div>
            <div className="tech-title">PNBP Calculator Engine (PP 85/2021)</div>
            <div className="tech-desc">AI kalkulasi otomatis estimasi PNBP berdasarkan peraturan PP 85/2021: per meter lari kabel/pipa, per hektar reklamasi, pelabuhan, dan migas. Membandingkan izin aktif vs tagihan untuk deteksi revenue leakage secara visual.</div>
            <div className="chip-list">
              <span className="chip">SIMPONI API</span>
              <span className="chip">PP 85/2021</span>
              <span className="chip">Leakage Detect</span>
              <span className="chip">Proyeksi PNBP</span>
              <span className="chip">Compliance Check</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-etl">DATA ENGINEERING</div>
            <div className="tech-title">API Gateway & ETL Pipeline</div>
            <div className="tech-desc">Infrastruktur data terpusat yang mengintegrasikan seluruh sumber melalui REST/WMS API Gateway. ETL pipeline memastikan sinkronisasi data real-time antara SKKPRL, BIG Geoportal, KLHK, Kemenhub, dan DKP Daerah.</div>
            <div className="chip-list">
              <span className="chip">REST API</span>
              <span className="chip">WMS Gateway</span>
              <span className="chip">Data Lake</span>
              <span className="chip">Real-Time Sync</span>
              <span className="chip">Apache Kafka</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-tag tag-sec">ENTERPRISE SECURITY</div>
            <div className="tech-title">Keamanan Data & Audit Log</div>
            <div className="tech-desc">Sistem keamanan berlapis untuk data strategis kedaulatan laut: enkripsi end-to-end, kontrol akses berbasis peran (role-based), audit trail setiap keputusan, dan kepatuhan standar keamanan pemerintah Indonesia.</div>
            <div className="chip-list">
              <span className="chip">Role-Based Access</span>
              <span className="chip">Enkripsi E2E</span>
              <span className="chip">Audit Trail</span>
              <span className="chip">Compliance Gov</span>
              <span className="chip">SSO Integration</span>
            </div>
          </div>

{/*           
          <div className="tech-card">
            <div className="tech-tag tag-ai">GENERATIVE AI</div>
            <div className="tech-title">LLM untuk Laporan & Tanya Data</div>
            <div className="tech-desc">Model bahasa besar (LLM) memungkinkan pengambil keputusan bertanya dalam Bahasa Indonesia tentang kondisi ruang laut dan mendapatkan laporan naratif otomatis yang siap dipresentasikan ke pimpinan KKP tanpa perlu mengolah data manual.</div>
            <div className="chip-list">
              <span className="chip">LLM API</span>
              <span className="chip">RAG System</span>
              <span className="chip">Auto Report</span>
              <span className="chip">Natural Query</span>
              <span className="chip">Executive Brief</span>
            </div>
          </div> 
*/}

        </div>
      </section>

      <div className="divider"></div>

      {/* DATA SECTION */}
      <section id="data" className="reveal">
        <div className="section-label">04 — Sumber Data</div>
        <h2 className="section-title">Data Internal KKP &amp; <span className="hl">Eksternal Publik</span></h2>
        <p className="section-desc">Platform mengintegrasikan dua kelompok besar data: data internal resmi KKP (terstruktur) dan data eksternal publik (terstruktur maupun tidak terstruktur) untuk analisis yang komprehensif.</p>

        <div className="data-split">
          <div className="data-card str">
            <div className="data-card-title">🗂️ Data Internal KKP (Terstruktur)</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>Data resmi pemerintah yang tersimpan di sistem KKP, bersifat terstruktur dan dapat langsung diintegrasikan via API.</p>
            <div className="badge-wrap">
              <div className="src-badge b-int">📋 SKKPRL / OSS — Izin KKPRL</div>
              <div className="src-badge b-int">🗺️ RZWP-3-K — Zonasi Provinsi</div>
              <div className="src-badge b-int">💳 SIMPONI PNBP — Keuangan</div>
              <div className="src-badge b-int">🐟 Data Konservasi KKP</div>
              <div className="src-badge b-int">🏛️ DKP Provinsi — Perizinan</div>
              <div className="src-badge b-int">🔍 Inspektorat — Pengawasan</div>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--accent3)' }}>Contoh data:</strong> Status pengajuan KKPRL, koordinat lokasi, data pemohon, tagihan & pembayaran PNBP, temuan pelanggaran, izin budidaya/tangkap.</div>
          </div>

          <div className="data-card unstr">
            <div className="data-card-title">🌐 Data Eksternal Publik (Campuran)</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>Data dari sumber publik yang mencakup data spasial, posisi kapal real-time, sentimen sosial, dan kondisi lingkungan laut.</p>
            <div className="badge-wrap">
              <div className="src-badge b-ext">📡 AIS Global — Posisi Kapal</div>
              <div className="src-badge b-ext">🗺️ BIG Geoportal — Peta Nasional</div>
              <div className="src-badge b-ext">🏢 Kemenhub — ALKI & Pelabuhan</div>
              <div className="src-badge b-ext">🌿 KLHK — Lingkungan Laut</div>
              <div className="src-badge b-ext">📱 Indopol — Sentimen Sosial</div>
              <div className="src-badge b-ext">🗾 OpenStreetMap — Infrastruktur</div>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--accent4)' }}>Contoh data:</strong> Posisi kapal real-time, peta RBI & batas administrasi, kualitas air laut, sentimen media sosial pesisir, jalur kabel laut OSM.</div>
          </div>
        </div>

        <div className="insight-box">
          <span className="insight-icon">💡</span>
          <div>
            <div className="insight-title">Mengapa Integrasi Data Ini Penting?</div>
            <div className="insight-text">Sebelumnya, data GIS, data perizinan, dan data sosial tersimpan di sistem yang berbeda-beda (data silo) — menyebabkan keputusan terlambat dan investasi terhambat. Blue Economy Control Tower menyatukan semuanya dalam satu layar sehingga Direktur KKP dapat melihat kondisi ruang laut secara holistik dalam hitungan detik.</div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* KROSTAB AI */}
      <section id="krostab" className="reveal">
        <div className="section-label">05 — Krostabulasi AI</div>
        <h2 className="section-title">Contoh Fitur <span className="hl">Krostab Data AI</span></h2>
        <p className="section-desc">AI menggabungkan data dari berbagai modul untuk menghasilkan analisis silang yang tidak bisa dilakukan secara manual — menemukan pola dan risiko tersembunyi di ruang laut Indonesia.</p>

        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 't1' ? 'active' : ''}`} onClick={() => handleTabChange('t1')}>Sentimen × Zonasi</button>
          <button className={`tab-btn ${activeTab === 't2' ? 'active' : ''}`} onClick={() => handleTabChange('t2')}>Konflik Spasial × Izin</button>
          <button className={`tab-btn ${activeTab === 't3' ? 'active' : ''}`} onClick={() => handleTabChange('t3')}>PNBP × Data AIS</button>
        </div>

        {/* TAB 1 */}
        {activeTab === 't1' && (
          <div id="t1" className="tab-content active">
            <div className="crosstab-box">
              <div className="ctab-head">
                <div className="ctab-title">🌊 Krostab: Sentimen Masyarakat Pesisir × Zona Pemanfaatan Ruang Laut
                  <span className="ai-pill">NLP AI · INDOPOL</span>
                </div>
              </div>
              <div className="ctab-ctrl">
                <button className="ctrl-btn active">Semua Wilayah</button>
                <button className="ctrl-btn">Jawa</button>
                <button className="ctrl-btn">Sulawesi</button>
                <button className="ctrl-btn">Kalimantan</button>
                <button className="ctrl-btn">📅 Q1 2026</button>
              </div>
              <div className="ctab-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Isu Pemanfaatan Ruang Laut</th>
                      <th>Sentimen AI (NLP)</th>
                      <th>Volume Data</th>
                      <th>Intensitas Isu</th>
                      <th>Zona Terdampak</th>
                      <th>Status Early Warning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-name">🏖️ Reklamasi Pesisir</td>
                      <td><span className="neg">▼ Negatif 71%</span></td>
                      <td>2.840 posting</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bred" style={{ width: '85%' }}></div></div><span className="sc">85%</span></div></td>
                      <td style={{ color: 'var(--accent4)' }}>Jawa Utara, Bali</td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 PERINGATAN DINI</td>
                    </tr>
                    <tr>
                      <td className="td-name">⛏️ Penambangan Pasir</td>
                      <td><span className="neg">▼ Negatif 84%</span></td>
                      <td>1.920 posting</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bred" style={{ width: '92%' }}></div></div><span className="sc">92%</span></div></td>
                      <td style={{ color: 'var(--accent4)' }}>Kepri, Bangka</td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 ESKALASI TINGGI</td>
                    </tr>
                    <tr>
                      <td className="td-name">🌊 Budidaya Laut</td>
                      <td><span className="pos">▲ Positif 78%</span></td>
                      <td>3.460 posting</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bgreen" style={{ width: '72%' }}></div></div><span className="sc">72%</span></div></td>
                      <td style={{ color: 'var(--accent3)' }}>Sulawesi, NTT</td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ KONDUSIF</td>
                    </tr>
                    <tr>
                      <td className="td-name">⚡ Energi Terbarukan Offshore</td>
                      <td><span className="neu">◆ Netral 55%</span></td>
                      <td>890 posting</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill borange" style={{ width: '44%' }}></div></div><span className="sc">44%</span></div></td>
                      <td style={{ color: 'var(--accent4)' }}>Selat Sunda</td>
                      <td style={{ color: 'var(--accent4)', fontSize: '12px', fontWeight: 600 }}>⚠️ PANTAU</td>
                    </tr>
                    <tr>
                      <td className="td-name">⚓ Pelabuhan & DLKP</td>
                      <td><span className="pos">▲ Positif 61%</span></td>
                      <td>1.340 posting</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bblue" style={{ width: '58%' }}></div></div><span className="sc">58%</span></div></td>
                      <td style={{ color: 'var(--accent3)' }}>Nasional</td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ KONDUSIF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="insight-box">
              <span className="insight-icon">🧠</span>
              <div>
                <div className="insight-title">Insight NLP AI — Indopol Network</div>
                <div className="insight-text">AI NLP mendeteksi lonjakan 3,2x sentimen negatif terkait penambangan pasir di Kepulauan Riau dalam 14 hari terakhir — berkorelasi dengan 2 pengajuan izin baru yang sedang diproses. Rekomendasi: tinjau izin tersebut sebelum berpotensi memicu demonstrasi masyarakat nelayan.</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 't2' && (
          <div id="t2" className="tab-content active">
            <div className="crosstab-box">
              <div className="ctab-head">
                <div className="ctab-title">🤖 Krostab: Konflik Spasial AI × Status Perizinan KKPRL
                  <span className="ai-pill">SPATIAL AI · 97% AKURASI</span>
                </div>
              </div>
              <div className="ctab-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID Pengajuan</th>
                      <th>Jenis Pemanfaatan</th>
                      <th>Konflik Terdeteksi AI</th>
                      <th>Zona Tumpang Tindih</th>
                      <th>Risiko Spasial</th>
                      <th>Rekomendasi AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-name">KKPRL-2026-0147</td>
                      <td>Kabel Serat Optik</td>
                      <td><span className="pos">✓ Tidak Ada</span></td>
                      <td>—</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bgreen" style={{ width: '8%' }}></div></div><span className="sc">8%</span></div></td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ Lanjutkan Proses</td>
                    </tr>
                    <tr>
                      <td className="td-name">KKPRL-2026-0153</td>
                      <td>Reklamasi 42 Ha</td>
                      <td><span className="neg">⚠ 2 Konflik</span></td>
                      <td>Kawasan Konservasi</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bred" style={{ width: '91%' }}></div></div><span className="sc">91%</span></div></td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 Red Flag — Tolak</td>
                    </tr>
                    <tr>
                      <td className="td-name">KKPRL-2026-0158</td>
                      <td>Pipa Gas Offshore</td>
                      <td><span className="neg">⚠ 1 Konflik</span></td>
                      <td>ALKI II Kemenhub</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill borange" style={{ width: '64%' }}></div></div><span className="sc">64%</span></div></td>
                      <td style={{ color: 'var(--accent4)', fontSize: '12px', fontWeight: 600 }}>⚠️ Revisi Trase</td>
                    </tr>
                    <tr>
                      <td className="td-name">KKPRL-2026-0162</td>
                      <td>Budidaya Rumput Laut</td>
                      <td><span className="pos">✓ Tidak Ada</span></td>
                      <td>—</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bgreen" style={{ width: '12%' }}></div></div><span className="sc">12%</span></div></td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ Lanjutkan Proses</td>
                    </tr>
                    <tr>
                      <td className="td-name">KKPRL-2026-0171</td>
                      <td>PLTS Offshore</td>
                      <td><span className="neg">⚠ 3 Konflik</span></td>
                      <td>Zona Militer + ALKI</td>
                      <td><div className="bar-cell"><div className="bar-bg"><div className="bar-fill bred" style={{ width: '97%' }}></div></div><span className="sc">97%</span></div></td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 Red Flag — Tolak</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="insight-box">
              <span className="insight-icon">🤖</span>
              <div>
                <div className="insight-title">Spatial AI — Eliminasi Human Error</div>
                <div className="insight-text">Dari 5 pengajuan di atas, AI Spatial Conflict mendeteksi 2 pengajuan bermasalah dalam &lt;5 detik yang secara manual membutuhkan 2-3 hari analisis GIS. Total konflik aktif: 34 kasus — 8 red flag, 26 terselesaikan. AI bekerja 24/7 tanpa bias, analis fokus pada resolusi dan negosiasi.</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 't3' && (
          <div id="t3" className="tab-content active">
            <div className="crosstab-box">
              <div className="ctab-head">
                <div className="ctab-title">💰 Krostab: Monitor PNBP × Data Kapal AIS Real-Time
                  <span className="ai-pill">REVENUE AI · PP 85/2021</span>
                </div>
              </div>
              <div className="ctab-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Pemegang Izin</th>
                      <th>Jenis Aktivitas</th>
                      <th>PNBP Seharusnya</th>
                      <th>PNBP Tertagih</th>
                      <th>Gap / Leakage</th>
                      <th>Status Kapal AIS</th>
                      <th>Status AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-name">PT Kabel Nusa</td>
                      <td>Kabel 240 km</td>
                      <td>Rp 84 M</td>
                      <td><span className="pos">Rp 84 M</span></td>
                      <td style={{ color: 'var(--accent3)' }}>Rp 0 (Lunas)</td>
                      <td>✅ Normal</td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ Compliant</td>
                    </tr>
                    <tr>
                      <td className="td-name">PT Reklamindo</td>
                      <td>Reklamasi 18 Ha</td>
                      <td>Rp 127 M</td>
                      <td><span className="neg">Rp 43 M</span></td>
                      <td style={{ color: 'var(--red)' }}>⚠ Bocor Rp 84 M</td>
                      <td>⚓ Kapal Aktif</td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 Tunggakan</td>
                    </tr>
                    <tr>
                      <td className="td-name">PT Migas Nusantara</td>
                      <td>Pipa 180 km</td>
                      <td>Rp 210 M</td>
                      <td><span className="pos">Rp 210 M</span></td>
                      <td style={{ color: 'var(--accent3)' }}>Rp 0 (Lunas)</td>
                      <td>✅ Normal</td>
                      <td style={{ color: 'var(--accent3)', fontSize: '12px', fontWeight: 600 }}>✅ Compliant</td>
                    </tr>
                    <tr>
                      <td className="td-name">CV Budidaya Laut</td>
                      <td>Budidaya 8 Ha</td>
                      <td>Rp 28 M</td>
                      <td><span className="neg">Rp 0</span></td>
                      <td style={{ color: 'var(--red)' }}>⚠ Bocor Rp 28 M</td>
                      <td>🚨 Zona Merah</td>
                      <td style={{ color: 'var(--red)', fontSize: '12px', fontWeight: 600 }}>🔴 Ilegal+Bocor</td>
                    </tr>
                    <tr>
                      <td className="td-name">PT Offshore Wind</td>
                      <td>PLTS Offshore 5 Ha</td>
                      <td>Rp 122 M</td>
                      <td><span className="neu">Rp 95 M</span></td>
                      <td style={{ color: 'var(--accent4)' }}>Gap Rp 27 M</td>
                      <td>✅ Normal</td>
                      <td style={{ color: 'var(--accent4)', fontSize: '12px', fontWeight: 600 }}>⚠️ Verifikasi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="insight-box">
              <span className="insight-icon">💡</span>
              <div>
                <div className="insight-title">Temuan Revenue AI — Krostab PNBP × AIS</div>
                <div className="insight-text">AI mendeteksi CV Budidaya Laut beroperasi aktif (kapal terdeteksi di zona merah via AIS) namun belum membayar PNBP sepeser pun — potensi kerugian negara Rp 28 M. Total gap bulan ini: Rp 139 M dari 2 pemegang izin bermasalah. Data kapal AIS menjadi bukti kuat bahwa aktivitas nyata terjadi meski tagihan belum dibayar.</div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="divider"></div>

      {/* INTEGRASI */}
      <section id="integrasi" className="reveal">
        <div className="section-label">06 — Integrasi Sistem</div>
        <h2 className="section-title">Terhubung ke <span className="hlb">Semua Sumber</span></h2>
        <p className="section-desc">Blue Economy Control Tower dapat diintegrasikan dengan sistem pemerintah, sumber data publik, maupun model AI eksternal melalui API Gateway standar.</p>

        <div style={{ marginBottom: '30px' }}>
          <div className="section-label" style={{ marginBottom: '14px' }}>🏛️ Sistem Pemerintah (Internal)</div>
          <div className="integ-grid">
            <div className="integ-card"><span className="integ-icon">📋</span><div className="integ-name">SKKPRL / OSS</div><div className="integ-type">Perizinan KKP</div></div>
            <div className="integ-card"><span className="integ-icon">💳</span><div className="integ-name">SIMPONI PNBP</div><div className="integ-type">Keuangan Negara</div></div>
            <div className="integ-card"><span className="integ-icon">🗺️</span><div className="integ-name">BIG Geoportal</div><div className="integ-type">Peta Nasional</div></div>
            <div className="integ-card"><span className="integ-icon">🏛️</span><div className="integ-name">Kemenhub / ALKI</div><div className="integ-type">Alur Pelayaran</div></div>
            <div className="integ-card"><span className="integ-icon">🌿</span><div className="integ-name">KLHK PPKL</div><div className="integ-type">Lingkungan Laut</div></div>
            <div className="integ-card"><span className="integ-icon">🏢</span><div className="integ-name">DKP Provinsi</div><div className="integ-type">Izin Daerah</div></div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div className="section-label" style={{ marginBottom: '14px' }}>🌐 Sumber Data Publik / Eksternal</div>
          <div className="integ-grid">
            <div className="integ-card"><span className="integ-icon">📡</span><div className="integ-name">AIS Hub / MarineTraffic</div><div className="integ-type">Posisi Kapal Real-Time</div></div>
            <div className="integ-card"><span className="integ-icon">📱</span><div className="integ-name">Indopol Network</div><div className="integ-type">Sentimen Sosial Pesisir</div></div>
            <div className="integ-card"><span className="integ-icon">🗾</span><div className="integ-name">OpenStreetMap</div><div className="integ-type">Infrastruktur Publik</div></div>
            <div className="integ-card"><span className="integ-icon">📰</span><div className="integ-name">Media & Berita Lokal</div><div className="integ-type">NLP Monitoring</div></div>
            <div className="integ-card"><span className="integ-icon">🛰️</span><div className="integ-name">Citra Satelit</div><div className="integ-type">Remote Sensing</div></div>
            <div className="integ-card"><span className="integ-icon">🔌</span><div className="integ-name">REST / WMS API</div><div className="integ-type">Sumber Apapun</div></div>
          </div>
        </div>

        <div>
          <div className="section-label" style={{ marginBottom: '14px' }}>🧠 Model AI yang Dapat Dipilih / Diganti</div>
          <div className="integ-grid">
            <div className="integ-card"><span className="integ-icon">🤖</span><div className="integ-name">LLM Lokal (On-Premise)</div><div className="integ-type">Data Kedaulatan Aman</div></div>
            <div className="integ-card"><span className="integ-icon">🧠</span><div className="integ-name">Claude / GPT API</div><div className="integ-type">Laporan & Analisis</div></div>
            <div className="integ-card"><span className="integ-icon">🗺️</span><div className="integ-name">Custom Spatial AI</div><div className="integ-type">Model Terlatih KKP</div></div>
            <div className="integ-card"><span className="integ-icon">💬</span><div className="integ-name">IndoBERT / NLP ID</div><div className="integ-type">Bahasa Indonesia</div></div>
            <div className="integ-card"><span className="integ-icon">🔌</span><div className="integ-name">Model Custom Sendiri</div><div className="integ-type">API Standar</div></div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ROADMAP */}
      <section className="reveal">
        <div className="section-label">07 — Implementasi</div>
        <h2 className="section-title">Roadmap <span className="hl">12 Bulan</span> Go-Live</h2>
        <p className="section-desc">Implementasi bertahap (phased deployment) memastikan setiap modul berjalan stabil sebelum melanjutkan ke fase berikutnya.</p>

        <div className="roadmap">
          <div className="phase-card">
            <div className="phase-dot"></div>
            <div className="phase-num">FASE 01</div>
            <div className="phase-period">Bulan 1–3</div>
            <div className="phase-title">Foundation & Data Integration</div>
            <ul className="phase-items">
              <li>Setup infrastruktur server</li>
              <li>Integrasi SKKPRL & data izin</li>
              <li>Implementasi GeoServer + PostGIS</li>
              <li>Dashboard KKPRL Tracker v1.0</li>
            </ul>
          </div>
          <div className="phase-card">
            <div className="phase-dot"></div>
            <div className="phase-num">FASE 02</div>
            <div className="phase-period">Bulan 4–6</div>
            <div className="phase-title">Core Modules Development</div>
            <ul className="phase-items">
              <li>Modul Undersea Asset Map</li>
              <li>Integrasi AIS Data Feed</li>
              <li>PNBP Calculator Engine</li>
              <li>Alert & Notification System</li>
            </ul>
          </div>
          <div className="phase-card">
            <div className="phase-dot g"></div>
            <div className="phase-num">FASE 03</div>
            <div className="phase-period">Bulan 7–9</div>
            <div className="phase-title">AI & Analytics Layer</div>
            <ul className="phase-items">
              <li>Spatial Conflict AI Training</li>
              <li>Integrasi Indopol Network</li>
              <li>Sentiment Analysis NLP</li>
              <li>Red Flag Auto-Detection</li>
            </ul>
          </div>
          <div className="phase-card">
            <div className="phase-dot g"></div>
            <div className="phase-num">FASE 04</div>
            <div className="phase-period">Bulan 10–12</div>
            <div className="phase-title">Full Integration & Go-Live</div>
            <ul className="phase-items">
              <li>UAT bersama KKP & Stakeholder</li>
              <li>Training operator & analis</li>
              <li>Go-live Control Tower</li>
              <li>Monitoring & continuous improvement</li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginTop: '60px' }}>
          <div className="section-label" style={{ marginBottom: '14px' }}>Keunggulan Platform</div>
          <div className="feat-grid">
            <div className="feat-item"><div className="feat-icon">🗺️</div><div className="feat-content"><div className="title">Peta Spasial Real-Time</div><div className="desc">Layer GIS interaktif yang memperlihatkan kondisi seluruh ruang laut Indonesia termasuk status izin, posisi kapal, dan zona konflik secara langsung.</div></div></div>
            <div className="feat-item"><div className="feat-icon">🔴</div><div className="feat-content"><div className="title">Red Flag Otomatis &lt;5 Detik</div><div className="desc">AI Spatial Conflict mendeteksi tumpang tindih dan mengeluarkan notifikasi merah secara otomatis sebelum izin bermasalah dikeluarkan.</div></div></div>
            <div className="feat-item"><div className="feat-icon">📡</div><div className="feat-content"><div className="title">Pantau Kapal via AIS 24/7</div><div className="desc">Notifikasi real-time jika kapal berlabuh di zona merah atau mendekati infrastruktur strategis kabel/pipa bawah laut.</div></div></div>
            <div className="feat-item"><div className="feat-icon">💰</div><div className="feat-content"><div className="title">Deteksi Revenue Leakage</div><div className="desc">Tidak ada satu pun pengusaha yang bisa memanfaatkan ruang laut tanpa terdeteksi dan membayar PNBP sesuai PP 85/2021.</div></div></div>
            <div className="feat-item"><div className="feat-icon">🌊</div><div className="feat-content"><div className="title">Early Warning Konflik Sosial</div><div className="desc">Deteksi lonjakan sentimen negatif masyarakat pesisir sebelum bereskalasi ke demonstrasi atau sengketa hukum yang merugikan investasi.</div></div></div>
            <div className="feat-item"><div className="feat-icon">📋</div><div className="feat-content"><div className="title">Laporan Eksekutif Otomatis</div><div className="desc">AI menghasilkan ringkasan kondisi ruang laut nasional siap presentasi ke pimpinan KKP tanpa perlu mengolah data manual.</div></div></div>
            <div className="feat-item"><div className="feat-icon">🔐</div><div className="feat-content"><div className="title">Keamanan Data Kedaulatan</div><div className="desc">Opsi deployment on-premise untuk data strategis sensitif, dengan kontrol akses berbasis peran dan audit trail seluruh aktivitas.</div></div></div>
            <div className="feat-item"><div className="feat-icon">📱</div><div className="feat-content"><div className="title">Akses Multi-Perangkat</div><div className="desc">Satu layar, akses dari mana saja. Responsif di desktop, tablet, maupun smartphone — online 24/7 dengan keamanan terjamin.</div></div></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">🌊 KKP · CONTROL TOWER</div>
        <p style={{ marginTop: '8px' }}>Platform NexGov 2026 · Kementerian Kelautan dan Perikanan Republik Indonesia</p>
        <p style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-dim)' }}>Solusi Digital Pemantauan Ruang Laut Nasional · 5 Modul · AI-Powered · Real-Time · Terintegrasi</p>
      </footer>
    </div>
  );
};

export default LandingPage;
