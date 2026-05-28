import { useState } from "react";

const TARGETS = ["CNY","AED","TRY","INR","USD","EUR","KZT"];
const RATES: Record<string,number> = { CNY:0.0809,AED:0.0277,TRY:0.882,INR:0.847,USD:0.011,EUR:0.0101,KZT:4.98 };

type State = "idle"|"checking"|"ready"|"executing"|"done";

function PrimaryBtn({ label, onClick, state }: { label:string; onClick:()=>void; state?:State }) {
  const [down, setDown] = useState(false);
  const busy = state === "executing";
  return (
    <button
      onPointerDown={() => setDown(true)}
      onPointerUp={() => { setDown(false); onClick(); }}
      onPointerLeave={() => setDown(false)}
      disabled={busy}
      style={{
        width:"100%", padding:"18px", borderRadius:"18px", border:"none",
        fontSize:"14px", fontWeight:700, letterSpacing:"0.03em",
        cursor: busy ? "default" : "pointer",
        background: state==="done"
          ? "#16A34A"
          : "var(--dark)",
        color: state==="done" ? "#fff" : "#fff",
        transform: down ? "scale(0.97)" : "scale(1)",
        transition:"transform 0.12s ease, background 0.3s ease, box-shadow 0.12s ease",
        boxShadow: down ? "0 2px 8px rgba(0,0,0,0.15)" : "0 4px 20px rgba(10,9,8,0.25), 0 1px 0 rgba(255,255,255,0.05) inset",
        display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
      }}
    >
      {state==="executing" && (
        <svg className="spin-anim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      )}
      {state==="done" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      )}
      {state==="done" ? "Transfer Sent!" : state==="executing" ? "Processing…" : label}
    </button>
  );
}

function RouteStep({ label, sub, highlight }: { label:string; sub:string; highlight?:boolean }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", gap:"3px",
      padding:"10px 14px", borderRadius:"14px",
      background: highlight ? "var(--dark)" : "var(--ink-04)",
      border: `1px solid ${highlight ? "transparent" : "var(--border)"}`,
    }}>
      <span style={{ fontSize:"13px", fontWeight:700, color: highlight ? "#fff" : "var(--ink)", letterSpacing:"0.02em" }}>{label}</span>
      <span style={{ fontSize:"9px", color: highlight ? "rgba(255,255,255,0.4)" : "var(--ink-35)", letterSpacing:"0.08em" }}>{sub}</span>
    </div>
  );
}

