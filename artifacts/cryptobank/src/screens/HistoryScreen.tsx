import { useState } from "react";

type Tx = {
  id:string; type:"receive"|"send"|"swap"|"deposit";
  desc:string; amount:string; sub:string; positive:boolean;
  time:string; date:string; score:number; txid:string;
  fee:string; network:string; node:string; party:string;
};

const TXS: Tx[] = [
  { id:"1", type:"receive", desc:"Received Bitcoin",        amount:"+0.0842 BTC", sub:"+$3,978",  positive:true,  time:"14:32", date:"Today",     score:98,  txid:"a1b2c3d4e5f67890abcdef", fee:"0.000021 BTC", network:"Bitcoin Mainnet",  node:"BY-NODE-047",  party:"bc1q…k8z2"    },
  { id:"2", type:"swap",    desc:"B2B Bridge: RUB → CNY",  amount:"150,000 RUB", sub:"−$1,650",  positive:false, time:"11:15", date:"Today",     score:100, txid:"tx_bridge_0x7a8b9c0d",  fee:"375 RUB",      network:"PBT Bridge Layer", node:"RU-PBT-012",   party:"CNY Merchant" },
  { id:"3", type:"deposit", desc:"Crypto Deposit Opened",  amount:"+8.0% APY",   sub:"2,500 USDT",positive:true, time:"09:48", date:"Today",     score:99,  txid:"dep_0x2c3d4e5f6a7b",    fee:"0 USDT",       network:"TON Blockchain",   node:"BY-DEFI-003",  party:"Savings v2"   },
  { id:"4", type:"send",    desc:"Sent USDT",              amount:"−850 USDT",   sub:"−$850",    positive:false, time:"18:24", date:"Yesterday", score:97,  txid:"0x9e8d7c6b5a4f3e2d",    fee:"1.2 USDT",     network:"TON Blockchain",   node:"BY-NODE-019",  party:"TVM…4fK9"     },
  { id:"5", type:"receive", desc:"Staking Reward",         amount:"+12.45 TON",  sub:"+$76.93",  positive:true,  time:"06:00", date:"Yesterday", score:100, txid:"ton_reward_7f8a9b0c",    fee:"0.01 TON",     network:"TON Blockchain",   node:"AUTO-STAKE-01",party:"Staking Pool" },
  { id:"6", type:"swap",    desc:"Swapped ETH → USDT",    amount:"0.5 ETH",     sub:"+$1,309",  positive:true,  time:"13:11", date:"May 26",    score:96,  txid:"0x1a2b3c4d5e6f7a8b",    fee:"0.0018 ETH",   network:"Ethereum Mainnet", node:"RU-NODE-088",  party:"DEX Router v3"},
];

const GLYPH: Record<string,string> = { receive:"↓", send:"↑", swap:"⇄", deposit:"◈" };
const ICON_STYLE: Record<string,{bg:string;border:string;color:string}> = {
  receive: { bg:"#DCFCE7", border:"rgba(22,163,74,0.2)",  color:"#15803D" },
  send:    { bg:"#FEE2E2", border:"rgba(220,38,38,0.2)",  color:"#DC2626" },
  swap:    { bg:"#EDE9FE", border:"rgba(139,92,246,0.2)", color:"#7C3AED" },
  deposit: { bg:"#FEF3C7", border:"rgba(245,158,11,0.2)", color:"#B45309" },
};

const grouped: Record<string,Tx[]> = {};
TXS.forEach(t=>{ if(!grouped[t.date]) grouped[t.date]=[]; grouped[t.date].push(t); });

function Score({ score }: { score:number }) {
  const ok = score >= 95;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"3px 8px", borderRadius:"6px", background:ok?"#DCFCE7":"#FEE2E2", border:`1px solid ${ok?"rgba(22,163,74,0.25)":"rgba(220,38,38,0.25)"}` }}>
      <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:ok?"#16A34A":"#DC2626" }} />
      <span style={{ fontSize:"9px", fontWeight:700, color:ok?"#15803D":"#DC2626" }}>{score}</span>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label:string; value:string; mono?:boolean }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
      <span style={{ fontSize:"12px", color:"var(--ink-35)", fontWeight:500 }}>{label}</span>
      <span style={{ fontSize:"12px", color:"var(--ink)", fontWeight:500, fontFamily:mono?"monospace":"inherit", maxWidth:"180px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{value}</span>
    </div>
  );
}

