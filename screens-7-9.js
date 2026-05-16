/* global React, Icon, NavHeader, fmtIDR */
// Screens 7-9: Template Gallery, Template Detail, Customize

const { useState: useS3, useEffect: useE3, useRef: useR3 } = React;

// =====================================================
// SCREEN 7 — TEMPLATE GALLERY
// =====================================================
const TPL_CATEGORIES = ['Semua', 'Perjalanan', 'Properti', 'Pendidikan', 'Ibadah', 'Darurat', 'Pernikahan', 'Lainnya'];

const TEMPLATES = [
  { id: 'liburan', name: 'Liburan Eropa', icon: 'plane', cat: 'Perjalanan',
    desc: 'Wujudkan perjalanan impian ke benua Eropa',
    partners: ['tiket.com', 'Garuda', 'Tokopedia'], more: 0,
    range: 'Rp 30jt sampai 200jt',
    grad: 'linear-gradient(135deg, #0060AF 0%, #0099D8 100%)',
    clickable: true },
  { id: 'darurat', name: 'Dana Darurat', icon: 'shield', cat: 'Darurat',
    desc: 'Proteksi finansial 3 sampai 6 bulan gaji',
    partners: ['BCA Insurance'], more: 0,
    range: 'Rp 15jt sampai 100jt',
    grad: 'linear-gradient(135deg, #1B6B3A 0%, #2DBE60 100%)' },
  { id: 'kpr', name: 'KPR Down Payment', icon: 'home', cat: 'Properti',
    desc: 'Kumpulkan uang muka rumah pertama',
    partners: ['KPR BCA', 'Mitsubishi', 'BTN'], more: 0,
    range: 'Rp 50jt sampai 500jt',
    grad: 'linear-gradient(135deg, #1A365D 0%, #0060AF 100%)',
    clickable: true },
  { id: 'haji', name: 'Dana Haji & Umrah', icon: 'moon', cat: 'Ibadah',
    desc: 'Persiapan ibadah haji dan umrah',
    partners: ['BPIH', 'Kemenag'], more: 0,
    range: 'Rp 25jt sampai 100jt',
    grad: 'linear-gradient(135deg, #5B4000 0%, #E1A730 100%)' },
  { id: 'nikah', name: 'Pernikahan 2027', icon: 'heart', cat: 'Pernikahan',
    desc: 'Dari venue hingga bulan madu',
    partners: ['The Ritz', 'Shangri-La', 'Garuda'], more: 0,
    range: 'Rp 80jt sampai 600jt',
    grad: 'linear-gradient(135deg, #6B2D5E 0%, #C26BA3 100%)' },
  { id: 'edu', name: 'Pendidikan Anak', icon: 'graduation-cap', cat: 'Pendidikan',
    desc: 'Investasi pendidikan dari dini',
    partners: ['BCA Sekuritas', 'RDPU'], more: 0,
    range: 'Rp 10jt sampai 300jt',
    grad: 'linear-gradient(135deg, #0A5E8C 0%, #0099D8 100%)' },
  { id: 'gadget', name: 'Gadget & Teknologi', icon: 'smartphone', cat: 'Lainnya',
    desc: 'iPhone, laptop, atau kamera impian',
    partners: ['iBox', 'Samsung', 'Tokopedia'], more: 0,
    range: 'Rp 5jt sampai 50jt',
    grad: 'linear-gradient(135deg, #2D2D2D 0%, #555 100%)' },
  { id: 'mobil', name: 'Kendaraan Baru', icon: 'car', cat: 'Lainnya',
    desc: 'DP atau kredit kendaraan pertama',
    partners: ['Mitsubishi', 'Toyota', 'KKB BCA'], more: 0,
    range: 'Rp 20jt sampai 150jt',
    grad: 'linear-gradient(135deg, #1A3A5C 0%, #2B7ABD 100%)' },
  { id: 'renov', name: 'Renovasi Rumah', icon: 'hammer', cat: 'Properti',
    desc: 'Refresh interior atau perluasan rumah',
    partners: ['Mitra10', 'IKEA', 'Informa'], more: 0,
    range: 'Rp 15jt sampai 200jt',
    grad: 'linear-gradient(135deg, #7A3B00 0%, #C8741F 100%)' },
  { id: 'sehat', name: 'Kesehatan & BPJS', icon: 'heart-pulse', cat: 'Lainnya',
    desc: 'Dana medis dan asuransi tahunan',
    partners: ['Halodoc', 'BCA Insurance'], more: 0,
    range: 'Rp 5jt sampai 30jt',
    grad: 'linear-gradient(135deg, #8E1B36 0%, #D7263D 100%)' },
  { id: 'bisnis', name: 'Bisnis & Usaha', icon: 'briefcase', cat: 'Lainnya',
    desc: 'Modal awal usaha atau ekspansi',
    partners: ['BCA UMKM', 'Bukalapak'], more: 0,
    range: 'Rp 25jt sampai 500jt',
    grad: 'linear-gradient(135deg, #0F3D2E 0%, #1B7A55 100%)' },
];

