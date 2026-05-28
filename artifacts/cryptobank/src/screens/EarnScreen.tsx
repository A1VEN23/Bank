import { useState } from "react";

const PRODUCTS = [
  { asset:"BTC",  apy:8.0, term:"90 days", min:"0.01 BTC",  tag:"Highest Yield", color:"#F59E0B", bg:"#FEF3C7", border:"rgba(245,158,11,0.2)", textColor:"#B45309" },
  { asset:"USDT", apy:6.5, term:"30 days", min:"500 USDT",  tag:"Most Popular",  color:"#16A34A", bg:"#DCFCE7", border:"rgba(22,163,74,0.2)",   textColor:"#15803D" },
  { asset:"ETH",  apy:5.2, term:"60 days", min:"0.1 ETH",   tag:null,            color:"#8B5CF6", bg:"#EDE9FE", border:"rgba(139,92,246,0.2)",   textColor:"#7C3AED" },
];

function Tab({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) {
  const [down, setDown] = useState(false);
  return (
    <button
      onPointerDown={()=>setDown(true)}
      onPointerUp={()=>{ setDown(false); onClick(); }}
      onPointerLeave={()=>setDown(false)}
      style={{
        flex:1, padding:"11px 8px", borderRadius:"14px", border:"none", cursor:"pointer",
        fontWeight: active ? 700 : 500, fontSize:"13px", letterSpacing:"0.02em",
        background: active ? "var(--dark)" : "transparent",
        color: active ? "#fff" : "var(--ink-60)",
        transform: down ? "scale(0.97)" : "scale(1)",
        transition:"transform 0.1s ease, background 0.2s ease, color 0.2s ease",
        boxShadow: active ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
      }}
    >{label}</button>
  );
}

export default function EarnScreen() {
  const [tab, setTab] = useState<"deposit"|"loan">("deposit");
  const [sel, setSel] = useState("BTC");
  const [amt, setAmt] = useState(5000);
  const [coll, setColl] = useState(0.5);

  const p = PRODUCTS.find(x=>x.asset===sel)||PRODUCTS[0];
  const monthly = (amt*(p.apy/100)/12).toFixed(2);
  const annual  = (amt*(p.apy/100)).toFixed(2);
  const collVal = Math.round(coll*47248);
  const maxLoan = Math.round(collVal*0.65);

  return (
    <div style={{ padding:"20px 20px 28px" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"28px" }}>
        <div style={{ fontSize:"11px", color:"var(--ink-35)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginBottom:"8px" }}>Decree No. 19 · Compliant</div>
        <div style={{ fontSize:"30px", fontWeight:700, color:"var(--ink)", letterSpacing:"-1px", lineHeight:1.1 }}>
          Earn &<br/><span style={{ fontWeight:300, color:"var(--ink-60)" }}>Deposits</span>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="fade-up" style={{ display:"flex", padding:"5px", borderRadius:"18px", background:"var(--ink-04)", border:"1px solid var(--border)", marginBottom:"24px", animationDelay:"0.05s" }}>
        <Tab label="Crypto Deposit" active={tab==="deposit"} onClick={()=>setTab("deposit")} />
        <Tab label="Crypto Loan"    active={tab==="loan"}    onClick={()=>setTab("loan")}    />
      </div>

      {tab==="deposit" && (
        <>
          {/* Products */}
          <div className="fade-up stagger" style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"22px", animationDelay:"0.08s" }}>
            {PRODUCTS.map(prod=>{
              const active = sel===prod.asset;
              return (
                <button key={prod.asset} onClick={()=>setSel(prod.asset)}
                  style={{
                    display:"flex", alignItems:"center", gap:"14px", padding:"16px 18px",
                    borderRadius:"20px", cursor:"pointer", border:"none", textAlign:"left",
                    background: active ? "var(--dark)" : "var(--surface)",
                    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.2)" : "var(--shadow-sm)",
                    transform: active ? "scale(1.01)" : "scale(1)",
                    transition:"all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:prod.bg, border:`1px solid ${prod.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:"14px", fontWeight:800, color:prod.textColor }}>{prod.asset.slice(0,1)}</span>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"14px", fontWeight:600, color:active?"#fff":"var(--ink)" }}>{prod.asset} Deposit</span>
                      {prod.tag&&<span style={{ padding:"2px 8px", borderRadius:"6px", background:active?"rgba(255,255,255,0.12)":prod.bg, color:active?"rgba(255,255,255,0.7)":prod.textColor, fontSize:"9px", fontWeight:700, letterSpacing:"0.05em" }}>{prod.tag}</span>}
                    </div>
                    <div style={{ fontSize:"10px", color:active?"rgba(255,255,255,0.4)":"var(--ink-35)" }}>Min {prod.min} · {prod.term}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:"24px", fontWeight:200, color:active?"#fff":prod.color, letterSpacing:"-0.5px" }}>{prod.apy}%</div>
                    <div style={{ fontSize:"9px", color:active?"rgba(255,255,255,0.35)":"var(--ink-35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>APY</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calculator */}
          <div className="fade-up card" style={{ padding:"22px", animationDelay:"0.12s" }}>
            <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginBottom:"18px" }}>Earnings Calculator</div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"12px" }}>
              <span style={{ fontSize:"13px", color:"var(--ink-60)" }}>Deposit Amount</span>
              <span style={{ fontSize:"22px", fontWeight:300, color:"var(--ink)", letterSpacing:"-0.5px" }}>${amt.toLocaleString()}</span>
            </div>

            <input type="range" min={100} max={50000} step={100} value={amt} onChange={e=>setAmt(+e.target.value)}
              style={{ width:"100%", marginBottom:"20px",
                background:`linear-gradient(to right, var(--dark) ${(amt/50000)*100}%, rgba(15,13,10,0.1) ${(amt/50000)*100}%)` }}
            />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"18px" }}>
              {[{l:"Monthly",v:`$${monthly}`},{l:"Annual",v:`$${annual}`}].map(item=>(
                <div key={item.l} style={{ padding:"16px", borderRadius:"16px", background:"var(--ink-04)", border:"1px solid var(--border)", textAlign:"center" }}>
                  <div style={{ fontSize:"9px", color:"var(--ink-35)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>{item.l}</div>
                  <div style={{ fontSize:"24px", fontWeight:300, color:"var(--ink)", letterSpacing:"-0.5px" }}>{item.v}</div>
                </div>
              ))}
            </div>

            <button
              style={{
                width:"100%", padding:"17px", borderRadius:"16px", border:"none",
                background:"var(--dark)", color:"#fff", fontSize:"14px", fontWeight:700,
                letterSpacing:"0.03em", cursor:"pointer",
                boxShadow:"0 4px 20px rgba(10,9,8,0.25)",
                transition:"transform 0.1s ease",
              }}
              onPointerDown={e=>(e.currentTarget.style.transform="scale(0.97)")}
              onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
              onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              Open {p.apy}% APY Deposit
            </button>
          </div>
        </>
      )}

      {tab==="loan" && (
        <>
          {/* Loan card */}
          <div className="fade-up card" style={{ padding:"22px", marginBottom:"14px", animationDelay:"0.08s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"22px" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:"#FEF3C7", border:"1px solid rgba(245,158,11,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"14px", fontWeight:800, color:"#B45309" }}>B</span>
              </div>
              <div>
                <div style={{ fontSize:"15px", fontWeight:600, color:"var(--ink)" }}>BTC-Backed Loan</div>
                <div style={{ fontSize:"11px", color:"var(--ink-35)", marginTop:"2px" }}>Borrow fiat using BTC as collateral</div>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
              <span style={{ fontSize:"13px", color:"var(--ink-60)" }}>BTC Collateral</span>
              <span style={{ fontSize:"18px", fontWeight:300, color:"var(--ink)", letterSpacing:"-0.5px" }}>{coll} BTC</span>
            </div>
            <input type="range" min={0.01} max={5} step={0.01} value={coll} onChange={e=>setColl(+e.target.value)}
              style={{ width:"100%", marginBottom:"22px",
                background:`linear-gradient(to right, var(--dark) ${(coll/5)*100}%, rgba(15,13,10,0.1) ${(coll/5)*100}%)` }}
            />

            {/* LTV bar */}
            <div style={{ marginBottom:"22px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                <span style={{ fontSize:"12px", color:"var(--ink-60)" }}>Loan-to-Value</span>
                <span style={{ fontSize:"12px", fontWeight:700, color:"#16A34A" }}>65% — Safe Zone</span>
              </div>
              <div style={{ height:"6px", borderRadius:"3px", background:"var(--ink-08)", overflow:"hidden" }}>
                <div style={{ width:"65%", height:"100%", borderRadius:"3px", background:"linear-gradient(90deg,#16A34A,#4ade80)", transition:"width 0.4s ease" }} />
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"5px" }}>
                <span style={{ fontSize:"9px", color:"var(--ink-35)" }}>Liquidation at 85% LTV</span>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"20px" }}>
              {[
                { l:"Collateral Value", v:`$${collVal.toLocaleString()}` },
                { l:"Max Borrow",       v:`$${maxLoan.toLocaleString()}`, hi:true },
                { l:"Interest Rate",    v:"4.5% APR" },
                { l:"Term",             v:"Flexible" },
              ].map(row=>(
                <div key={row.l} style={{ padding:"14px", borderRadius:"14px", background:"var(--ink-04)", border:"1px solid var(--border)" }}>
                  <div style={{ fontSize:"9px", color:"var(--ink-35)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"6px" }}>{row.l}</div>
                  <div style={{ fontSize:"16px", fontWeight: row.hi?700:400, color:row.hi?"var(--ink)":"var(--ink)", opacity:row.hi?1:0.8 }}>{row.v}</div>
                </div>
              ))}
            </div>

            <button
              style={{
                width:"100%", padding:"17px", borderRadius:"16px", border:"none",
                background:"var(--dark)", color:"#fff", fontSize:"14px", fontWeight:700,
                letterSpacing:"0.03em", cursor:"pointer", boxShadow:"0 4px 20px rgba(10,9,8,0.25)",
                transition:"transform 0.1s ease",
              }}
              onPointerDown={e=>(e.currentTarget.style.transform="scale(0.97)")}
              onPointerUp={e=>(e.currentTarget.style.transform="scale(1)")}
              onPointerLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >Apply for BTC-Backed Loan</button>
          </div>

          <div style={{ padding:"12px 16px", borderRadius:"14px", background:"var(--ink-04)", border:"1px solid var(--border)" }}>
            <p style={{ fontSize:"10px", color:"var(--ink-35)", lineHeight:1.7 }}>Collateral held in licensed custody under Decree No. 19. Liquidation notice issued 24 hours in advance.</p>
          </div>
        </>
      )}
    </div>
  );
}
