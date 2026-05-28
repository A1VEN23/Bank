import { useState, useEffect, useRef } from "react";
import type { Tab } from "@/App";

interface Props { onNavigate?: (t: Tab) => void; }

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(target * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return val;
}

const ASSETS = [
  { sym:"BTC", name:"Bitcoin",      price:47248, change:3.84,  hold:"0.32",  alloc:62 },
  { sym:"ETH", name:"Ethereum",     price:2618,  change:2.11,  hold:"2.15",  alloc:21 },
  { sym:"TON", name:"TON Crystal",  price:6.18,  change:4.72,  hold:"450",   alloc:10 },
  { sym:"USDT",name:"Tether USD",   price:1.000, change:0.01,  hold:"12500", alloc:7  },
];

const ACTIONS = [
  { label:"Send",    icon:"M5 12h14M12 5l7 7-7 7",           tab:"bridge" as Tab },
  { label:"Receive", icon:"M5 12h14M12 19l7-7-7-7",          tab:"home"   as Tab },
  { label:"Bridge",  icon:"M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16", tab:"bridge" as Tab },
  { label:"Earn",    icon:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", tab:"earn" as Tab },
];

function ActionBtn({ label, icon, onClick }: { label:string; icon:string; onClick:()=>void }) {
  const [down, setDown] = useState(false);
  return (
    <button
      onPointerDown={() => setDown(true)}
      onPointerUp={() => { setDown(false); onClick(); }}
      onPointerLeave={() => setDown(false)}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
        padding:"16px 10px", borderRadius:"20px", border:"1px solid var(--border)",
        background: down ? "rgba(10,9,8,0.05)" : "var(--surface)",
        boxShadow: down ? "none" : "var(--shadow-sm)",
        cursor:"pointer", flex:1,
        transform: down ? "scale(0.94)" : "scale(1)",
        transition: "transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease",
      }}
    >
      <div style={{
        width:"44px", height:"44px", borderRadius:"14px",
        background: down ? "var(--dark)" : "var(--ink-04)",
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"background 0.15s",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={down ? "#fff" : "var(--ink)"} strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round">
          <path d={icon}/>
        </svg>
      </div>
      <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.04em", color:"var(--ink-60)", textTransform:"uppercase" }}>
        {label}
      </span>
    </button>
  );
}

export default function HomeScreen({ onNavigate }: Props) {
  const [hidden, setHidden] = useState(false);
  const balance = useCountUp(67204, 1400);
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const fmt = (v: string) => hidden ? "· · · · · ·" : v;

  return (
    <div style={{ padding:"20px 20px 24px" }}>

      {/* ── Top bar ── */}
      <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{
            width:"44px", height:"44px", borderRadius:"16px",
            background:"var(--dark)", display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
            position:"relative",
          }}>
            <span style={{ color:"#fff", fontSize:"14px", fontWeight:700, letterSpacing:"0.02em" }}>АК</span>
            <div style={{
              position:"absolute", bottom:"-1px", right:"-1px",
              width:"10px", height:"10px", borderRadius:"50%",
              background:"#16A34A", border:"2px solid var(--bg)",
              animation:"dot-pulse 2.5s ease-in-out infinite",
            }} />
          </div>
          <div>
            <div style={{ fontSize:"11px", color:"var(--ink-35)", fontWeight:500, letterSpacing:"0.04em", marginBottom:"2px" }}>Welcome back</div>
            <div style={{ fontSize:"16px", color:"var(--ink)", fontWeight:600 }}>Alexei Koval</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"6px",
            padding:"7px 13px", borderRadius:"20px",
            background:"var(--surface)", border:"1px solid var(--border)",
            boxShadow:"var(--shadow-sm)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span style={{ fontSize:"10px", fontWeight:700, color:"#16A34A", letterSpacing:"0.05em" }}>AI SHIELD</span>
          </div>
          <button style={{
            width:"36px", height:"36px", borderRadius:"12px",
            background:"var(--surface)", border:"1px solid var(--border)",
            boxShadow:"var(--shadow-sm)", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            position:"relative",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-60)" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={{ position:"absolute", top:"6px", right:"6px", width:"7px", height:"7px", borderRadius:"50%", background:"#DC2626", border:"1.5px solid var(--bg)" }} />
          </button>
        </div>
      </div>

      {/* ── Hero balance card (dark) ── */}
      <div className="card-dark fade-up" style={{
        padding:"28px", marginBottom:"16px", position:"relative", overflow:"hidden",
        animationDelay:"0.06s",
      }}>
        {/* Subtle grain texture overlay */}
        <div style={{
          position:"absolute", inset:0, opacity:0.04,
          backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize:"150px",
          borderRadius:"inherit",
        }}/>
        {/* Glow orb */}
        <div style={{
          position:"absolute", top:"-40px", right:"-30px",
          width:"160px", height:"160px", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter:"blur(24px)",
        }}/>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"22px" }}>
          <div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"10px" }}>Total Portfolio</div>
            <div style={{ fontSize:"44px", fontWeight:200, color:"#fff", letterSpacing:"-2px", lineHeight:1, fontVariantNumeric:"tabular-nums" }}>
              {fmt(balance.toLocaleString())}
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginTop:"6px" }}>
              <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"15px", fontWeight:300 }}>BYN</span>
              <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"12px" }}>{fmt("≈ $18,420")}</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px" }}>
            <button onClick={() => setHidden(!hidden)} style={{
              width:"34px", height:"34px", borderRadius:"10px",
              background:"rgba(255,255,255,0.08)", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
                {hidden
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
            <div style={{
              display:"flex", alignItems:"center", gap:"5px",
              padding:"5px 10px", borderRadius:"10px",
              background:"rgba(22,163,74,0.15)", border:"1px solid rgba(22,163,74,0.25)",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
              <span style={{ fontSize:"11px", fontWeight:600, color:"#4ade80" }}>+4.28%</span>
            </div>
          </div>
        </div>

        {/* Mini wallet row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {[
            { label:"Fiat Wallet",   val:fmt("24,850"), cur:"BYN", icon:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", pct:37 },
            { label:"Crypto Wallet", val:fmt("42,354"), cur:"USD", icon:"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", pct:63 },
          ].map((w) => (
            <div key={w.label} style={{
              padding:"14px 16px", borderRadius:"16px",
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"10px" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{w.label}</span>
              </div>
              <div style={{ fontSize:"18px", fontWeight:300, color:"#fff", marginBottom:"3px", fontVariantNumeric:"tabular-nums" }}>{w.val}</div>
              <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.25)", marginBottom:"10px" }}>{w.cur}</div>
              <div style={{ height:"2px", borderRadius:"1px", background:"rgba(255,255,255,0.08)" }}>
                <div style={{ width:`${w.pct}%`, height:"100%", borderRadius:"1px", background:"rgba(255,255,255,0.4)", transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="fade-up" style={{ animationDelay:"0.1s", marginBottom:"20px" }}>
        <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginBottom:"12px", paddingLeft:"2px" }}>Quick Actions</div>
        <div className="stagger" style={{ display:"flex", gap:"8px" }}>
          {ACTIONS.map((a) => (
            <ActionBtn key={a.label} label={a.label} icon={a.icon} onClick={() => onNavigate?.(a.tab)} />
          ))}
        </div>
      </div>

      {/* ── Asset list ── */}
      <div className="fade-up" style={{ animationDelay:"0.14s" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px", paddingLeft:"2px" }}>
          <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600 }}>Portfolio</div>
          <button style={{ fontSize:"11px", fontWeight:600, color:"var(--ink-60)", background:"none", border:"none", cursor:"pointer" }}>See all →</button>
        </div>
        <div className="card" style={{ overflow:"hidden", padding:"0" }}>
          {ASSETS.map((a, i) => {
            const hov = hoveredAsset === a.sym;
            return (
              <div key={a.sym}
                onMouseEnter={() => setHoveredAsset(a.sym)}
                onMouseLeave={() => setHoveredAsset(null)}
                style={{
                  display:"flex", alignItems:"center", gap:"14px", padding:"14px 18px",
                  borderBottom: i < ASSETS.length-1 ? "1px solid var(--border)" : "none",
                  background: hov ? "rgba(10,9,8,0.025)" : "transparent",
                  transition:"background 0.15s ease", cursor:"pointer",
                }}
              >
                {/* Icon */}
                <div style={{
                  width:"40px", height:"40px", borderRadius:"14px",
                  background: i===0 ? "#FEF3C7" : i===1 ? "#EDE9FE" : i===2 ? "#DBEAFE" : "#DCFCE7",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border: `1px solid ${i===0?"rgba(245,158,11,0.2)":i===1?"rgba(139,92,246,0.2)":i===2?"rgba(59,130,246,0.2)":"rgba(22,163,74,0.2)"}`,
                  flexShrink:0,
                }}>
                  <span style={{
                    fontSize:"12px", fontWeight:700,
                    color: i===0?"#B45309":i===1?"#7C3AED":i===2?"#1D4ED8":"#15803D",
                  }}>{a.sym.slice(0,1)}</span>
                </div>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"var(--ink)", marginBottom:"4px" }}>{a.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"var(--ink-04)" }}>
                      <div style={{ width:`${a.alloc}%`, height:"100%", borderRadius:"2px", background: i===0?"#F59E0B":i===1?"#8B5CF6":i===2?"#3B82F6":"#16A34A", transition:"width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                    <span style={{ fontSize:"10px", color:"var(--ink-35)", minWidth:"24px", textAlign:"right" }}>{a.alloc}%</span>
                  </div>
                </div>

                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"var(--ink)", marginBottom:"3px" }}>
                    ${a.price >= 100 ? a.price.toLocaleString() : a.price.toFixed(3)}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"3px", justifyContent:"flex-end" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
                    <span style={{ fontSize:"11px", fontWeight:600, color:"#16A34A" }}>+{a.change}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
