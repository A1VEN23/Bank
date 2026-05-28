import { useState } from "react";

const IVORY = "#F5F0E8";
const IVORY_DIM = "rgba(245,240,232,0.05)";
const IVORY_BORDER = "rgba(245,240,232,0.08)";
const WARM = "#D4926A";

type Tx = {
  id: string;
  type: "receive" | "send" | "swap" | "deposit";
  desc: string;
  amount: string;
  sub: string;
  positive: boolean;
  time: string;
  date: string;
  score: number;
  txid: string;
  fee: string;
  network: string;
  node: string;
  party: string;
};

const TXS: Tx[] = [
  { id:"1", type:"receive", desc:"Received Bitcoin",        amount:"+0.0842 BTC",  sub:"+$3,978",    positive:true,  time:"14:32", date:"Today",     score:98,  txid:"a1b2c3d4e5f67890…",          fee:"0.000021 BTC", network:"Bitcoin Mainnet",  node:"BY-NODE-047",   party:"bc1q…k8z2"   },
  { id:"2", type:"swap",    desc:"B2B Bridge: RUB → CNY",  amount:"150,000 RUB",  sub:"−$1,650",    positive:false, time:"11:15", date:"Today",     score:100, txid:"tx_bridge_0x7a8b…",         fee:"375 RUB",      network:"PBT Bridge Layer", node:"RU-PBT-012",    party:"CNY Merchant" },
  { id:"3", type:"deposit", desc:"Crypto Deposit Opened",  amount:"+8.0% APY",    sub:"2,500 USDT", positive:true,  time:"09:48", date:"Today",     score:99,  txid:"dep_0x2c3d4e5f…",           fee:"0 USDT",       network:"TON Blockchain",   node:"BY-DEFI-003",   party:"Savings v2"   },
  { id:"4", type:"send",    desc:"Sent USDT",              amount:"−850 USDT",    sub:"−$850",      positive:false, time:"18:24", date:"Yesterday", score:97,  txid:"0x9e8d7c6b5a4f…",           fee:"1.2 USDT",     network:"TON Blockchain",   node:"BY-NODE-019",   party:"TVM…4fK9"     },
  { id:"5", type:"receive", desc:"Staking Reward",         amount:"+12.45 TON",   sub:"+$76.93",    positive:true,  time:"06:00", date:"Yesterday", score:100, txid:"ton_reward_7f8a…",          fee:"0.01 TON",     network:"TON Blockchain",   node:"AUTO-STAKE-01", party:"Staking Pool" },
  { id:"6", type:"swap",    desc:"Swapped ETH → USDT",    amount:"0.5 ETH",      sub:"+$1,309",    positive:true,  time:"13:11", date:"May 26",    score:96,  txid:"0x1a2b3c4d5e6f…",           fee:"0.0018 ETH",   network:"Ethereum Mainnet", node:"RU-NODE-088",   party:"DEX Router v3"},
];

const TYPE_GLYPH: Record<string, string> = {
  receive: "↓", send: "↑", swap: "⇄", deposit: "◈",
};

const grouped: Record<string, Tx[]> = {};
TXS.forEach((t) => { if (!grouped[t.date]) grouped[t.date] = []; grouped[t.date].push(t); });

function ScorePill({ score }: { score: number }) {
  const ok = score >= 95;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 7px", borderRadius: "6px", background: ok ? "rgba(212,146,106,0.08)" : "rgba(255,100,100,0.08)", border: `1px solid ${ok ? "rgba(212,146,106,0.2)" : "rgba(255,100,100,0.2)"}` }}>
      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: ok ? WARM : "#ff6464" }} />
      <span style={{ color: ok ? WARM : "#ff6464", fontSize: "9px", fontWeight: 600 }}>{score}</span>
    </div>
  );
}