export default function BridgeScreen() {
  const [amount, setAmount] = useState("150000");
  const [to, setTo] = useState("CNY");
  const [txState, setTxState] = useState<State>("idle");

  const num = parseFloat(amount)||0;
  const rate = RATES[to]??0.01;
  const received = (num*rate).toLocaleString("en-US",{maximumFractionDigits:2});
  const fee = (num*0.0025).toLocaleString("en-US",{maximumFractionDigits:0});

  const execute = () => {
    if(txState!=="idle") return;
    setTxState("executing");
    setTimeout(()=>{ setTxState("done"); setTimeout(()=>setTxState("idle"),3500); },2200);
  };

  return (
    <div style={{ padding:"20px 20px 28px" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"28px" }}>
        <div style={{ fontSize:"11px", color:"var(--ink-35)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginBottom:"8px" }}>Decree No. 19 · SWIFT-Free</div>
        <div style={{ fontSize:"30px", fontWeight:700, color:"var(--ink)", letterSpacing:"-1px", lineHeight:1.1 }}>
          Transborder<br/><span style={{ color:"var(--ink-60)", fontWeight:300 }}>Bridge</span>
        </div>
      </div>

      {/* Sanction badge */}
      <div className="fade-up card-sm" style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", marginBottom:"20px", animationDelay:"0.05s" }}>
        <div style={{ width:"38px", height:"38px", borderRadius:"12px", background:"#DCFCE7", border:"1px solid rgba(22,163,74,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"13px", fontWeight:600, color:"var(--ink)", marginBottom:"3px" }}>AI Risk & Sanction Check</div>
          <div style={{ fontSize:"10px", color:"var(--ink-35)" }}>OFAC · EU · UN · FinCEN — All lists clear</div>
        </div>
        <div style={{ padding:"5px 10px", borderRadius:"8px", background:"#DCFCE7", border:"1px solid rgba(22,163,74,0.2)" }}>
          <span style={{ fontSize:"10px", fontWeight:700, color:"#15803D" }}>100% CLEAN</span>
        </div>
      </div>

      {/* Transfer form */}
      <div className="fade-up card" style={{ padding:"20px", marginBottom:"14px", animationDelay:"0.08s" }}>
        <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginBottom:"16px" }}>Transfer Details</div>

        {/* Send */}
        <div style={{ padding:"16px", borderRadius:"16px", background:"var(--ink-04)", border:"1px solid var(--border)", marginBottom:"8px" }}>
          <div style={{ fontSize:"10px", color:"var(--ink-35)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>You Send</div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
              style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:"30px", fontWeight:300, color:"var(--ink)", letterSpacing:"-1px", fontVariantNumeric:"tabular-nums" }}
              placeholder="0"
            />
            <div style={{ padding:"8px 14px", borderRadius:"12px", background:"var(--dark)", color:"#fff", fontSize:"13px", fontWeight:700, letterSpacing:"0.04em" }}>RUB</div>
          </div>
          <div style={{ fontSize:"11px", color:"var(--ink-35)", marginTop:"6px" }}>≈ ${(num*0.011).toFixed(2)} USD</div>
        </div>

        {/* Swap arrow */}
        <div style={{ display:"flex", justifyContent:"center", margin:"4px 0" }}>
          <div style={{ width:"34px", height:"34px", borderRadius:"11px", background:"var(--surface)", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-60)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </div>
        </div>

        {/* Receive */}
        <div style={{ padding:"16px", borderRadius:"16px", background:"var(--ink-04)", border:"1px solid var(--border)" }}>
          <div style={{ fontSize:"10px", color:"var(--ink-35)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>They Receive</div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ flex:1, fontSize:"30px", fontWeight:300, color:"var(--ink)", letterSpacing:"-1px" }}>{received}</div>
            <div style={{ position:"relative" }}>
              <select value={to} onChange={e=>setTo(e.target.value)}
                style={{ padding:"8px 32px 8px 14px", borderRadius:"12px", background:"var(--dark)", color:"#fff", fontSize:"13px", fontWeight:700, border:"none", cursor:"pointer", outline:"none", letterSpacing:"0.04em" }}
              >
                {TARGETS.map(t=><option key={t} value={t} style={{ background:"#1a1a1a" }}>{t}</option>)}
              </select>
              <svg style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div style={{ fontSize:"11px", color:"var(--ink-35)", marginTop:"6px" }}>Rate: 1 RUB = {rate} {to}</div>
        </div>
      </div>

      {/* Route */}
      <div className="fade-up card-sm" style={{ padding:"16px 18px", marginBottom:"14px", animationDelay:"0.1s" }}>
        <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginBottom:"12px" }}>Live Routing Path</div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px", flexWrap:"wrap" }}>
          <RouteStep label="RUB" sub="Fiat" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-18)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          <RouteStep label="USDT" sub="~30s" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-18)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          <RouteStep label={to} sub="~2m" highlight />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
          {[{ l:"Total Fee", v:`~${fee} RUB` }, { l:"Est. Time", v:"~2m 30s" }, { l:"Legal Node", v:"BY-PBT-012" }].map(r=>(
            <div key={r.l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"9px", color:"var(--ink-35)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" }}>{r.l}</div>
              <div style={{ fontSize:"12px", fontWeight:600, color:"var(--ink)" }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="fade-up" style={{ padding:"12px 16px", borderRadius:"14px", background:"var(--ink-04)", border:"1px solid var(--border)", marginBottom:"16px", animationDelay:"0.12s" }}>
        <p style={{ fontSize:"10px", color:"var(--ink-35)", lineHeight:1.7 }}>
          Compliant with Decree No. 19 (BY) and Federal Law 259-FZ (RU). All transfers routed through licensed PBT brokers with full KYC/AML screening.
        </p>
      </div>

      <div className="fade-up" style={{ animationDelay:"0.14s" }}>
        <PrimaryBtn label="Execute Legal Transfer" onClick={execute} state={txState} />
      </div>
    </div>
  );
}
