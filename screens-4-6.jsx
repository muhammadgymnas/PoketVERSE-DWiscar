/* global React, Icon, NavHeader, fmtIDR, CountUp */
// Screens 4-6: PoketWAVE, QRIS bottom sheet, Wrapped

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// =====================================================
// SCREEN 4 — POKETWAVE
// =====================================================
const WAVE_STATES = [
  {
    day: 'Hari 1', sub: 'Gajian', icon: 'trending-up',
    when: 'barusan',
    title: 'Dana masuk ke rekening kamu',
    body: 'Rp 5.000.000 baru saja dikreditkan. Kunci 20% ke Poket Liburan, kamu sudah 42% menuju tujuan.',
    cta1: 'Kunci Sekarang', cta2: 'Lewati',
  },
  {
    day: 'Hari 5', sub: 'QRIS', icon: 'shopping-cart',
    when: '12 menit lalu',
    title: 'Transaksi QRIS Tokopedia',
    body: 'Pembayaran Rp 87.500 berhasil. Bulatkan Rp 2.500 ke Poket Dana Darurat secara otomatis?',
    cta1: 'Aktifkan Round-Up', cta2: 'Tidak',
  },
  {
    day: 'Hari 10', sub: 'KPR', icon: 'home',
    when: 'tadi pagi',
    title: 'Informasi KPR BCA',
    body: 'Kamu mengecek suku bunga KPR. Sisihkan Rp 2.000.000 per bulan ke Poket KPR Down Payment untuk pre-approval lebih cepat.',
    cta1: 'Mulai Sisihkan', cta2: 'Pelajari Dulu',
  },
  {
    day: 'Hari 25', sub: 'Review', icon: 'pie-chart',
    when: 'Senin pagi',
    title: 'Ringkasan pengeluaran minggu ini',
    body: 'Pengeluaran kamu Rp 2.100.000 minggu ini. Rp 420.000 di kategori kafe, 2× lebih tinggi dari minggu lalu. Sesuaikan alokasi Poket?',
    cta1: 'Sesuaikan', cta2: 'Biarkan',
  },
  {
    day: 'Hari 30', sub: 'Wrapped', icon: 'gift',
    when: 'baru saja',
    title: 'Poket Wrapped tersedia',
    body: 'Kamu menabung Rp 4.200.000 ke 3 Poket bulan ini, masuk top 7% pengguna seusia kamu. Lihat rekap lengkapnya.',
    cta1: 'Lihat Wrapped', cta2: 'Nanti',
  },
];

