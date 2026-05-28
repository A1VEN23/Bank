import { useState, useEffect } from "react";
import type { Tab } from "@/App";
import { useAccount } from "@/context/AccountContext";

/* ── count-up hook ── */
function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const raf = () => {
      const p = Math.min((performance.now() - t0) / ms, 1);
      setV(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ── sparkline ── */
function Sparkline({ seed, up, w=56, h=22 }: { seed:number; up:boolean; w?:number; h?:number }) {
  const pts = Array.from({length:7},(_,i)=>{
    const wave = Math.sin(seed*2.1+i*1.3)*0.35 + Math.sin(seed*0.7+i*2.1)*0.2;
    const trend = up ? i*0.07 : -i*0.05;
    return 1 + wave + trend;
  });
  const min = Math.min(...pts), max = Math.max(...pts), rng = max-min||0.1;
  const path = pts.map((v,i)=>`${(i/6)*w},${h-((v-min)/rng)*(h-3)+1.5}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block",flexShrink:0}}>
      <polyline points={path} fill="none"
        stroke={up?"var(--green)":"var(--red)"} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── tokens (26 NBB-permitted) ── */
const TOKENS = [
  { sym:"BTC",   name:"Bitcoin",       p:47248.10, c:+3.84, seed:11, hold:"0.3241",    up:true  },
  { sym:"ETH",   name:"Ethereum",      p:2618.55,  c:+2.11, seed:22, hold:"2.1500",    up:true  },
  { sym:"BNB",   name:"BNB",           p:412.30,   c:+1.44, seed:5,  hold:"4.0000",    up:true  },
  { sym:"SOL",   name:"Solana",        p:142.55,   c:+5.62, seed:33, hold:"18.0000",   up:true  },
  { sym:"XRP",   name:"Ripple",        p:0.5821,   c:-0.88, seed:7,  hold:"5 000",     up:false },
  { sym:"ADA",   name:"Cardano",       p:0.4411,   c:+1.22, seed:17, hold:"12 000",    up:true  },
  { sym:"AVAX",  name:"Avalanche",     p:38.74,    c:+3.18, seed:9,  hold:"22.0000",   up:true  },
  { sym:"TON",   name:"TON Crystal",   p:6.18,     c:+4.72, seed:44, hold:"450.0000",  up:true  },
  { sym:"MATIC", name:"Polygon",       p:0.8820,   c:+2.91, seed:13, hold:"8 400",     up:true  },
  { sym:"LINK",  name:"Chainlink",     p:17.44,    c:+2.05, seed:25, hold:"55.0000",   up:true  },
  { sym:"DOT",   name:"Polkadot",      p:7.21,     c:-1.14, seed:31, hold:"120.0000",  up:false },
  { sym:"ATOM",  name:"Cosmos",        p:9.88,     c:+0.77, seed:19, hold:"80.0000",   up:true  },
  { sym:"UNI",   name:"Uniswap",       p:11.02,    c:+1.88, seed:37, hold:"35.0000",   up:true  },
  { sym:"NEAR",  name:"NEAR Protocol", p:6.44,     c:+3.44, seed:41, hold:"200.0000",  up:true  },
  { sym:"OP",    name:"Optimism",      p:2.88,     c:+5.11, seed:53, hold:"400.0000",  up:true  },
  { sym:"ARB",   name:"Arbitrum",      p:1.22,     c:+4.30, seed:61, hold:"800.0000",  up:true  },
  { sym:"APT",   name:"Aptos",         p:8.77,     c:+2.64, seed:47, hold:"60.0000",   up:true  },
  { sym:"LTC",   name:"Litecoin",      p:88.40,    c:-0.55, seed:23, hold:"1.8000",    up:false },
  { sym:"TRX",   name:"TRON",          p:0.1122,   c:+0.33, seed:15, hold:"22 000",    up:true  },
  { sym:"BCH",   name:"Bitcoin Cash",  p:378.20,   c:+1.77, seed:29, hold:"0.5500",    up:true  },
  { sym:"ALGO",  name:"Algorand",      p:0.1888,   c:-2.10, seed:35, hold:"5 000",     up:false },
  { sym:"VET",   name:"VeChain",       p:0.0328,   c:+1.05, seed:43, hold:"50 000",    up:true  },
  { sym:"DOGE",  name:"Dogecoin",      p:0.1644,   c:+6.22, seed:67, hold:"10 000",    up:true  },
  { sym:"DAI",   name:"Dai",           p:1.0001,   c:+0.01, seed:71, hold:"8 000",     up:true  },
  { sym:"USDT",  name:"Tether USD",    p:1.0002,   c:+0.01, seed:77, hold:"12 500",    up:true  },
  { sym:"USDC",  name:"USD Coin",      p:1.0000,   c:0.00,  seed:83, hold:"5 000",     up:true  },
];

/* ── exchanges for liquidity router ── */
const EXCHANGES = [
  { name:"BYNEX",     rate:47248.10, vol:"₿ 12.4", best:true  },
  { name:"Whitebird", rate:47240.55, vol:"₿ 8.1",  best:false },
  { name:"Dzengi.com",rate:47235.20, vol:"₿ 5.7",  best:false },
];

/* ── account switcher ── */
function AccountSwitcher() {
  const { mode, setMode } = useAccount();
  return (
    <div style={{ display:"flex", gap:"0", padding:"3px", borderRadius:"10px", background:"var(--surface-3)", border:"1px solid var(--border)", marginBottom:"14px" }}>
      {(["personal","business"] as const).map(m => {
        const on = mode===m;
        return (
          <button key={m} onClick={()=>setMode(m)} style={{
            flex:1, padding:"9px 8px", borderRadius:"7px", border:"none", cursor:"pointer", fontSize:"11px",
            fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase",
            background:on?"var(--surface-2)":"transparent",
            color:on?"var(--t1)":"var(--t3)",
            boxShadow:on?"0 1px 4px rgba(0,0,0,0.4)":"none",
            transition:"all 0.2s",
          }}>
            {m==="personal" ? "● Личный кабинет" : "◆ Бизнес / ВЭД"}
          </button>
        );
      })}
    </div>
  );
}

/* ── compliance ledger ── */
function ComplianceLedger() {
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"8px 12px", borderRadius:"var(--r)", background:"var(--green-bg)",
      border:"1px solid var(--green-bdr)", marginBottom:"18px",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
        <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--green)", animation:"pulse 2s ease-in-out infinite" }}/>
        <span style={{ fontSize:"10px", fontWeight:600, color:"var(--green)", letterSpacing:"0.06em" }}>
          УКАЗ №19 (РБ) · ФЗ-259 (РФ) · HTP · CFA
        </span>
      </div>
      <div style={{ padding:"3px 8px", borderRadius:"5px", background:"var(--green)", display:"flex", alignItems:"center", gap:"4px" }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span style={{ fontSize:"9px", fontWeight:800, color:"#fff", letterSpacing:"0.1em" }}>АКТИВНО</span>
      </div>
    </div>
  );
}

/* ── liquidity router ── */
function LiquidityRouter() {
  const best = EXCHANGES[0];
  const worst = EXCHANGES[EXCHANGES.length-1];
  const saving = (best.rate - worst.rate).toFixed(2);
  return (
    <div className="card s3 fu" style={{ padding:"14px 16px", marginBottom:"20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
        <div>
          <div className="lbl" style={{ marginBottom:"3px" }}>Арбитраж ликвидности ПВТ</div>
          <div style={{ fontSize:"12px", color:"var(--t2)" }}>Агрегация BTC/BYN · 3 платформы</div>
        </div>
        <div style={{ padding:"4px 10px", borderRadius:"6px", background:"var(--cyan-bg)", border:"1px solid var(--cyan-bdr)" }}>
          <span style={{ fontSize:"9px", fontWeight:700, color:"var(--cyan)", letterSpacing:"0.06em" }}>LIVE</span>
        </div>
      </div>
      {EXCHANGES.map((ex)=>{
        const pct = ((ex.rate - worst.rate) / (best.rate - worst.rate + 0.01)) * 100;
        const barW = 50 + pct * 0.5;
        return (
          <div key={ex.name} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{ width:"68px", fontSize:"11px", fontWeight:600, color: ex.best?"var(--green)":"var(--t2)", fontFamily:"var(--mono)" }}>{ex.name}</div>
            <div style={{ flex:1, height:"3px", background:"var(--surface-3)", borderRadius:"2px", overflow:"hidden" }}>
              <div style={{ width:`${barW}%`, height:"100%", background:ex.best?"var(--green)":"var(--border-2)", borderRadius:"2px", transition:"width 0.6s" }}/>
            </div>
            <div style={{ width:"76px", textAlign:"right", fontSize:"11px", fontWeight:600, color:ex.best?"var(--green)":"var(--t2)", fontFamily:"var(--mono)" }}>
              ${ex.rate.toLocaleString("en-US",{minimumFractionDigits:2})}
            </div>
            {ex.best && <div style={{ padding:"2px 6px", borderRadius:"4px", background:"var(--green)", flexShrink:0 }}><span style={{ fontSize:"8px", fontWeight:800, color:"#fff" }}>BEST</span></div>}
          </div>
        );
      })}
      <div style={{ marginTop:"8px", paddingTop:"8px", borderTop:"1px solid var(--border)", fontSize:"11px", color:"var(--t2)" }}>
        Маршрут: <span style={{ color:"var(--green)", fontWeight:600 }}>BYNEX</span> · Экономия: <span style={{ color:"var(--cyan)", fontWeight:600, fontFamily:"var(--mono)" }}>${saving}</span> на BTC
      </div>
    </div>
  );
}

/* ── price formatter ── */
function fmtPrice(p: number) {
  if (p >= 1000)  return `$${p.toLocaleString("en-US",{maximumFractionDigits:0})}`;
  if (p >= 1)     return `$${p.toFixed(2)}`;
  if (p >= 0.001) return `$${p.toFixed(4)}`;
  return `$${p.toFixed(5)}`;
}

/* ── main ── */
export default function HomeScreen({ onNavigate }: { onNavigate?: (t:Tab)=>void }) {
  const { mode } = useAccount();
  const [masked, setMasked]   = useState(false);
  const [filter, setFilter]   = useState<"all"|"stable"|"defi">("all");
  const balance = useCountUp(mode==="personal" ? 67204.50 : 2840000.00, 950);
  const mask = (s:string) => masked ? "── ── ──" : s;
  const person = mode==="personal";

  const ACTIONS = [
    { l:"Отправить", c:"var(--cyan)",  d:"M5 12h14M12 5l7 7-7 7",                     t:"bridge" as Tab },
    { l:"Получить",  c:"var(--green)", d:"M19 12H5M12 19l-7-7 7-7",                    t:"home"   as Tab },
    { l:"Bridge",    c:"#A78BFA",      d:"M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16",    t:"bridge" as Tab },
    { l:"Вклады",    c:"var(--gold)",  d:"M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6", t:"earn" as Tab },
  ];

  const visTokens = filter==="stable"
    ? TOKENS.filter(t=>["USDT","USDC","DAI"].includes(t.sym))
    : filter==="defi"
    ? TOKENS.filter(t=>["UNI","LINK","AAVE","MATIC","OP","ARB"].includes(t.sym))
    : TOKENS;

  return (
    <div style={{ padding:"20px 16px 32px" }}>

      {/* Account switcher */}
      <div className="fu"><AccountSwitcher/></div>

      {/* Compliance */}
      <div className="fu s1"><ComplianceLedger/></div>

      {/* Business header */}
      {!person && (
        <div className="fu s2 card-sm" style={{ padding:"12px 14px", marginBottom:"16px" }}>
          <div className="lbl" style={{ marginBottom:"4px" }}>Бизнес-счёт</div>
          <div style={{ fontSize:"15px", fontWeight:700, color:"var(--t1)", marginBottom:"2px" }}>ОАО «ТехноЛогик Плюс»</div>
          <div style={{ fontSize:"11px", color:"var(--t2)" }}>УНП 101123456 · IBAN BY44 ALFA 3135 1400 7993 0000 0000</div>
        </div>
      )}

      {/* Balance */}
      <div className="fu s2" style={{ marginBottom:"22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
          <span style={{ fontSize:"12px", color:"var(--t2)", fontWeight:500 }}>
            {person ? "Общий баланс" : "Расчётный счёт ВЭД"}
          </span>
          <button onClick={()=>setMasked(m=>!m)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:"2px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" strokeLinecap="round">
              {masked
                ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
              }
            </svg>
          </button>
        </div>

        <div className="cu" key={`${mode}-${masked}`} style={{ display:"flex", alignItems:"baseline", gap:"8px", marginBottom:"6px" }}>
          <span style={{ fontSize:"42px", fontWeight:700, color:"var(--t1)", letterSpacing:"-2.5px", lineHeight:1, fontFamily:"var(--mono)", fontVariantNumeric:"tabular-nums" }}>
            {mask(balance.toLocaleString("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}))}
          </span>
          <span style={{ fontSize:"16px", fontWeight:300, color:"var(--t2)", letterSpacing:"-0.3px" }}>BYN</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"12px", color:"var(--t3)", fontFamily:"var(--mono)" }}>
            {mask(`≈ $${(balance*0.274).toLocaleString("en-US",{maximumFractionDigits:0})}`)}
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:"4px", padding:"3px 8px", borderRadius:"5px", background:"var(--green-bg)", border:"1px solid var(--green-bdr)" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
            <span style={{ fontSize:"10px", fontWeight:700, color:"var(--green)", fontFamily:"var(--mono)" }}>+4.28%</span>
          </div>
          {!person && (
            <div style={{ padding:"3px 8px", borderRadius:"5px", background:"var(--gold-bg)", border:"1px solid var(--gold-bdr)" }}>
              <span style={{ fontSize:"9px", fontWeight:700, color:"var(--gold)", letterSpacing:"0.08em" }}>PREMIUM B2B</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="fu s3" style={{ display:"flex", gap:"8px", marginBottom:"24px" }}>
        {ACTIONS.map(a=>{
          const [pr, setPr] = useState(false);
          return (
            <button key={a.l}
              onPointerDown={()=>setPr(true)} onPointerUp={()=>{setPr(false);onNavigate?.(a.t);}} onPointerLeave={()=>setPr(false)}
              style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"7px",
                padding:"12px 4px 10px", borderRadius:"var(--r-lg)",
                border:"1px solid var(--border)", background:pr?"var(--surface-3)":"var(--surface)",
                transform:pr?"scale(0.92)":"scale(1)", transition:"all 0.12s cubic-bezier(0.34,1.56,0.64,1)", cursor:"pointer",
              }}
            >
              <div style={{ width:"38px", height:"38px", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", background:`${a.c}14`, border:`1px solid ${a.c}26` }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={a.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={a.d}/></svg>
              </div>
              <span style={{ fontSize:"9px", fontWeight:700, color:"var(--t2)", letterSpacing:"0.05em", textTransform:"uppercase" }}>{a.l}</span>
            </button>
          );
        })}
      </div>

      {/* Liquidity Router */}
      <LiquidityRouter/>

      {/* Crypto Matrix */}
      <div className="fu s4">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
          <div>
            <div style={{ fontSize:"15px", fontWeight:700, color:"var(--t1)" }}>Крипто-активы ПВТ</div>
            <div style={{ fontSize:"11px", color:"var(--t3)", marginTop:"2px" }}>26 разрешённых токенов · Нацбанк РБ</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"12px" }}>
          {(["all","stable","defi"] as const).map(f=>{
            const labels = { all:"Все", stable:"Стейблы", defi:"DeFi" };
            return (
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:"5px 12px", borderRadius:"6px", border:"1px solid",
                borderColor:filter===f?"var(--cyan-bdr)":"var(--border)",
                background:filter===f?"var(--cyan-bg)":"transparent",
                fontSize:"11px", fontWeight:600,
                color:filter===f?"var(--cyan)":"var(--t3)",
                cursor:"pointer", transition:"all 0.15s",
              }}>{labels[f]}</button>
            );
          })}
        </div>

        {/* Header row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 56px 80px 52px", gap:"8px", padding:"6px 12px", marginBottom:"4px" }}>
          {["Актив","7д","Цена","24ч"].map(h=>(
            <div key={h} style={{ fontSize:"9px", color:"var(--t3)", fontWeight:600, letterSpacing:"0.08em", textAlign:h==="Актив"?"left":"right" }}>{h}</div>
          ))}
        </div>

        <div className="card" style={{ overflow:"hidden", padding:0 }}>
          {visTokens.map((tk,i)=>(
            <div key={tk.sym} style={{
              display:"grid", gridTemplateColumns:"1fr 56px 80px 52px",
              alignItems:"center", gap:"8px", padding:"10px 12px",
              borderBottom:i<visTokens.length-1?"1px solid var(--border)":"none",
              cursor:"pointer", transition:"background 0.1s",
            }}
              onMouseEnter={e=>(e.currentTarget.style.background="var(--surface-2)")}
              onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
            >
              {/* Asset */}
              <div style={{ display:"flex", alignItems:"center", gap:"9px", minWidth:0 }}>
                <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"var(--surface-3)", border:"1px solid var(--border-2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:"10px", fontWeight:800, color:"var(--t2)", fontFamily:"var(--mono)" }}>{tk.sym.slice(0,3)}</span>
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:"13px", fontWeight:700, color:"var(--t1)", letterSpacing:"-0.2px" }}>{tk.sym}</div>
                  <div style={{ fontSize:"10px", color:"var(--t3)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{tk.name}</div>
                </div>
              </div>

              {/* Sparkline */}
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <Sparkline seed={tk.seed} up={tk.up}/>
              </div>

              {/* Price */}
              <div style={{ textAlign:"right", fontSize:"12px", fontWeight:600, color:"var(--t1)", fontFamily:"var(--mono)", letterSpacing:"-0.3px" }}>
                {fmtPrice(tk.p)}
              </div>

              {/* Change */}
              <div style={{ textAlign:"right", fontSize:"11px", fontWeight:700, color:tk.c>=0?"var(--green)":"var(--red)", fontFamily:"var(--mono)" }}>
                {tk.c>=0?"+":""}{tk.c.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", padding:"12px 0 4px" }}>
          <span style={{ fontSize:"10px", color:"var(--t3)" }}>Данные: BYNEX · Whitebird · Dzengi.com</span>
        </div>
      </div>
    </div>
  );
}
