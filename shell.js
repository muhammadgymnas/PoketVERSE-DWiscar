/* global React, lucide */
// Shared chrome: status bar, tab bar, demo nav pill

const { useState, useEffect, useRef } = React;

// Format Indonesian rupiah / number
window.fmtIDR = (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
window.fmtNum = (n) => new Intl.NumberFormat('id-ID').format(Math.round(n));

// Lucide icon helper. We render an <i data-lucide> and re-initialize after mount.
function Icon({ name, size, color, className = '', style = {} }) {
  const s = size || 18;
  return (
    <i
      data-lucide={name}
      className={'icon ' + className}
      style={{ width: s, height: s, color, strokeWidth: 1.5, display: 'inline-flex', ...style }}
    ></i>
  );
}
window.Icon = Icon;

// Refresh lucide icons after any render
window.refreshIcons = () => {
  if (window.lucide && window.lucide.createIcons) {
    try { window.lucide.createIcons(); } catch (e) {}
  }
};

// Status bar (iOS-style)
function StatusBar({ dark }) {
  return (
    <div className={'status-bar ' + (dark ? 'dark' : '')}>
      <div className="time">9:41</div>
      <div className="right sb-icons">
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" opacity="0.4" />
        </svg>
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 1C10.2 1 12.7 2 14.5 3.7L13 5.2C11.5 3.9 9.6 3.1 7.5 3.1C5.4 3.1 3.5 3.9 2 5.2L0.5 3.7C2.3 2 4.8 1 7.5 1Z" fill="currentColor"/>
          <path d="M7.5 4.5C9.2 4.5 10.8 5.2 11.9 6.3L10.4 7.8C9.7 7 8.7 6.6 7.5 6.6C6.3 6.6 5.3 7 4.6 7.8L3.1 6.3C4.2 5.2 5.8 4.5 7.5 4.5Z" fill="currentColor"/>
          <path d="M7.5 8C8.4 8 9.1 8.7 9.1 9.6C9.1 10.5 8.4 10.6 7.5 10.6C6.6 10.6 5.9 10.5 5.9 9.6C5.9 8.7 6.6 8 7.5 8Z" fill="currentColor"/>
        </svg>
        {/* Battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="23" height="11" rx="3" stroke="currentColor" opacity="0.5"/>
          <rect x="2" y="2" width="20" height="8" rx="1.5" fill="currentColor"/>
          <rect x="24.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}
window.StatusBar = StatusBar;

// Tab bar (5 tabs, QRIS center elevated)
function TabBar({ active, onTab }) {
  const tabs = [
    { key: 'home', label: 'Beranda', icon: 'home' },
    { key: 'activity', label: 'Aktivitas', icon: 'receipt-text' },
    { key: 'qris',  label: '',         icon: 'qr-code',     qris: true },
    { key: 'foryou', label: 'For You',  icon: 'star' },
    { key: 'me',    label: 'Akun',     icon: 'user-round' },
  ];
  return (
    <div className="tab-bar">
      {tabs.map(t => (
        <button
          key={t.key}
          className={'tab ' + (t.qris ? 'qris ' : '') + (active === t.key ? 'active' : '')}
          onClick={() => onTab && onTab(t.key)}
        >
          {t.qris ? (
            <>
              <div className="qris-bubble">
                <Icon name={t.icon} size={22} color="#fff" />
              </div>
              <span>QRIS</span>
            </>
          ) : (
            <>
              <Icon name={t.icon} size={20} color="currentColor" />
              <span>{t.label}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
window.TabBar = TabBar;

// Demo nav pill (bottom, above tab bar) — 12 dots, scrollable
function DemoNav({ index, onJump }) {
  const items = [
    { i: 1,  label: 'Beranda' },
    { i: 2,  label: 'Poket Rupiah' },
    { i: 3,  label: 'Detail' },
    { i: 4,  label: 'PoketWAVE' },
    { i: 5,  label: 'QRIS' },
    { i: 6,  label: 'Wrapped' },
    { i: 7,  label: 'Template' },
    { i: 8,  label: 'Partner' },
    { i: 9,  label: 'Setup' },
    { i: 10, label: 'Joint' },
    { i: 11, label: 'AI Pilih' },
    { i: 12, label: 'AI Chat' },
  ];
  const ref = React.useRef(null);
  // Auto-scroll active dot into view
  React.useEffect(() => {
    if (!ref.current) return;
    const dots = ref.current.querySelectorAll('.dot');
    const d = dots[index];
    if (d) {
      const containerRect = ref.current.getBoundingClientRect();
      const dotRect = d.getBoundingClientRect();
      const offset = dotRect.left - containerRect.left - containerRect.width / 2 + dotRect.width / 2;
      ref.current.scrollLeft += offset;
    }
  }, [index]);
  return (
    <div ref={ref} className="demo-nav" title={items[index]?.label}>
      {items.map((it, i) => (
        <button
          key={it.i}
          className={'dot ' + (i === index ? 'active' : '')}
          onClick={() => onJump(i)}
          aria-label={it.label}
        >
          {it.i}
        </button>
      ))}
    </div>
  );
}
window.DemoNav = DemoNav;

// App header (Beranda)
function AppHeader({ onAvatar, onBell }) {
  return (
    <div className="app-header">
      <div className="logo-mybca">
        <span className="my">my</span><span className="bca">BCA</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="icon-btn" onClick={onBell}>
          <Icon name="bell" size={20} color="var(--navy)" />
          <span className="notif-dot"></span>
        </button>
        <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={onAvatar}>
          <div className="avatar">MG</div>
        </button>
      </div>
    </div>
  );
}
window.AppHeader = AppHeader;

// Navigation header (back / title / action)
function NavHeader({ title, onBack, right, subtitle, dark }) {
  return (
    <div className="nav-header" style={dark ? { background: '#0A1628', borderBottom: '1px solid rgba(255,255,255,0.08)' } : {}}>
      <button className="icon-btn" onClick={onBack}>
        <Icon name="chevron-left" size={22} color={dark ? '#fff' : 'var(--navy)'} />
      </button>
      <div className="title">
        <div className="page-title" style={dark ? { color: '#fff' } : {}}>{title}</div>
        {subtitle ? <div className="caption" style={{ marginTop: 1 }}>{subtitle}</div> : null}
      </div>
      <div style={{ textAlign: 'right' }}>{right || null}</div>
    </div>
  );
}
window.NavHeader = NavHeader;

// Section header row with "Lihat semua"
function SectionRow({ label, action, onAction }) {
  return (
    <div className="section-row">
      <span className="section-label">{label}</span>
      {action ? (
        <button className="link" onClick={onAction}>
          {action}
          <Icon name="chevron-right" size={14} color="var(--sky)" />
        </button>
      ) : null}
    </div>
  );
}
window.SectionRow = SectionRow;

// Animated progress bar
function ProgressBar({ pct, tone = 'sky', delay = 0, thin = false, dark = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.width = pct + '%';
    }, 80 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  const trackStyle = dark
    ? { background: 'rgba(255,255,255,0.14)' }
    : {};
  return (
    <div className={'progress-track' + (thin ? ' thin' : '')} style={{ height: thin ? 4 : 6, ...trackStyle }}>
      <div ref={ref} className={'progress-fill ' + tone} style={{ width: 0 }}></div>
    </div>
  );
}
window.ProgressBar = ProgressBar;

// Count-up number
function CountUp({ to, duration = 1100, format = window.fmtIDR, start = 0, delay = 0 }) {
  const [v, setV] = useState(start);
  useEffect(() => {
    let raf;
    let t0;
    const tStart = performance.now() + delay;
    const step = (now) => {
      if (now < tStart) { raf = requestAnimationFrame(step); return; }
      if (!t0) t0 = now;
      const p = Math.min(1, (now - tStart) / duration);
      // ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);
      setV(start + (to - start) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay]);
  return <>{format(v)}</>;
}
window.CountUp = CountUp;
