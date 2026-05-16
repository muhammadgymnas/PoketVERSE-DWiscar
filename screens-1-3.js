/* global React, Icon, AppHeader, NavHeader, SectionRow, ProgressBar, CountUp, fmtIDR */
// Screens 1-3: Beranda, Poket List, Poket Detail

const { useState: useS1, useEffect: useE1, useRef: useR1 } = React;

// =====================================================
// SCREEN 1 — BERANDA
// =====================================================
function ScreenBeranda({ onOpenPoket, onOpenList, onOpenWave, onOpenQris, onCreateNew }) {
  const [hidden, setHidden] = useS1(false);

  // Animate progress bars on mount via ref-less approach (using ProgressBar)
  useE1(() => { window.refreshIcons(); });

  return (
    <div className="screen-content" data-screen-label="01 Beranda">
      <AppHeader />

      <div className="greeting">
        <div className="hi">Selamat pagi, <b>Mira</b></div>
        <div className="acc">016-XXXXX-XX</div>
      </div>

      <div className="balance-card">
        <div className="row">
          <span className="lbl">Tabungan Utama</span>
          <button className="eye" onClick={() => setHidden(!hidden)}>
            <Icon name={hidden ? 'eye-off' : 'eye'} size={16} color="rgba(255,255,255,0.75)" />
          </button>
        </div>
        <div className="amount">{hidden ? 'Rp \u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : 'Rp 24.750.000'}</div>
        <div className="accnum">016-123-456-7</div>
        <div className="actions">
          {[
            { i: 'send', l: 'Transfer' },
            { i: 'wallet', l: 'Bayar' },
            { i: 'qr-code', l: 'QRIS' },
            { i: 'grid-2x2', l: 'Lainnya' },
          ].map(a => (
            <button key={a.l} className="qa">
              <span className="qa-icon"><Icon name={a.i} size={18} color="#fff" /></span>
              <span>{a.l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* POKET SAYA */}
      <SectionRow label="Poket Saya" action="Lihat semua" onAction={onOpenList} />

      <div className="poket-scroll">
        <PoketCard
          onClick={onOpenPoket}
          cat="plane"
          locked
          title="Liburan Eropa 2027"
          amount="Rp 42.000.000"
          target="dari Rp 100jt"
          pct={42}
          va="3901-7842-9301"
          tone="sky"
        />
        <PoketCard
          cat="shield"
          locked
          title="Dana Darurat"
          amount="Rp 15.250.000"
          target="dari Rp 20jt"
          pct={76}
          va="3901-7842-1155"
          tone="green"
          amountTone="green"
        />
        <PoketCard
          cat="home"
          title="KPR Down Payment"
          amount="Rp 11.500.000"
          target="dari Rp 50jt"
          pct={23}
          va="3901-7842-4477"
          tone="sky"
        />
        <button className="poket-card add" onClick={onCreateNew}>
          <Icon name="plus" size={20} color="var(--mute)" />
          <span>Buat Poket Baru</span>
        </button>
      </div>

      {/* SMART NOTIFICATION TRIGGER */}
      <div className="smart-banner" onClick={onOpenWave}>
        <div className="hdr">
          <Icon name="bell-ring" size={16} color="var(--gold)" />
          <span>Notifikasi Cerdas</span>
        </div>
        <div className="msg">Rp 5.000.000 masuk ke rekening kamu.</div>
        <div className="sub">Kunci 20% ke Poket Liburan sekarang?</div>
        <div className="acts">
          <button className="btn-prim" onClick={(e) => { e.stopPropagation(); onOpenWave(); }}>Kunci Sekarang</button>
          <button className="btn-sec" onClick={(e) => e.stopPropagation()}>Nanti</button>
        </div>
      </div>

      {/* SERVICES */}
      <SectionRow label="Layanan Lainnya" />
      <div className="svc-grid">
        {[
          { i: 'trending-up', l: 'Investasi' },
          { i: 'credit-card', l: 'Kredit' },
          { i: 'shield-check', l: 'Asuransi' },
          { i: 'hand-coins', l: 'Pinjaman' },
          { i: 'shopping-bag', l: 'Lifestyle' },
          { i: 'heart-handshake', l: 'Donasi' },
        ].map(s => (
          <button key={s.l} className="svc-chip">
            <Icon name={s.i} size={22} color="var(--sky)" />
            <span>{s.l}</span>
          </button>
        ))}
      </div>

      <div className="citation" style={{ paddingTop: 24 }}>
        &sup1; Thaler &amp; Benartzi (2004), JPE &middot; &sup2; Ashraf, Karlan, Yin (2006), QJE &middot; &sup3; Bank Jago Syariah, Des 2024
      </div>
    </div>
  );
}
window.ScreenBeranda = ScreenBeranda;

function PoketCard({ onClick, cat, locked, title, amount, target, pct, va, tone, amountTone }) {
  return (
    <div className="poket-card" onClick={onClick}>
      <div className="top">
        <div className="cat">
          <Icon name={cat} size={18} color={tone === 'green' ? 'var(--green)' : 'var(--sky)'} />
        </div>
        {locked && (
          <span className="lock"><Icon name="lock" size={14} color="var(--green)" /></span>
        )}
      </div>
      <div className="pc-title">{title}</div>
      <div className={'pc-amount ' + (amountTone || '')}>{amount}</div>
      <ProgressBar pct={pct} tone={tone} delay={150} />
      <div className="progress-label">
        <span className={'pct ' + (tone === 'green' ? 'green' : '')}>{pct}%</span>
        <span className="of">{target}</span>
      </div>
      <span className="va-pill">
        <Icon name="building-2" size={12} color="#fff" />
        <span>VA: {va}</span>
      </span>
    </div>
  );
}

// =====================================================
// SCREEN 2 — POKET LIST
// =====================================================
function ScreenPoketList({ onBack, onOpenPoket, onCreateNew }) {
  const [filter, setFilter] = useS1('semua');
  useE1(() => { window.refreshIcons(); });

  const all = [
    { id: 'liburan', t: 'Liburan Eropa 2027', i: 'plane', tone: 'sky', cur: 42000000, tar: 100000000, pct: 42, locked: true,  va: '3901-7842-9301' },
    { id: 'darurat', t: 'Dana Darurat',       i: 'shield', tone: 'green', cur: 15250000, tar: 20000000, pct: 76, locked: true,  va: '3901-7842-1155' },
    { id: 'kpr',     t: 'KPR Down Payment',   i: 'home', tone: 'sky', cur: 11500000, tar: 50000000, pct: 23, locked: false, va: '3901-7842-4477' },
    { id: 'edu',     t: 'Pendidikan Anak',    i: 'graduation-cap', tone: 'sky', cur: 18300000, tar: 30000000, pct: 61, locked: true,  va: '3901-7842-2266' },
    { id: 'gadget',  t: 'Gadget',             i: 'smartphone', tone: 'sky', cur: 4320000, tar: 8000000, pct: 54, locked: false, va: '3901-7842-3388' },
  ];

  const rows = filter === 'semua' ? all : filter === 'aktif' ? all.filter(r => !r.locked) : all.filter(r => r.locked);

  return (
    <div className="screen-content" data-screen-label="02 Poket Rupiah">
      <NavHeader
        title="Poket Rupiah"
        onBack={onBack}
        right={<button className="icon-btn" onClick={onCreateNew}><Icon name="plus" size={20} color="var(--navy)" /></button>}
      />

      <div className="summary-strip">
        <div className="cell"><div className="l">Poket Aktif</div><div className="v">5</div></div>
        <div className="cell"><div className="l">Total Tabungan</div><div className="v">Rp 91,3jt</div></div>
        <div className="cell"><div className="l">Terkunci</div><div className="v">3</div></div>
      </div>

      <div className="filter-row">
        <span className="label">Urutkan:</span>
        {['semua', 'aktif', 'terkunci'].map(k => (
          <button
            key={k}
            className={'chip ' + (filter === k ? 'active' : '')}
            onClick={() => setFilter(k)}
          >{k === 'semua' ? 'Semua' : k === 'aktif' ? 'Aktif' : 'Terkunci'}</button>
        ))}
      </div>

      <div className="poket-list">
        {rows.map(r => (
          <div key={r.id} className="poket-row" onClick={r.id === 'liburan' ? onOpenPoket : undefined}>
            <div className="icon"><Icon name={r.i} size={20} color={r.tone === 'green' ? 'var(--green)' : 'var(--sky)'} /></div>
            <div className="body">
              <div className="row-title">{r.t}</div>
              <div className="bar">
                <div className={r.tone === 'green' ? 'g' : 's'} style={{ background: r.tone === 'green' ? 'var(--green)' : 'var(--sky)', width: r.pct + '%' }}></div>
              </div>
              <div className="sub">{fmtIDR(r.cur)} dari {fmtIDR(r.tar)} &middot; {r.pct}%</div>
            </div>
            <div className="right">
              <span className="va-chip">VA</span>
              <Icon name={r.locked ? 'lock' : 'unlock'} size={14} color={r.locked ? 'var(--green)' : 'var(--mute)'} />
              <span className="chev"><Icon name="chevron-right" size={16} color="var(--mute)" /></span>
            </div>
          </div>
        ))}
      </div>

      <div className="citation">
        &sup1; Bank Jago Syariah Pocket data, Des 2024 &middot; &sup2; Konsep VA: BCA BI-FAST documentation
      </div>

      <div className="bottom-cta">
        <button className="btn-primary" onClick={onCreateNew}>
          <Icon name="plus" size={16} color="#fff" />
          Buat Poket Baru
        </button>
      </div>
    </div>
  );
}
window.ScreenPoketList = ScreenPoketList;

// =====================================================
// SCREEN 3 — POKET DETAIL
// =====================================================
function ScreenPoketDetail({ onBack, onOpenWave, onAskAI, onOpenJoint, showCreatedToast, clearToast }) {
  const [copied, setCopied] = useS1(false);
  useE1(() => { window.refreshIcons(); });
  useE1(() => {
    if (showCreatedToast && clearToast) {
      const t = setTimeout(() => clearToast(), 2700);
      return () => clearTimeout(t);
    }
  }, [showCreatedToast]);

  const copyVA = () => {
    setCopied(true);
    try { navigator.clipboard && navigator.clipboard.writeText('3901-7842-9301'); } catch (e) {}
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="screen-content" data-screen-label="03 Detail Poket">
      <NavHeader
        title="Liburan Eropa 2027"
        onBack={onBack}
        right={<button className="icon-btn"><Icon name="more-horizontal" size={20} color="var(--navy)" /></button>}
      />

      {showCreatedToast && (
        <div style={{ padding: '10px 0 0' }}>
          <div className="success-toast">
            <Icon name="check-circle-2" size={16} color="#fff" />
            <span>Poket berhasil dibuat. Nomor VA sedang diaktifkan.</span>
          </div>
        </div>
      )}

      <div className="poket-hero">
        <div className="tag-row">
          <span className="tag sky">
            <Icon name="plane" size={12} color="#5EC6F0" />
            Liburan
          </span>
          <span className="tag green">
            <Icon name="lock" size={12} color="#4FD884" />
            Terkunci
          </span>
        </div>

        <div className="hero-amount">Rp 42.000.000</div>
        <div className="hero-target">dari Rp 100.000.000</div>

        <div className="hero-progress">
          <div className="track" style={{ background: 'rgba(255,255,255,0.14)' }}>
            <div className="fill" ref={(el) => { if (el) setTimeout(() => el.style.width = '42%', 200); }}></div>
          </div>
          <div className="lbl">
            <span className="l">42% tercapai</span>
            <span className="r">Sisa Rp 58.000.000</span>
          </div>
        </div>

        <div className="va-box">
          <div className="top">
            <Icon name="building-2" size={14} color="var(--gold)" />
            <span>Nomor Rekening Virtual</span>
          </div>
          <div className="num-row">
            <span className="va-number">3901-7842-9301</span>
            <button className={'copy-btn ' + (copied ? 'copied' : '')} onClick={copyVA}>
              <Icon name={copied ? 'check' : 'copy'} size={16} color={copied ? 'var(--green)' : 'var(--gold)'} />
            </button>
          </div>
          <div className="va-proofs">
            <span className="va-proof"><Icon name="check" size={11} color="var(--green)" />Terima transfer BI-FAST</span>
            <span className="va-proof"><Icon name="check" size={11} color="var(--green)" />Berlaku seperti rekening nyata</span>
            <span className="va-proof"><Icon name="check" size={11} color="var(--green)" />Biometrik untuk membuka</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-cell"><div className="l">Total Tabungan</div><div className="v">Rp 42.000.000</div></div>
        <div className="stat-cell"><div className="l">Mulai Nabung</div><div className="v">15 Jan 2025</div></div>
        <div className="stat-cell"><div className="l">Target</div><div className="v">Rp 100.000.000</div></div>
        <div className="stat-cell"><div className="l">Sisa Hari</div><div className="v">595 hari</div></div>
      </div>

      <div className="cross-sell">
        <div className="h">
          <Icon name="zap" size={14} color="var(--gold)" />
          <span>Karena punya Poket ini, kamu dapat:</span>
        </div>
        <div className="offer">
          <Icon name="arrow-right" size={12} color="var(--sky)" />
          <span>Tiket.com diskon 5% untuk pembelian di atas Rp 2.000.000</span>
        </div>
        <div className="offer">
          <Icon name="arrow-right" size={12} color="var(--sky)" />
          <span>Garuda Indonesia priority check-in saat booking via BCA</span>
        </div>
        <button className="more">Lihat semua penawaran</button>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          <button className="ai-chip" onClick={onAskAI}>
            <span className="mini"><img src="assets/caca.png" alt="" /></span>
            <span>Tanya AI Asisten</span>
            <Icon name="arrow-right" size={14} color="var(--navy)" />
          </button>
          <button className="ai-chip" onClick={onOpenJoint} style={{ background: 'linear-gradient(135deg, rgba(0,153,216,0.10), rgba(0,96,175,0.12))' }}>
            <Icon name="users" size={14} color="var(--navy)" />
            <span>Joint Poket</span>
          </button>
        </div>
      </div>

      <div className="cta-stack">
        <button className="btn-primary">
          <Icon name="plus" size={16} color="#fff" />
          Tambah Dana
        </button>
        <button className="btn-secondary" onClick={onOpenWave}>
          <Icon name="clock" size={16} color="var(--navy)" />
          Riwayat Transaksi
        </button>
      </div>

      <div className="citation">
        &sup1; Thaler &amp; Benartzi (2004), JPE &middot; &sup2; Ashraf, Karlan, Yin (2006), QJE &middot; &sup3; Bank Jago Syariah, Des 2024
      </div>
    </div>
  );
}
window.ScreenPoketDetail = ScreenPoketDetail;