function ScreenTemplateGallery({ onBack, onPickTemplate }) {
  const [cat, setCat] = useS3('Semua');
  useE3(() => { window.refreshIcons(); }, [cat]);

  const filtered = cat === 'Semua' ? TEMPLATES : TEMPLATES.filter(t => t.cat === cat);

  return (
    <div className="screen-content" data-screen-label="07 Pilih Template">
      <NavHeader
        title="Buat Poket Baru"
        onBack={onBack}
        right={<span className="step-pill">1 / 3</span>}
      />

      <div className="subtitle-block">Mulai dari template, atau buat sendiri dari awal.</div>

      <div className="search-bar">
        <Icon name="search" size={16} color="var(--mute)" />
        <input placeholder="Cari tujuan..." />
      </div>

      <div className="cat-chips">
        {TPL_CATEGORIES.map(c => (
          <button
            key={c}
            className={'cat-chip ' + (cat === c ? 'active' : '')}
            onClick={() => setCat(c)}
          >{c}</button>
        ))}
      </div>

      <div className="tpl-grid">
        {filtered.map(t => (
          <div key={t.id} className="tpl-card" onClick={() => t.clickable && onPickTemplate(t)}>
            <div className="tpl-head" style={{ background: t.grad }}>
              <div className="tpl-cat"><Icon name={t.icon} size={15} color="#fff" /></div>
              {t.partners.length > 0 && (
                <div className="tpl-partner-count">{t.partners.length} partner</div>
              )}
            </div>
            <div className="tpl-body">
              <div className="tpl-name">{t.name}</div>
              <div className="tpl-desc">{t.desc}</div>
              <div className="tpl-partners">
                {t.partners.slice(0, 3).map(p => (
                  <span key={p} className="tpl-partner">{p}</span>
                ))}
              </div>
              <div className="tpl-bottom">
                <span className="tpl-range">{t.range}</span>
                <Icon name="arrow-right" size={16} color="var(--sky)" />
              </div>
            </div>
          </div>
        ))}
        {/* Custom card */}
        <div className="tpl-card custom" onClick={() => onPickTemplate({ id: 'custom', name: 'Custom', icon: 'plus', grad: 'linear-gradient(135deg, #4A5568 0%, #9A9A9A 100%)', desc: '', partners: [], range: '' })}>
          <div className="center">
            <Icon name="plus-circle" size={28} color="var(--mute)" />
            <div className="nm">Buat dari awal</div>
            <div className="sub">Tanpa template</div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.ScreenTemplateGallery = ScreenTemplateGallery;


// =====================================================
// SCREEN 8 — TEMPLATE DETAIL
// =====================================================
function ScreenTemplateDetail({ onBack, onContinue }) {
  const [targetIdx, setTargetIdx] = useS3(1);
  const [triggers, setTriggers] = useS3([true, true, false, false]);
  const [showMore, setShowMore] = useS3(false);
  useE3(() => { window.refreshIcons(); }, [showMore, triggers, targetIdx]);

  const targets = [
    { v: 'Rp 30.000.000', tag: 'Budget' },
    { v: 'Rp 65.000.000', tag: 'Rekomendasi' },
    { v: 'Rp 120.000.000', tag: 'Premium' },
  ];
  const triggerDefs = [
    { nm: 'Saat Gajian', ds: 'Setiap tanggal 25', timing: 'Hari 25' },
    { nm: 'Round-Up QRIS', ds: 'Setiap transaksi QRIS', timing: 'Per transaksi' },
    { nm: 'Bonus & THR', ds: 'Deteksi transfer di atas Rp 5jt', timing: '' },
    { nm: 'Manual', ds: 'Atur sendiri kapan mau menabung', timing: '' },
  ];
  const partners = [
    { stripe: 'var(--sky)', logo: 'tiket', logoColor: 'var(--sky)', nm: 'tiket.com',
      offer: 'Diskon tiket penerbangan internasional',
      cond: 'Poket 50%+, min. pembelian Rp 2jt',
      val: '5%', un: 'per booking' },
    { stripe: 'var(--navy)', logo: 'GA', logoColor: 'var(--navy)', nm: 'Garuda Indonesia',
      offer: 'Priority boarding + extra baggage 10kg',
      cond: 'Poket 75%+, via aplikasi Garuda',
      val: '10kg', un: 'gratis' },
    { stripe: '#00AA5B', logo: 'toped', logoColor: '#00AA5B', nm: 'Tokopedia Travel',
      offer: 'Cashback pemesanan hotel dan tur',
      cond: 'Poket aktif, min. transaksi Rp 1,5jt',
      val: '8%', un: 'cashback' },
  ];
  const morePartners = [
    { stripe: '#D7263D', logo: 'halo', logoColor: '#D7263D', nm: 'Halodoc',
      offer: 'Konsultasi dokter umum gratis',
      cond: '1x per bulan, Poket aktif 30 hari+',
      val: '1x', un: 'gratis' },
    { stripe: 'var(--navy)', logo: 'KPR', logoColor: 'var(--navy)', nm: 'KPR BCA',
      offer: 'Potongan biaya provisi KPR',
      cond: 'Poket KPR DP aktif',
      val: 'Rp 5jt', un: 'diskon' },
    { stripe: '#5B0F8F', logo: 'mits', logoColor: '#5B0F8F', nm: 'Mitsubishi',
      offer: 'Free accessories package',
      cond: 'Poket Kendaraan 80%+',
      val: 'Rp 3jt', un: 'value' },
    { stripe: 'var(--sky)', logo: 'BCAS', logoColor: 'var(--sky)', nm: 'BCA Sekuritas',
      offer: 'Bebas biaya pembukaan rekening',
      cond: 'Poket Investasi aktif',
      val: '100%', un: 'gratis' },
  ];

  return (
    <div className="screen-content" data-screen-label="08 Detail Template">
      <NavHeader
        title="Liburan Eropa"
        onBack={onBack}
        right={<span className="step-pill">2 / 3</span>}
      />

      <div className="tpl-hero">
        <div className="ic"><Icon name="plane" size={22} color="rgba(255,255,255,0.85)" /></div>
        <div className="nm">Liburan Eropa 2027</div>
        <div className="sb">Wujudkan perjalanan impian ke benua Eropa</div>
      </div>

      <div className="target-section">
        <div className="lbl">Target yang Disarankan</div>
        <div className="target-opts">
          {targets.map((t, i) => (
            <button
              key={i}
              className={'target-opt ' + (i === targetIdx ? 'active' : '')}
              onClick={() => setTargetIdx(i)}
            >
              <span className="amt">{t.v}</span>
              <span className="tag">{t.tag}</span>
            </button>
          ))}
        </div>
        <div className="ctx">
          <Icon name="info" size={12} color="var(--mute)" />
          <span>Estimasi biaya 14 hari 2 orang, termasuk tiket dan hotel</span>
        </div>
      </div>

      <div className="trigger-section">
        <div className="lbl">Kapan Kamu Akan Menabung?</div>
        {triggerDefs.map((t, i) => (
          <div key={i} className="trigger-row">
            <div
              className={'toggle-switch ' + (triggers[i] ? 'on' : '')}
              onClick={() => setTriggers(triggers.map((v, j) => j === i ? !v : v))}
            ></div>
            <div className="body">
              <div className="nm">{t.nm}</div>
              <div className="ds">{t.ds}</div>
            </div>
            {triggers[i] && t.timing && <div className="timing">{t.timing}</div>}
          </div>
        ))}
      </div>

      <div className="section-row" style={{ paddingTop: 16 }}>
        <span className="section-label">Keuntungan Eksklusif Partner</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: 'var(--sky)' }}>
          Aktif saat target tercapai
        </span>
      </div>

      <div className="partner-intro">
        <Icon name="zap" size={13} color="var(--sky)" />
        <span>Partner BCA memberikan diskon real-time saat target Poket kamu terpenuhi. Tidak ada kode promo, sistem otomatis terhubung ke aplikasi partner.</span>
      </div>

      {partners.map((p, i) => (
        <PartnerCard key={i} {...p} />
      ))}

      <button
        className={'show-more-link ' + (showMore ? 'open' : '')}
        onClick={() => setShowMore(!showMore)}
      >
        <span>{showMore ? 'Sembunyikan partner lainnya' : 'Lihat 4 partner lainnya'}</span>
        <Icon name="chevron-down" size={16} color="var(--sky)" />
      </button>

      <div className={'partner-more ' + (showMore ? 'open' : '')}>
        {morePartners.map((p, i) => (
          <PartnerCard key={i} {...p} />
        ))}
      </div>

      <div className="sim-card">
        <div className="h">
          <span className="l">Simulasi Trigger Real-Time</span>
          <Icon name="activity" size={14} color="var(--sky)" />
        </div>
        <div className="sub">Begini cara trigger API bekerja saat kamu bertransaksi</div>
        <div className="sim-row">
          <div className="ic"><Icon name="shopping-cart" size={13} color="var(--sky)" /></div>
          <div className="txt">QRIS Tokopedia Rp 87.500 terdeteksi</div>
          <span className="auto">Round-up Rp 2.500</span>
        </div>
        <div className="sim-row">
          <div className="ic"><Icon name="trending-up" size={13} color="var(--sky)" /></div>
          <div className="txt">Gajian Rp 15.000.000 masuk (tgl 25)</div>
          <span className="auto">Kunci Rp 3.000.000</span>
        </div>
        <div className="sim-row">
          <div className="ic"><Icon name="zap" size={13} color="var(--sky)" /></div>
          <div className="txt">Saldo Poket 75%, tiket.com terhubung</div>
          <span className="auto">Diskon aktif</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px 8px' }}>
        <button className="btn-primary" onClick={onContinue}>
          <span>Lanjut, Sesuaikan Detail Poket</span>
          <Icon name="arrow-right" size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}
window.ScreenTemplateDetail = ScreenTemplateDetail;

function PartnerCard({ stripe, logo, logoColor, nm, offer, cond, val, un }) {
  return (
    <div className="partner-card">
      <div className="stripe" style={{ background: stripe }}></div>
      <div className="pc-body">
        <div className="partner-logo" style={{ color: logoColor }}>{logo}</div>
        <div className="partner-content">
          <div className="nm">{nm}</div>
          <div className="offer">{offer}</div>
          <span className="partner-condition">{cond}</span>
        </div>
        <div className="partner-discount">
          <span className="val">{val}</span>
          <span className="un">{un}</span>
        </div>
      </div>
    </div>
  );
}


// =====================================================
// SCREEN 9 — CUSTOMIZE & CONFIRM
// =====================================================
function ScreenCustomize({ onBack, onCreate }) {
  const [name, setName] = useS3('Liburan Eropa 2027');
  const [amount, setAmount] = useS3(65000000);
  const [deadlineIdx, setDeadlineIdx] = useS3(2);
  const [lockIdx, setLockIdx] = useS3(1);
  const [joint, setJoint] = useS3(false);
  const [invited, setInvited] = useS3(false);
  const [loading, setLoading] = useS3(false);

  useE3(() => { window.refreshIcons(); }, [joint, invited, lockIdx, deadlineIdx, loading]);

  const deadlines = ['6 bulan', '1 tahun', '2 tahun', 'Pilih tanggal'];
  const locks = [
    { ic: 'unlock', nm: 'Fleksibel', ds: 'Bisa ditarik kapan saja', chip: 'Risiko tarik', cls: 'warn' },
    { ic: 'lock', nm: 'Standar', ds: 'Cooling-off 24 jam dan OTP', chip: 'Disarankan', cls: 'rec' },
    { ic: 'shield-alert', nm: 'Kunci Keras', ds: 'Biometrik dan ATR, tidak bisa dipaksa', chip: 'Paling aman', cls: 'safe' },
  ];

  const handleCreate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onCreate();
    }, 1300);
  };

  return (
    <div className="screen-content" data-screen-label="09 Kustomisasi">
      <NavHeader
        title="Detail Poket"
        onBack={onBack}
        right={<span className="step-pill">3 / 3</span>}
      />

      <div className="form-block">
        <div className="form-label">Nama Poket</div>
        <div className="text-input">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <Icon name="edit-2" size={14} color="var(--mute)" />
        </div>
      </div>

      <div className="form-block">
        <div className="form-label">Target Tabungan</div>
        <div className="text-input" style={{ height: 56 }}>
          <span className="pre">Rp</span>
          <span style={{ flex: 1, fontFamily: 'Poppins', fontWeight: 600, fontSize: 20 }}>
            {new Intl.NumberFormat('id-ID').format(amount)}
          </span>
          <Icon name="edit-2" size={14} color="var(--mute)" />
        </div>
        <div className="slider-row">
          <input
            type="range"
            min="10000000" max="200000000" step="5000000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="range-slider"
          />
          <div className="range-bounds">
            <span>Rp 10jt</span>
            <span>Rp 200jt</span>
          </div>
        </div>
      </div>

      <div className="form-block">
        <div className="form-label">Target Waktu</div>
        <div className="pill-row">
          {deadlines.map((d, i) => (
            <button
              key={d}
              className={'date-pill ' + (i === deadlineIdx ? 'active' : '')}
              onClick={() => setDeadlineIdx(i)}
            >{d}</button>
          ))}
        </div>
      </div>

      <div className="form-block">
        <div className="form-label">
          Kekuatan Kunci
          <Icon name="info" size={12} color="var(--mute)" />
        </div>
        <div className="lock-card">
          {locks.map((l, i) => (
            <div key={i} className="lock-row" onClick={() => setLockIdx(i)}>
              <div className={'radio ri ' + (i === lockIdx ? 'selected' : '')}></div>
              <div className="ic">
                <Icon name={l.ic} size={18} color={i === lockIdx ? 'var(--navy)' : 'var(--mute)'} />
              </div>
              <div className="body">
                <div className="nm">{l.nm}</div>
                <div className="ds">{l.ds}</div>
              </div>
              <span className={'risk-chip ' + l.cls}>{l.chip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={'joint-card ' + (joint ? 'on' : '')}>
        <div className="top">
          <div className="lt">
            <Icon name="users" size={18} color="var(--navy)" />
            <span className="nm">Joint Dream Poket</span>
          </div>
          <div className={'toggle-switch ' + (joint ? 'on' : '')} onClick={() => setJoint(!joint)}></div>
        </div>
        <div className="desc">Nabung bersama pasangan atau keluarga. Kontribusi dari dua rekening, satu tujuan.</div>

        <div className="joint-expand">
          <div className="form-label">Undang Penabung Kedua</div>
          <div className="text-input" style={{ marginTop: 8, height: 42 }}>
            <Icon name="search" size={14} color="var(--mute)" />
            <input placeholder="Cari nama atau nomor BCA..." style={{ fontWeight: 400, fontSize: 13 }} />
          </div>

          <div className="invite-suggest">
            <div className="av">RN</div>
            <div className="body">
              <div className="nm">Rendy Nugraha</div>
              <div className="sb">016-XXXXX-XX, BCA</div>
            </div>
            <button className={'invite-btn ' + (invited ? 'sent' : '')} onClick={() => setInvited(true)}>
              {invited ? <><Icon name="check" size={12} color="var(--green)" />Terkirim</> : 'Undang'}
            </button>
          </div>

          <div className="contrib-split">
            <div className="lbl">Proporsi Kontribusi</div>
            <div className="contrib-display">
              <div className="side">
                <div className="nm">Kamu</div>
                <div className="pct">60%</div>
              </div>
              <Icon name="arrow-left-right" size={16} color="var(--mute)" />
              <div className="side">
                <div className="nm">Rendy</div>
                <div className="pct gold">40%</div>
              </div>
            </div>
            <div className="contrib-bar">
              <div className="a" style={{ width: '60%' }}></div>
              <div className="b" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-card">
        <div className="h">Ringkasan Poket Kamu</div>
        <div className="kv" style={{ marginTop: 8 }}><span className="k">Nama</span><span className="v">{name}</span></div>
        <div className="kv"><span className="k">Target</span><span className="v">Rp {new Intl.NumberFormat('id-ID').format(amount)}</span></div>
        <div className="kv"><span className="k">Selesai</span><span className="v">30 Des 2027</span></div>
        <div className="kv"><span className="k">Joint</span><span className="v">{joint ? 'Ya, 2 penabung' : 'Tidak'}</span></div>
        <div className="va-prev">
          <span>Nomor VA akan dibuat otomatis</span>
          <Icon name="zap" size={14} color="var(--gold)" />
        </div>
      </div>

      <button className="create-btn" onClick={handleCreate} disabled={loading}>
        {loading
          ? <><span className="spin"><Icon name="loader" size={16} color="#1A1A2E" /></span>Membuat Poket...</>
          : <>Buat Poket Sekarang<Icon name="arrow-right" size={16} color="#1A1A2E" /></>}
      </button>
      <div className="vanote">Nomor VA aktif dalam 1x24 jam kerja</div>
    </div>
  );
}
window.ScreenCustomize = ScreenCustomize;
