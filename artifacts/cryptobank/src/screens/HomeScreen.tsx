import { useState, useEffect } from "react";
import type { Tab } from "@/App";

/* ─── helpers ─────────────────────────────────────────────── */
function fmt(n: number, dec = 2) {
  return n.toLocaleString("ru-RU", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const raf = () => {
      const p = Math.min((performance.now() - t0) / ms, 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ─── data ────────────────────────────────────────────────── */
const TXNS = [
  { id:"1", name:"Яндекс Такси",     cat:"Транспорт",   amt:-178,    cur:"BYN", icon:"🚕", bg:"#EFF6FF", ico:"#2563EB", date:"Сегодня"  },
  { id:"2", name:"OZON",             cat:"Покупки",      amt:-3240,   cur:"BYN", icon:"📦", bg:"#FFF7ED", ico:"#EA580C", date:"Сегодня"  },
  { id:"3", name:"Пятёрочка",        cat:"Продукты",     amt:-89.40,  cur:"BYN", icon:"🛒", bg:"#F0FDF4", ico:"#16A34A", date:"Сегодня"  },
  { id:"4", name:"Перевод от Ивана", cat:"Входящий",     amt:+5000,   cur:"BYN", icon:"↙", bg:"#F0FDF4", ico:"#16A34A", date:"Вчера"    },
  { id:"5", name:"Netflix",          cat:"Подписки",     amt:-15.99,  cur:"USD", icon:"🎬", bg:"#FFF1F2", ico:"#E11D48", date:"Вчера"    },
];

const ACTIONS = [
  { label:"Отправить",   icon:"M5 12h14M12 5l7 7-7 7",                                         color:"#0055FF", cb:"bridge" as Tab },
  { label:"Получить",    icon:"M19 12H5M12 19l-7-7 7-7",                                        color:"#00B96B", cb:"home"   as Tab },
  { label:"Bridge",      icon:"M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16",                        color:"#8B5CF6", cb:"bridge" as Tab },
  { label:"Купить",      icon:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", color:"#F59E0B", cb:"earn" as Tab },
];

const ASSETS = [
  { sym:"BTC",  name:"Bitcoin",   usd:47248,  chg:3.84,  color:"#F59E0B", bg:"#FFFBEB", hold:"0.32" },
  { sym:"ETH",  name:"Ethereum",  usd:2618,   chg:2.11,  color:"#6D28D9", bg:"#F5F3FF", hold:"2.15" },
  { sym:"TON",  name:"TON",       usd:6.18,   chg:4.72,  color:"#0EA5E9", bg:"#F0F9FF", hold:"450"  },
  { sym:"USDT", name:"Tether",    usd:1.000,  chg:0.01,  color:"#059669", bg:"#ECFDF5", hold:"12 500"},
];

/* ─── sub-components ──────────────────────────────────────── */
function Section({ title, action }: { title: string; action?: string }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 16px", marginBottom:"12px" }}>
      <span style={{ fontSize:"17px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.3px" }}>{title}</span>
      {action && <button style={{ fontSize:"14px", color:"var(--brand)", fontWeight:500, background:"none", border:"none", cursor:"pointer" }}>{action}</button>}
    </div>
  );
}

function TxRow({ tx, last }: { tx: typeof TXNS[0]; last: boolean }) {
  const [pr, setPr] = useState(false);
  const pos = tx.amt > 0;
  return (
    <div
      onPointerDown={()=>setPr(true)}
      onPointerUp={()=>setPr(false)}
      onPointerLeave={()=>setPr(false)}
      style={{
        display:"flex", alignItems:"center", gap:"12px", padding:"13px 16px",
        borderBottom: last ? "none" : "1px solid var(--sep)",
        background: pr ? "var(--surface-2)" : "transparent",
        transition:"background 0.1s", cursor:"pointer",
      }}
    >
      <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:tx.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"20px" }}>
        {tx.icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:"15px", fontWeight:600, color:"var(--t1)", marginBottom:"2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{tx.name}</div>
        <div style={{ fontSize:"13px", color:"var(--t2)" }}>{tx.cat}</div>
      </div>
      <div style={{ textAlign:"right", flexShrink:0 }}>
        <div style={{ fontSize:"15px", fontWeight:600, color: pos ? "var(--green)" : "var(--t1)" }}>
          {pos ? "+" : ""}{fmt(tx.amt)} {tx.cur}
        </div>
      </div>
    </div>
  );
}

/* ─── main ────────────────────────────────────────────────── */
export default function HomeScreen({ onNavigate }: { onNavigate?: (t: Tab) => void }) {
  const [masked, setMasked] = useState(false);
  const balance = useCountUp(67204.5, 950);
  const crypto  = useCountUp(42354,   800);

  const mask = (v: string) => masked ? "•  •  •  •  •  •" : v;

  return (
    <div style={{ paddingBottom:"24px" }}>

      {/* ─── Header ─── */}
      <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 16px 24px" }}>
        <div>
          <div style={{ fontSize:"13px", color:"var(--t2)", marginBottom:"2px" }}>Добрый день 👋</div>
          <div style={{ fontSize:"22px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.5px" }}>Алексей Коваль</div>
        </div>
        <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
          <button style={{
            width:"40px", height:"40px", borderRadius:"12px", background:"var(--surface)",
            border:"1px solid var(--sep)", boxShadow:"var(--card-shadow)",
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--t1)" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <div style={{ position:"absolute", top:"8px", right:"8px", width:"7px", height:"7px", borderRadius:"50%", background:"var(--red)", border:"1.5px solid var(--bg)" }}/>
          </button>
          <div style={{
            width:"40px", height:"40px", borderRadius:"12px", overflow:"hidden",
            background:"linear-gradient(135deg,#1a1a2e,#16213e)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"var(--card-shadow)", border:"1px solid var(--sep)",
          }}>
            <span style={{ color:"#fff", fontSize:"15px", fontWeight:700 }}>АК</span>
          </div>
        </div>
      </div>

      {/* ─── Main Balance ─── */}
      <div className="fade-up s1" style={{ padding:"0 16px 24px" }}>
        <div style={{ fontSize:"13px", color:"var(--t2)", fontWeight:500, marginBottom:"6px", display:"flex", alignItems:"center", gap:"6px" }}>
          Общий баланс
          <button onClick={()=>setMasked(m=>!m)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:"2px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" strokeLinecap="round">
              {masked
                ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
              }
            </svg>
          </button>
        </div>
        <div className="count-up" key={masked.toString()} style={{ display:"flex", alignItems:"baseline", gap:"8px", marginBottom:"6px" }}>
          <span style={{ fontSize:"44px", fontWeight:700, color:"var(--t1)", letterSpacing:"-2px", lineHeight:1, fontVariantNumeric:"tabular-nums" }}>
            {mask(fmt(balance, 2))}
          </span>
          <span style={{ fontSize:"20px", fontWeight:400, color:"var(--t2)", letterSpacing:"-0.3px" }}>BYN</span>
        </div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 10px", borderRadius:"8px", background:"var(--green-bg)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
          <span style={{ fontSize:"12px", fontWeight:600, color:"var(--green)" }}>+4,28% сегодня</span>
        </div>
      </div>

      {/* ─── Physical card ─── */}
      <div className="fade-up s2" style={{ padding:"0 16px 24px", overflowX:"auto", display:"flex", gap:"12px" }}>
        {/* Fiat card */}
        <div style={{
          flexShrink:0, width:"328px", height:"180px", borderRadius:"22px",
          background:"linear-gradient(135deg,#0F0F1A 0%,#1a1a3e 50%,#0F0F1A 100%)",
          padding:"22px 24px", position:"relative", overflow:"hidden",
          boxShadow:"0 8px 32px rgba(0,0,255,0.18), 0 2px 8px rgba(0,0,0,0.25)",
        }}>
          {/* Noise texture */}
          <div style={{ position:"absolute", inset:0, borderRadius:"inherit", opacity:0.04,
            backgroundImage:"url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
            backgroundSize:"80px",
          }}/>
          {/* Shine */}
          <div style={{ position:"absolute", top:"-40%", left:"-20%", width:"70%", height:"200%", background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.05) 50%,transparent 60%)", transform:"rotate(15deg)" }}/>

          {/* Top row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"auto" }}>
            <div style={{ fontSize:"16px", fontWeight:800, color:"#fff", letterSpacing:"0.04em" }}>CRYPTOBANK</div>
            <svg width="32" height="20" viewBox="0 0 40 24" fill="none">
              <circle cx="16" cy="12" r="12" fill="rgba(255,255,255,0.7)"/>
              <circle cx="24" cy="12" r="12" fill="rgba(255,255,255,0.4)"/>
            </svg>
          </div>

          {/* Chip */}
          <div style={{ position:"absolute", top:"50px", left:"24px" }}>
            <div style={{ width:"38px", height:"28px", borderRadius:"5px", background:"linear-gradient(135deg,#d4a843,#e8c56a)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:"28px", height:"18px", borderRadius:"3px", border:"1px solid rgba(0,0,0,0.15)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", padding:"3px" }}>
                {[0,1,2,3].map(i=><div key={i} style={{ background:"rgba(0,0,0,0.15)", borderRadius:"1px" }}/>)}
              </div>
            </div>
          </div>

          {/* Contactless */}
          <div style={{ position:"absolute", top:"50px", left:"80px" }}>
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 11C1 5.477 5.477 1 11 1"/><path d="M4 11a7 7 0 017-7"/><path d="M7 11a4 4 0 014-4"/><circle cx="11" cy="11" r="1.5" fill="rgba(255,255,255,0.5)" stroke="none"/>
            </svg>
          </div>

          {/* Bottom */}
          <div style={{ position:"absolute", bottom:"22px", left:"24px", right:"24px" }}>
            <div style={{ fontSize:"16px", fontWeight:500, color:"rgba(255,255,255,0.8)", letterSpacing:"0.14em", fontFamily:"monospace", marginBottom:"8px" }}>
              {masked ? "••••  ••••  ••••  ••••" : "4821  0044  3871  9203"}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
              <div>
                <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em", marginBottom:"2px" }}>CARDHOLDER</div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.75)", fontWeight:500, letterSpacing:"0.06em" }}>ALEXEI KOVAL</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em", marginBottom:"2px" }}>EXPIRES</div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.75)", fontWeight:500 }}>09/27</div>
              </div>
            </div>
          </div>
        </div>

        {/* Crypto card */}
        <div style={{
          flexShrink:0, width:"270px", height:"180px", borderRadius:"22px",
          background:"linear-gradient(135deg,#1a0533,#3d0a6e)",
          padding:"22px 24px", position:"relative", overflow:"hidden",
          boxShadow:"0 8px 32px rgba(100,0,255,0.18), 0 2px 8px rgba(0,0,0,0.2)",
        }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"inherit", opacity:0.04,
            backgroundImage:"url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
            backgroundSize:"80px",
          }}/>
          <div style={{ fontSize:"13px", fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:"0.06em", marginBottom:"4px" }}>КРИПТО</div>
          <div style={{ fontSize:"26px", fontWeight:700, color:"#fff", letterSpacing:"-0.5px", marginBottom:"2px" }}>{mask(fmt(crypto, 0))}</div>
          <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", marginBottom:"auto" }}>USD</div>
          <div style={{ position:"absolute", bottom:"22px", left:"24px", right:"24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", gap:"6px" }}>
              {["₿","Ξ","T"].map(s=>(
                <div key={s} style={{ width:"26px", height:"26px", borderRadius:"8px", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"11px", fontWeight:700 }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)" }}>+{fmt(4.28, 2)}%</div>
          </div>
        </div>
      </div>

      {/* ─── Quick actions ─── */}
      <div className="fade-up s3" style={{ marginBottom:"28px" }}>
        <div style={{ display:"flex", gap:"8px", padding:"0 16px" }}>
          {ACTIONS.map((a, i) => {
            const [pr, setPr] = useState(false);
            return (
              <button key={a.label}
                onPointerDown={()=>setPr(true)}
                onPointerUp={()=>{ setPr(false); onNavigate?.(a.cb); }}
                onPointerLeave={()=>setPr(false)}
                style={{
                  flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
                  padding:"14px 4px 12px", borderRadius:"18px",
                  background: pr ? "rgba(15,15,16,0.07)" : "var(--surface)",
                  border:"1px solid var(--sep)", boxShadow: pr ? "none" : "var(--card-shadow)",
                  transform: pr ? "scale(0.93)" : "scale(1)",
                  transition:"all 0.13s cubic-bezier(0.34,1.56,0.64,1)",
                  cursor:"pointer",
                }}
              >
                <div style={{ width:"42px", height:"42px", borderRadius:"13px", background: pr ? a.color : `${a.color}14`, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.13s" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke={pr ? "#fff" : a.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition:"stroke 0.13s" }}
                  >
                    <path d={a.icon}/>
                  </svg>
                </div>
                <span style={{ fontSize:"10px", fontWeight:600, color:"var(--t2)", letterSpacing:"0.01em", textAlign:"center", lineHeight:1.2 }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Recent transactions ─── */}
      <div className="fade-up s4">
        <Section title="Операции" action="Все"/>
        <div style={{ margin:"0 16px", borderRadius:"20px", background:"var(--surface)", boxShadow:"var(--card-shadow)", border:"1px solid var(--sep)", overflow:"hidden" }}>
          {TXNS.map((tx, i) => <TxRow key={tx.id} tx={tx} last={i===TXNS.length-1}/>)}
        </div>
      </div>

      {/* ─── Crypto assets ─── */}
      <div className="fade-up s5" style={{ marginTop:"28px" }}>
        <Section title="Крипто" action="Рынок"/>
        <div style={{ margin:"0 16px", borderRadius:"20px", background:"var(--surface)", boxShadow:"var(--card-shadow)", border:"1px solid var(--sep)", overflow:"hidden" }}>
          {ASSETS.map((a, i) => (
            <div key={a.sym} style={{
              display:"flex", alignItems:"center", gap:"12px", padding:"13px 16px",
              borderBottom: i<ASSETS.length-1 ? "1px solid var(--sep)" : "none",
            }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:a.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"16px", fontWeight:800, color:a.color }}>{a.sym[0]}</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"15px", fontWeight:600, color:"var(--t1)", marginBottom:"2px" }}>{a.name}</div>
                <div style={{ fontSize:"12px", color:"var(--t2)" }}>{a.hold} {a.sym}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"15px", fontWeight:600, color:"var(--t1)", marginBottom:"2px" }}>${a.usd >= 100 ? fmt(a.usd, 0) : a.usd.toFixed(3)}</div>
                <div style={{ fontSize:"12px", fontWeight:500, color:"var(--green)" }}>+{a.chg}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