function ScreenPoketWave({ onBack, onOpenWrapped }) {
  const [idx, setIdx] = useS2(0);
  const [fading, setFading] = useS2(false);
  const impactRef = useR2(null);

  useE2(() => { window.refreshIcons(); });

  useE2(() => {
    if (impactRef.current) {
      setTimeout(() => {
        if (impactRef.current) impactRef.current.style.width = '63%';
      }, 350);
    }
  }, []);

  const jump = (i) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => {
      setIdx(i);
      setFading(false);
      window.refreshIcons();
    }, 200);
  };

  const s = WAVE_STATES[idx];
  const progressPct = (idx / (WAVE_STATES.length - 1)) * 100;

  return (
    <div className="screen-content" data-screen-label="04 PoketWAVE">
      <NavHeader
        title="PoketWAVE"
        onBack={onBack}
        right={<button className="icon-btn"><Icon name="info" size={20} color="var(--navy)" /></button>}
      />

      <div className="subtitle-strip">Trigger 5 momen finansial penting setiap bulan</div>

      <div className="timeline">
        <div className="line">
          <div className="progress" style={{ width: progressPct + '%' }}></div>
        </div>
        <div className="nodes">
          {WAVE_STATES.map((w, i) => (
            <button key={i} className={'tl-node ' + (i === idx ? 'active' : '')} onClick={() => jump(i)}>
              <div className="tl-circle">
                <Icon name={w.icon} size={16} color={i === idx ? '#fff' : 'var(--mute)'} />
              </div>
              <div className="lbl">{w.day}</div>
              <div className="sub">{w.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={'notif-card ' + (fading ? 'fading' : '')}>
        <div className="appbar">
          <span className="logo">
            <span className="my">my</span><span className="bca">BCA</span>
          </span>
          <span className="when">{s.when}</span>
        </div>
        <div className="content">
          <div className="nt">{s.title}</div>
          <div className="nb">{s.body}</div>
          <div className="btns">
            <button
              className="nbtn prim"
              onClick={() => { if (idx === 4) onOpenWrapped(); }}
            >{s.cta1}</button>
            <button className="nbtn sec">{s.cta2}</button>
          </div>
        </div>
      </div>

      <div className="impact-bar">
        <div className="t">Pengguna dengan trigger aktif menabung rata-rata <b>63% lebih banyak</b></div>
        <div className="ib-track"><div ref={impactRef} className="ib-fill"></div></div>
        <div className="src">&sup1; Modeled from Fogg (2009) + BCA 1Q26 data</div>
      </div>

      <div className="citation" style={{ paddingTop: 16 }}>
        &sup1; BJ Fogg, Behavior Model (2009) &middot; &sup2; BCA internal 1Q26 user research &middot; &sup3; Bank Jago Pocket trigger study
      </div>
    </div>
  );
}
window.ScreenPoketWave = ScreenPoketWave;


// =====================================================
// SCREEN 5 — QRIS BOTTOM SHEET
// =====================================================
function ScreenQris({ onBack, blurredBackground }) {
  const [sel, setSel] = useS2('liburan');
  useE2(() => { window.refreshIcons(); });

  const opts = [
    { id: 'utama',    nm: 'Rekening Utama',        bl: 'Rp 24.750.000', ic: 'wallet', color: 'var(--navy)' },
    { id: 'liburan',  nm: 'Liburan Eropa 2027',    bl: 'Rp 42.000.000', ic: 'plane',  color: 'var(--sky)' },
    { id: 'darurat',  nm: 'Dana Darurat',          bl: 'Rp 15.250.000', ic: 'shield', color: 'var(--green)' },
  ];

  return (
    <div className="screen-content qris-screen" data-screen-label="05 QRIS Poket">
      <div className="qris-blur-bg">{blurredBackground}</div>
      <div className="qris-scrim"></div>

      <div className="bottom-sheet">
        <div className="drag-handle"></div>

        <div className="merchant-row">
          <div className="mi"><Icon name="shopping-bag" size={20} color="var(--sky)" /></div>
          <div className="mn">
            <div className="nm">Tokopedia</div>
            <div className="sb">QRIS &middot; Pembayaran Langsung</div>
          </div>
          <div className="amt">Rp 87.500</div>
        </div>

        <div className="pay-from-label section-label">Bayar dari</div>

        <div className="pay-list">
          {opts.map(o => (
            <div key={o.id} className="pay-row" onClick={() => setSel(o.id)}>
              <div className={'radio ' + (sel === o.id ? 'selected' : '')}></div>
              <div className="ic"><Icon name={o.ic} size={18} color={o.color} /></div>
              <div style={{ flex: 1 }}>
                <div className="nm">{o.nm}</div>
                <div className="bl">{o.bl}</div>
                {sel === o.id && o.id === 'liburan' && (
                  <div className="roundup">
                    <Icon name="arrow-right" size={11} color="var(--sky)" />
                    <span>Round-up Rp 2.500 ke Poket Dana Darurat</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="pay-more">
            <span>Poket lainnya</span>
            <Icon name="chevron-down" size={16} color="var(--sky)" />
          </div>
        </div>

        <div className="roundup-strip">
          <Icon name="refresh-cw" size={12} color="var(--green)" />
          <span>Round-Up aktif: setiap transaksi dibulatkan ke Rp 5.000</span>
        </div>

        <div className="qris-cta">
          <button className="btn-primary pay-btn">Bayar Rp 87.500</button>
          <button className="cancel-link" onClick={onBack}>Batalkan</button>
        </div>
      </div>
    </div>
  );
}
window.ScreenQris = ScreenQris;


// =====================================================
// SCREEN 6 — WRAPPED
// =====================================================
function ScreenWrapped({ onBack }) {
  const dist1Ref = useR2(null);
  const dist2Ref = useR2(null);
  const dist3Ref = useR2(null);
  const percentileFill = useR2(null);
  const percentileMarker = useR2(null);

  useE2(() => {
    window.refreshIcons();
    // Animate distribution bars and percentile after card delays
    setTimeout(() => { if (dist1Ref.current) dist1Ref.current.style.width = '42%'; }, 850);
    setTimeout(() => { if (dist2Ref.current) dist2Ref.current.style.width = '76%'; }, 950);
    setTimeout(() => { if (dist3Ref.current) dist3Ref.current.style.width = '23%'; }, 1050);
    setTimeout(() => {
      if (percentileFill.current) percentileFill.current.style.width = '93%';
      if (percentileMarker.current) percentileMarker.current.style.left = '93%';
    }, 1100);
  }, []);

  return (
    <div className="screen-content wrapped" data-screen-label="06 Wrapped">
      <div className="back-row">
        <button className="icon-btn ib" onClick={onBack}>
          <Icon name="chevron-left" size={22} color="#fff" />
        </button>
        <button className="icon-btn ib">
          <Icon name="share-2" size={20} color="#fff" />
        </button>
      </div>

      <div className="header">
        <span className="year">2025</span>
        <div className="title"><span className="w1">Poket</span><span className="w2">Wrapped.</span></div>
        <div className="tagline">Tahunmu. Ceritamu.</div>
      </div>

      <div className="goldline"></div>

      {/* CARD 1 — total nabung */}
      <div className="wcard delay-1">
        <div className="lbl">Total Nabung 2025</div>
        <div className="big"><CountUp to={28600000} duration={1300} delay={650} /></div>
        <div className="ctx">2&times; rata-rata pengguna seusia kamu</div>
      </div>

      {/* CARD 2 — distribusi */}
      <div className="wcard delay-2">
        <div className="lbl">Distribusi Poket</div>
        <div style={{ marginTop: 10 }}>
          <div className="dist-row">
            <span className="nm">Liburan Eropa</span>
            <div className="bar"><div ref={dist1Ref} style={{ background: 'var(--sky)' }}></div></div>
            <span className="amt">Rp 42jt</span>
          </div>
          <div className="dist-row">
            <span className="nm">Dana Darurat</span>
            <div className="bar"><div ref={dist2Ref} style={{ background: 'var(--green)' }}></div></div>
            <span className="amt">Rp 15,3jt</span>
          </div>
          <div className="dist-row">
            <span className="nm">KPR DP Rumah</span>
            <div className="bar"><div ref={dist3Ref} style={{ background: 'var(--gold)' }}></div></div>
            <span className="amt">Rp 11,5jt</span>
          </div>
        </div>
      </div>

      {/* CARD 3 — HERO peringkat */}
      <div className="wcard hero delay-3">
        <div className="award">
          <Icon name="award" size={16} color="rgba(26,26,46,0.6)" />
          <span>Peringkat Global</span>
        </div>
        <div className="lbl" style={{ marginTop: 8 }}>Performa Konsistensi</div>
        <div className="big">Top 7%</div>
        <div className="ctx">dari pengguna myBCA seusia kamu yang konsisten menabung sepanjang 2025</div>
        <div className="percentile">
          <div ref={percentileFill} className="fill"></div>
          <div ref={percentileMarker} className="marker" style={{ left: 0 }}>
            <span className="tag">Kamu</span>
          </div>
        </div>
      </div>

      {/* CARD 4 — konsistensi */}
      <div className="wcard delay-4">
        <div className="lbl">Konsistensi</div>
        <div className="streak-row" style={{ marginTop: 10 }}>
          <Icon name="flame" size={22} color="var(--gold)" />
          <span className="t">8 bulan berturut-turut</span>
        </div>
        <div className="month-grid">
          {['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'].map((m, i) => (
            <div key={m} className={'month ' + (i < 8 ? 'on' : 'off')}>{m}</div>
          ))}
        </div>
      </div>

      <div className="share">
        <button className="btn-share">
          <Icon name="instagram" size={16} color="#fff" />
          Bagikan ke Instagram Stories
        </button>
        <button className="btn-copy-summary">
          <Icon name="copy" size={16} color="#fff" />
          Salin Ringkasan
        </button>
      </div>

      <div className="footer">myBCA &middot; PoketVERSE &middot; GBCC 2026</div>
    </div>
  );
}
window.ScreenWrapped = ScreenWrapped;