function DetailRow({ label, value, hi }: { label: string; value: string; hi?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid rgba(245,240,232,0.04)" }}>
      <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "11px" }}>{label}</span>
      <span style={{ color: hi ? WARM : IVORY, fontSize: "11px", opacity: hi ? 1 : 0.7, fontFamily: label === "TXID" ? "monospace" : "inherit", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

export default function HistoryScreen() {
  const [selected, setSelected] = useState<Tx | null>(null);

  return (
    <div style={{ padding: "20px 22px 20px", position: "relative" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Neural AML Engine v4.2</div>
        <div style={{ fontSize: "28px", fontWeight: 200, color: IVORY, letterSpacing: "-1px", lineHeight: 1.2, marginBottom: "16px" }}>
          Transaction<br /><span style={{ color: WARM }}>Feed</span>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "16px", background: "rgba(212,146,106,0.05)", border: "1px solid rgba(212,146,106,0.12)" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "11px", background: "rgba(212,146,106,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "14px" }}>◉</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: IVORY, fontSize: "12px", fontWeight: 400, opacity: 0.8, marginBottom: "3px" }}>All Clear · 6 / 6 verified</div>
            <div style={{ color: "rgba(245,240,232,0.25)", fontSize: "10px" }}>Avg score 98.3 · 0 flags · Fully compliant</div>
          </div>
          <span style={{ color: WARM, fontSize: "12px", fontWeight: 600 }}>SAFE</span>
        </div>
      </div>

      {/* List */}
      {Object.entries(grouped).map(([date, txs]) => (
        <div key={date} style={{ marginBottom: "4px" }}>
          <div style={{ color: "rgba(245,240,232,0.18)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px", paddingTop: "8px" }}>{date}</div>
          {txs.map((tx) => (
            <button key={tx.id} onClick={() => setSelected(tx)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "14px",
              padding: "14px 4px", background: "none", border: "none", cursor: "pointer",
              borderBottom: "1px solid rgba(245,240,232,0.04)", textAlign: "left",
              transition: "opacity 0.15s",
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: IVORY, fontSize: "14px", fontWeight: 200, opacity: 0.5 }}>{TYPE_GLYPH[tx.type]}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: IVORY, fontSize: "13px", opacity: 0.8, marginBottom: "5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ScorePill score={tx.score} />
                  <span style={{ color: "rgba(245,240,232,0.18)", fontSize: "10px" }}>{tx.time}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: tx.positive ? WARM : IVORY, fontSize: "13px", opacity: tx.positive ? 1 : 0.7, marginBottom: "3px" }}>{tx.amount}</div>
                <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px" }}>{tx.sub}</div>
              </div>
            </button>
          ))}
        </div>
      ))}

      {/* Detail sheet */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "absolute", inset: 0, zIndex: 50,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              borderRadius: "28px 28px 44px 44px",
              padding: "24px 24px 32px",
              background: "linear-gradient(180deg, #181410 0%, #0f0c0a 100%)",
              border: "1px solid rgba(245,240,232,0.07)",
              borderBottom: "none",
            }}
          >
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "rgba(245,240,232,0.12)" }} />
            </div>

            {/* Title */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <div style={{ color: IVORY, fontSize: "16px", fontWeight: 300, opacity: 0.9, marginBottom: "6px" }}>{selected.desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "11px" }}>AI Verified</span>
                  <ScorePill score={selected.score} />
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ width: "32px", height: "32px", borderRadius: "10px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, cursor: "pointer", color: IVORY, fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            {/* Amount */}
            <div style={{ padding: "16px 20px", borderRadius: "16px", background: "rgba(212,146,106,0.05)", border: "1px solid rgba(212,146,106,0.12)", textAlign: "center", marginBottom: "20px" }}>
              <div style={{ color: selected.positive ? WARM : IVORY, fontSize: "28px", fontWeight: 200, letterSpacing: "-1px", marginBottom: "4px" }}>{selected.amount}</div>
              <div style={{ color: "rgba(245,240,232,0.25)", fontSize: "12px" }}>{selected.sub}</div>
            </div>

            {/* Details */}
            <DetailRow label="TXID"    value={selected.txid}    />
            <DetailRow label="Network" value={selected.network} />
            <DetailRow label="Fee"     value={selected.fee}     />
            <DetailRow label="Node"    value={selected.node}    hi />
            <DetailRow label="Time"    value={`${selected.date} · ${selected.time}`} />
            <DetailRow label="Party"   value={selected.party}   />

            {/* Verdict */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "14px", background: "rgba(212,146,106,0.06)", border: "1px solid rgba(212,146,106,0.14)", marginTop: "16px" }}>
              <span style={{ fontSize: "18px" }}>◉</span>
              <div>
                <div style={{ color: WARM, fontSize: "12px", fontWeight: 500, marginBottom: "3px" }}>Neural AML Verdict: LEGAL & SAFE</div>
                <div style={{ color: "rgba(245,240,232,0.22)", fontSize: "10px" }}>No sanctions match · Score {selected.score}/100 · Decree No. 19 compliant</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