export default function HistoryScreen() {
  const [sel, setSel] = useState<Tx|null>(null);

  return (
    <div style={{ padding:"20px 20px 28px", position:"relative" }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:"22px" }}>
        <div style={{ fontSize:"11px", color:"var(--ink-35)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginBottom:"8px" }}>Neural AML Engine v4.2</div>
        <div style={{ fontSize:"30px", fontWeight:700, color:"var(--ink)", letterSpacing:"-1px", lineHeight:1.1, marginBottom:"16px" }}>
          Transaction<br/><span style={{ fontWeight:300, color:"var(--ink-60)" }}>Feed</span>
        </div>

        {/* Summary banner */}
        <div style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", borderRadius:"18px", background:"#DCFCE7", border:"1px solid rgba(22,163,74,0.2)" }}>
          <div style={{ width:"38px", height:"38px", borderRadius:"12px", background:"rgba(22,163,74,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"#15803D", marginBottom:"3px" }}>All Clear — 6/6 Verified</div>
            <div style={{ fontSize:"10px", color:"#16A34A", opacity:0.7 }}>Avg score 98.3 · 0 flags · Fully compliant</div>
          </div>
          <div style={{ padding:"5px 10px", borderRadius:"8px", background:"rgba(22,163,74,0.15)" }}>
            <span style={{ fontSize:"11px", fontWeight:700, color:"#15803D" }}>SAFE</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      {Object.entries(grouped).map(([date,txs])=>(
        <div key={date} style={{ marginBottom:"6px" }}>
          <div style={{ fontSize:"10px", color:"var(--ink-35)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginBottom:"10px", paddingTop:"6px" }}>{date}</div>
          <div className="card" style={{ overflow:"hidden", padding:0 }}>
            {txs.map((tx,i)=>{
              const style = ICON_STYLE[tx.type];
              return (
                <button key={tx.id} onClick={()=>setSel(tx)}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"14px",
                    padding:"14px 18px",
                    borderBottom: i<txs.length-1?"1px solid var(--border)":"none",
                    background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                    transition:"background 0.15s ease",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(10,9,8,0.025)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                >
                  <div style={{ width:"40px", height:"40px", borderRadius:"13px", background:style.bg, border:`1px solid ${style.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:"16px", fontWeight:300, color:style.color }}>{GLYPH[tx.type]}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"14px", fontWeight:600, color:"var(--ink)", marginBottom:"5px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tx.desc}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <Score score={tx.score}/>
                      <span style={{ fontSize:"10px", color:"var(--ink-35)" }}>{tx.time}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:"14px", fontWeight:700, color:tx.positive?"#16A34A":"var(--ink)", marginBottom:"3px" }}>{tx.amount}</div>
                    <div style={{ fontSize:"10px", color:"var(--ink-35)" }}>{tx.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Detail sheet */}
      {sel && (
        <div className="slide-up"
          onClick={()=>setSel(null)}
          style={{
            position:"absolute", inset:0, zIndex:50,
            display:"flex", flexDirection:"column", justifyContent:"flex-end",
            background:"rgba(15,13,10,0.5)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)",
          }}
        >
          <div onClick={e=>e.stopPropagation()} style={{
            borderRadius:"28px 28px 52px 52px",
            background:"var(--surface)", padding:"24px 24px 32px",
            boxShadow:"0 -8px 40px rgba(15,13,10,0.12)",
          }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
              <div style={{ width:"40px", height:"5px", borderRadius:"3px", background:"var(--ink-08)" }} />
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
              <div>
                <div style={{ fontSize:"18px", fontWeight:700, color:"var(--ink)", marginBottom:"7px" }}>{sel.desc}</div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <Score score={sel.score}/>
                  <span style={{ fontSize:"11px", color:"var(--ink-35)" }}>Neural AML Verified</span>
                </div>
              </div>
              <button onClick={()=>setSel(null)} style={{
                width:"34px", height:"34px", borderRadius:"10px",
                background:"var(--ink-04)", border:"1px solid var(--border)",
                cursor:"pointer", fontSize:"16px", color:"var(--ink-60)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>×</button>
            </div>

            <div style={{ padding:"18px 20px", borderRadius:"18px", background:sel.positive?"#DCFCE7":"#F3F4F6", border:`1px solid ${sel.positive?"rgba(22,163,74,0.2)":"var(--border)"}`, textAlign:"center", marginBottom:"20px" }}>
              <div style={{ fontSize:"30px", fontWeight:300, color:sel.positive?"#15803D":"var(--ink)", letterSpacing:"-1px", marginBottom:"4px" }}>{sel.amount}</div>
              <div style={{ fontSize:"12px", color:"var(--ink-35)" }}>{sel.sub}</div>
            </div>

            <DetailRow label="TXID"    value={sel.txid}    mono />
            <DetailRow label="Network" value={sel.network}      />
            <DetailRow label="Fee"     value={sel.fee}          />
            <DetailRow label="Node"    value={sel.node}         />
            <DetailRow label="Time"    value={`${sel.date} · ${sel.time}`} />
            <DetailRow label="Party"   value={sel.party}        />

            <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", borderRadius:"16px", background:"#DCFCE7", border:"1px solid rgba(22,163,74,0.2)", marginTop:"16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <div>
                <div style={{ fontSize:"12px", fontWeight:700, color:"#15803D", marginBottom:"3px" }}>Neural AML Verdict: LEGAL & SAFE</div>
                <div style={{ fontSize:"10px", color:"#16A34A", opacity:0.7 }}>No sanctions match · Score {sel.score}/100 · Decree No. 19</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
