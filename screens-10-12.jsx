/* global React, Icon, NavHeader */
// Screens 10-12: Joint Poket, AI Character Select, AI Chat

const { useState: useS4, useEffect: useE4, useRef: useR4 } = React;

// =====================================================
// SCREEN 10 — JOINT DREAM POKET (Shared View)
// =====================================================
function ScreenJointPoket({ onBack }) {
  const miraBarRef = useR4(null);
  const rendyBarRef = useR4(null);
  const miraContribRef = useR4(null);
  const rendyContribRef = useR4(null);
  const milestoneRef = useR4(null);

  useE4(() => {
    window.refreshIcons();
    setTimeout(() => {
      if (miraBarRef.current) miraBarRef.current.style.width = '32.3%';
      if (rendyBarRef.current) rendyBarRef.current.style.width = '22.9%';
      if (miraContribRef.current) miraContribRef.current.style.width = '70%';
      if (rendyContribRef.current) rendyContribRef.current.style.width = '45%';
      if (milestoneRef.current) milestoneRef.current.style.width = '91%';
    }, 200);
  }, []);

  const activities = [
    { who: 'Mira', actor: 'sky', dot: 'sky', act: 'menabung Rp 5.000.000', when: '2 jam lalu' },
    { who: 'Rendy', actor: 'navy', dot: 'gold', act: 'menabung Rp 3.500.000', when: 'kemarin' },
    { who: 'Mira', actor: 'sky', dot: 'sky', act: 'mengaktifkan Round-Up', when: '3 hari lalu' },
    { who: 'Rendy', actor: 'navy', dot: 'gold', act: 'bergabung sebagai penabung kedua', when: '15 Jan' },
    { who: 'Mira', actor: 'sky', dot: 'sky', act: 'membuat Poket ini', when: '15 Jan' },
  ];

  return (
    <div className="screen-content" data-screen-label="10 Joint Poket">
      <NavHeader
        title="Joint Dream Poket"
        onBack={onBack}
        right={<button className="icon-btn"><Icon name="users" size={18} color="var(--sky)" /></button>}
      />

      <div className="joint-hero">
        <div className="nm">Liburan Eropa 2027</div>
        <div className="sb">2 penabung, aktif sejak 15 Jan 2025</div>
        <div className="amt">Rp 71.800.000</div>
        <div className="tg">dari Rp 130.000.000 (2 penabung)</div>
        <div className="joint-bar">
          <div ref={miraBarRef} className="a" style={{ width: 0 }}></div>
          <div ref={rendyBarRef} className="b" style={{ width: 0 }}></div>
        </div>
        <div className="joint-chips">
          <span className="c sky">Mira 32%</span>
          <span className="c gold">Rendy 23%</span>
        </div>
      </div>

      <div className="contrib-section">
        <div className="lbl">Kontribusi Masing-Masing</div>
        <div className="contrib-row">
          <div className="av sky">MR</div>
          <div className="body">
            <div className="nm">Mira</div>
            <div className="pb"><div ref={miraContribRef} style={{ background: 'var(--sky)', width: 0 }}></div></div>
            <div className="sub">Rp 42.000.000, 60% alokasi</div>
          </div>
          <div className="st online"><span className="dot"></span><span>Aktif</span></div>
        </div>
        <div className="contrib-row">
          <div className="av navy">RN</div>
          <div className="body">
            <div className="nm">Rendy</div>
            <div className="pb"><div ref={rendyContribRef} style={{ background: 'var(--gold)', width: 0 }}></div></div>
            <div className="sub">Rp 29.800.000, 40% alokasi</div>
          </div>
          <div className="st offline"><span className="dot"></span><span>2 hr lalu</span></div>
        </div>
      </div>

      <div className="activity-section">
        <div className="lbl">Aktivitas Terbaru</div>
        <div className="timeline-list">
          {activities.map((a, i) => (
            <div key={i} className="timeline-item">
              <div className={'dot ' + a.dot}></div>
              <div className="body">
                <span className={'actor ' + a.actor}>{a.who} </span>
                <span className="act">{a.act}</span>
                <div className="when">{a.when}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="milestone-card">
        <div className="h">
          <Icon name="target" size={16} color="var(--sky)" />
          <span className="t">Milestone berikutnya</span>
        </div>
        <div className="ms">Capai 60% bersama, tiket.com diskon aktif</div>
        <div className="pct-row">
          <span className="v">54,8%</span>
          <span className="of">dari 60%</span>
        </div>
        <div className="pb"><div ref={milestoneRef} style={{ width: 0 }}></div></div>
      </div>

      <div className="joint-actions" style={{ marginBottom: 8 }}>
        <button className="btn-primary">Tambah Dana</button>
        <button className="btn-secondary">
          <Icon name="message-circle" size={14} color="var(--text)" />
          Kirim Pesan
        </button>
      </div>
    </div>
  );
}
window.ScreenJointPoket = ScreenJointPoket;


// =====================================================
// SCREEN 11 — AI CHARACTER SELECT
// =====================================================
function ScreenAIChar({ onBack, selected, onSelect, onContinue }) {
  useE4(() => { window.refreshIcons(); }, [selected]);

  const chars = {
    caca: {
      name: 'Caca', img: 'assets/caca.png',
      tag: 'Analitik, Teliti', tagCls: '',
      pers: 'Memberikan insight berbasis data',
      traits: [
        { i: 'bar-chart-3', t: 'Data-driven' },
        { i: 'target', t: 'Goal-oriented' },
        { i: 'brain', t: 'Insightful' },
      ],
      level: 'Level 2, Penabung Aktif',
      xp: '650 / 1000 XP',
      previewLine: 'Caca siap menemani perjalanan nabungmu dengan analisis tajam',
    },
    miko: {
      name: 'Miko', img: 'assets/miko.png',
      tag: 'Motivatif, Santai', tagCls: 'gold',
      pers: 'Menyemangati kamu terus menabung',
      traits: [
        { i: 'zap', t: 'Energik' },
        { i: 'smile', t: 'Supportif' },
        { i: 'trending-up', t: 'Optimistis' },
      ],
      level: 'Level 2, Sahabat Nabung',
      xp: '720 / 1000 XP',
      previewLine: 'Miko akan menyemangati kamu setiap langkah perjalanan',
    },
  };

  const cur = chars[selected];

  return (
    <div className="screen-content" data-screen-label="11 Pilih Asisten AI">
      <NavHeader
        title="AI Asisten"
        onBack={onBack}
        right={<button className="icon-btn" onClick={onBack}><Icon name="x" size={20} color="var(--navy)" /></button>}
      />

      <div className="ai-intro">
        <div className="t">Kenali asisten nabungmu</div>
        <div className="s">Pilih karakter yang menemani perjalanan finansial kamu</div>
      </div>

      <div className="char-grid">
        {['caca', 'miko'].map(k => {
          const c = chars[k];
          return (
            <div key={k} className={'char-card ' + (selected === k ? 'active' : '')} onClick={() => onSelect(k)}>
              <div className="face">
                <img src={c.img} alt={c.name} />
              </div>
              <div className="nm">{c.name}</div>
              <div className={'tag ' + c.tagCls}>{c.tag}</div>
              <div className="pers">{c.pers}</div>
              <div className="xp-row">
                <div className="level">{c.level}</div>
                <div className="xp-bar"><div></div></div>
                <div className="xp-num">{c.xp}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="traits">
        {cur.traits.map(t => (
          <span key={t.t} className="trait-chip">
            <Icon name={t.i} size={12} color="var(--sky)" />
            <span>{t.t}</span>
          </span>
        ))}
      </div>

      <div className="char-preview">
        <div className="mini"><img src={cur.img} alt={cur.name} /></div>
        <div className="tx">{cur.previewLine}</div>
      </div>

      <div className="char-cta">
        <button className="btn-primary" style={{ height: 50, fontSize: 15 }} onClick={onContinue}>
          Mulai dengan {cur.name}
        </button>
        <button className="later">Pilih nanti</button>
      </div>
    </div>
  );
}
window.ScreenAIChar = ScreenAIChar;


// =====================================================
// SCREEN 12 — AI CHAT (Scripted)
// =====================================================
const AI_SCRIPT = [
  { role: 'ai', delay: 200, text: 'Hai! Aku {NAME}, asisten nabungmu. Aku sudah baca kondisi keuangan kamu, boleh aku mulai dengan satu insight penting?' },
  { role: 'user', delay: 1600, text: 'Boleh, kasih tau!' },
  { role: 'ai', delay: 2800, typing: 1100,
    text: 'Pengeluaran kopi kamu bulan ini Rp 420.000, 2,1x lebih tinggi dari bulan lalu. Kalau dikurangi jadi Rp 200.000, kamu bisa tambah Rp 220.000 ke Poket Liburan. Itu 0,4% progress langsung.',
    card: 'kopi' },
  { role: 'user', delay: 4900, text: 'Wah bisa segitu. Ada lagi?' },
  { role: 'ai', delay: 5900, typing: 900,
    text: 'Ada. Kamu punya 3 trigger aktif tapi Round-Up belum dimaksimalkan. Kalau transaksi QRIS kamu rata-rata 14 kali sebulan dengan round-up Rp 2.500 per transaksi, itu Rp 35.000 tambahan otomatis tanpa kerasa.' },
  { role: 'user', delay: 7500, text: 'Oke aktifin aja semuanya' },
  { role: 'ai', delay: 8400, typing: 700,
    text: 'Siap! Aku aktifkan sekarang. Dan satu hal lagi, kamu hampir bisa unlock diskon tiket.com 5% saat Poket kamu capai 50%. Tinggal Rp 8.000.000 lagi. Mau aku buatkan plan mingguan?',
    chips: ['Ya, buat plannya', 'Berapa lama?', 'Lihat progress'] },
];

function ScreenAIChat({ onBack, character }) {
  const [items, setItems] = useS4([]);
  const [typing, setTyping] = useS4(false);
  const [picked, setPicked] = useS4(null);
  const [followUp, setFollowUp] = useS4(false);
  const [contextVisible, setContextVisible] = useS4(true);
  const [inputVal, setInputVal] = useS4('');
  const chatRef = useR4(null);

  const charImg = character === 'miko' ? 'assets/miko.png' : 'assets/caca.png';
  const charName = character === 'miko' ? 'Miko' : 'Caca';

  useE4(() => {
    window.refreshIcons();
    // Reset on character change
    setItems([]);
    setTyping(false);
    setPicked(null);
    setFollowUp(false);

    const timers = [];
    AI_SCRIPT.forEach((m, i) => {
      timers.push(setTimeout(() => {
        if (m.role === 'ai') {
          setTyping(true);
          timers.push(setTimeout(() => {
            setTyping(false);
            setItems(prev => [...prev, { ...m, idx: i, text: m.text.replace('{NAME}', charName) }]);
          }, m.typing || 800));
        } else {
          setItems(prev => [...prev, { ...m, idx: i }]);
        }
      }, m.delay));
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [character, charName]);

  useE4(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight + 200;
    }
    window.refreshIcons();
  }, [items, typing, followUp]);

  const handleChipPick = (chip) => {
    setPicked(chip);
    setItems(prev => [...prev, { role: 'user', text: chip }]);
    setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        if (chip === 'Ya, buat plannya') {
          setItems(prev => [...prev, {
            role: 'ai',
            text: 'Oke. Berdasarkan gaji dan pengeluaran kamu, targetmu tercapai kalau kamu menabung Rp 3,2jt per bulan. Itu sekitar 21% dari penghasilan. Kamu mau aku ingatkan setiap tanggal 25 saat gajian?',
            chips: ['Ingatkan saya', 'Sesuaikan'],
          }]);
        } else if (chip === 'Berapa lama?') {
          setItems(prev => [...prev, {
            role: 'ai',
            text: 'Dengan tabungan rutin Rp 3,2jt per bulan plus round-up otomatis, kamu akan mencapai Rp 100jt sekitar bulan November 2027. Itu 22 bulan dari sekarang, tepat sebelum musim libur akhir tahun.',
          }]);
        } else {
          setItems(prev => [...prev, {
            role: 'ai',
            text: 'Progress kamu saat ini 42%, di atas rata-rata pengguna Poket Liburan. Streak menabung 8 bulan berturut-turut. Konsistensi kamu sudah masuk top 7%.',
          }]);
        }
        setFollowUp(true);
      }, 900);
    }, 280);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const msg = inputVal.trim();
    setInputVal('');
    setItems(prev => [...prev, { role: 'user', text: msg }]);
    setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setItems(prev => [...prev, {
          role: 'ai',
          text: 'Aku sedang menganalisis kondisi keuangan kamu. Akan aku update saran dalam waktu dekat!',
        }]);
      }, 900);
    }, 200);
  };

  return (
    <div className="screen-content" data-screen-label="12 AI Chat" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: 0 }}>
      <div className="chat-header">
        <button className="icon-btn ib" onClick={onBack}>
          <Icon name="chevron-left" size={22} color="var(--navy)" />
        </button>
        <div className="ident">
          <div className="mini"><img src={charImg} alt={charName} /></div>
          <div className="nm-stack">
            <div className="nm">{charName}</div>
            <div className="pr"><span className="dot"></span><span>Aktif</span></div>
          </div>
        </div>
        <button className="icon-btn"><Icon name="more-horizontal" size={20} color="var(--navy)" /></button>
      </div>

      {contextVisible && (
        <div className="chat-context">
          <Icon name="info" size={14} color="var(--sky)" />
          <span className="tx">Konteks aktif: Poket Liburan Eropa 2027, 42% tercapai</span>
          <button className="x" onClick={() => setContextVisible(false)}>
            <Icon name="x" size={14} color="var(--mute)" />
          </button>
        </div>
      )}

      <div className="chat-area" ref={chatRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {items.map((m, i) => {
          if (m.role === 'ai') {
            return (
              <React.Fragment key={i}>
                <div className="bubble-row ai">
                  <div className="av"><img src={charImg} alt="" /></div>
                  <div className="bubble ai">
                    {m.text}
                    {m.card === 'kopi' && <KopiCard />}
                  </div>
                </div>
                {m.chips && !picked && !followUp && (
                  <div className="quick-chips">
                    {m.chips.map(c => (
                      <button key={c} className="quick-chip" onClick={() => handleChipPick(c)}>{c}</button>
                    ))}
                  </div>
                )}
                {m.chips && (picked || followUp) && (
                  <div className="quick-chips">
                    {m.chips.map(c => (
                      <button key={c} className={'quick-chip ' + (c === picked ? 'picked' : '')} disabled style={{ opacity: c === picked ? 1 : 0.4, cursor: 'default' }}>{c}</button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          }
          return (
            <div key={i} className="bubble-row user">
              <div className="bubble user">{m.text}</div>
            </div>
          );
        })}
        {typing && (
          <div className="bubble-row ai">
            <div className="av"><img src={charImg} alt="" /></div>
            <div className="typing-indicator">
              <span className="d"></span><span className="d"></span><span className="d"></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          placeholder={`Tanya ${charName}...`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className="send" onClick={handleSend}>
          <Icon name="send" size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}
window.ScreenAIChat = ScreenAIChat;

function KopiCard() {
  return (
    <div className="bubble-card">
      <div className="h">Simulasi Penghematan</div>
      <div className="r"><span className="k">Kopi sekarang</span><span className="v">Rp 420.000/bln</span></div>
      <div className="r"><span className="k">Kopi hemat</span><span className="v">Rp 200.000/bln</span></div>
      <div className="r tot"><span className="k">Masuk ke Liburan</span><span className="v">+Rp 220.000</span></div>
    </div>
  );
}
