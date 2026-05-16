/* global React, ReactDOM,
   StatusBar, TabBar, DemoNav,
   ScreenBeranda, ScreenPoketList, ScreenPoketDetail,
   ScreenPoketWave, ScreenQris, ScreenWrapped,
   ScreenTemplateGallery, ScreenTemplateDetail, ScreenCustomize,
   ScreenJointPoket, ScreenAIChar, ScreenAIChat */

// Indexes:
// 0=Beranda 1=PoketList 2=Detail 3=Wave 4=QRIS 5=Wrapped
// 6=Template Gallery 7=Template Detail 8=Customize
// 9=Joint Poket 10=AI Character Select 11=AI Chat
const SCREEN_KEYS = [
  'beranda','list','detail','wave','qris','wrapped',
  'tpl','tpldetail','customize',
  'joint','aichar','aichat',
];

function App() {
  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [tab, setTab] = React.useState('home');
  const [character, setCharacter] = React.useState('caca');
  const [showCreatedToast, setShowCreatedToast] = React.useState(false);
  const [darkStage, setDarkStage] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle('dark-stage', darkStage);
  }, [darkStage]);

  const go = (toIdx) => {
    if (toIdx === active) return;
    setPrev(active);
    setActive(toIdx);
    if (toIdx === 0) setTab('home');
    if (toIdx === 4) setTab('qris');
  };

  React.useEffect(() => {
    window.refreshIcons();
    const t = setTimeout(() => window.refreshIcons(), 80);
    return () => clearTimeout(t);
  }, [active]);

  const dark = active === 5;
  // Hide tab bar on Wrapped (immersive) and on AI Chat (chat is full-bleed)
  const showTabBar = active !== 5 && active !== 11;

  const renderScreen = (idx) => {
    switch (idx) {
      case 0:
        return (
          <ScreenBeranda
            onOpenPoket={() => go(2)}
            onOpenList={() => go(1)}
            onOpenWave={() => go(3)}
            onOpenQris={() => go(4)}
            onCreateNew={() => go(6)}
          />
        );
      case 1: return <ScreenPoketList onBack={() => go(0)} onOpenPoket={() => go(2)} onCreateNew={() => go(6)} />;
      case 2: return (
        <ScreenPoketDetail
          onBack={() => go(1)}
          onOpenWave={() => go(3)}
          onAskAI={() => go(10)}
          onOpenJoint={() => go(9)}
          showCreatedToast={showCreatedToast}
          clearToast={() => setShowCreatedToast(false)}
        />
      );
      case 3: return <ScreenPoketWave onBack={() => go(0)} onOpenWrapped={() => go(5)} />;
      case 4: return (
        <ScreenQris
          onBack={() => go(0)}
          blurredBackground={<ScreenBeranda onOpenPoket={() => {}} onOpenList={() => {}} onOpenWave={() => {}} onOpenQris={() => {}} onCreateNew={() => {}} />}
        />
      );
      case 5: return <ScreenWrapped onBack={() => go(3)} />;
      case 6: return <ScreenTemplateGallery onBack={() => go(1)} onPickTemplate={() => go(7)} />;
      case 7: return <ScreenTemplateDetail onBack={() => go(6)} onContinue={() => go(8)} />;
      case 8: return <ScreenCustomize onBack={() => go(7)} onCreate={() => { setShowCreatedToast(true); go(2); }} />;
      case 9: return <ScreenJointPoket onBack={() => go(2)} />;
      case 10: return <ScreenAIChar onBack={() => go(2)} selected={character} onSelect={setCharacter} onContinue={() => go(11)} />;
      case 11: return <ScreenAIChat onBack={() => go(10)} character={character} />;
      default: return null;
    }
  };

  const screenClass = (i) => (i === active ? 'screen active' : 'screen');

  return (
    <>
      <div className="stage-top">
        <div className="stage-label">PoketVERSE &middot; Live Prototype &middot; D&rsquo;Wiscar Co. &middot; GBCC 2026</div>
        <button className="stage-theme-toggle" onClick={() => setDarkStage(d => !d)} title="Toggle dark/light stage">
          {darkStage ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="device">
        <div className="dynamic-island"></div>

        <div className="app">
          <StatusBar dark={dark} />

          <div className={'screen-stack ' + (dark ? 'full' : '')} style={dark ? { top: 0 } : {}}>
            {SCREEN_KEYS.map((k, i) => (
              <div key={k} className={screenClass(i)}>
                {i === active ? renderScreen(i) : null}
              </div>
            ))}
          </div>

          {showTabBar && (
            <TabBar
              active={tab}
              onTab={(t) => {
                if (t === 'home') go(0);
                if (t === 'qris') go(4);
                setTab(t);
              }}
            />
          )}

          <DemoNav index={active} onJump={go} />
        </div>
      </div>

      <div style={{ color: '#666', fontSize: 11, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.06em', textAlign: 'center', maxWidth: 420 }}>
        Tap angka 1 sampai 12 untuk navigasi prototype &middot; atau gunakan CTA di dalam app
      </div>
    </>
  );
}

(function bootstrap() {
  const el = document.getElementById('root');
  if (!el) { setTimeout(bootstrap, 30); return; }
  const root = ReactDOM.createRoot(el);
  root.render(<App />);
  setTimeout(() => window.refreshIcons(), 100);
  setTimeout(() => window.refreshIcons(), 500);
})();
