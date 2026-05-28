import { useState } from "react";

const IVORY = "#F5F0E8";
const IVORY_DIM = "rgba(245,240,232,0.06)";
const IVORY_BORDER = "rgba(245,240,232,0.08)";
const WARM = "#D4926A";

const assets = [
  { sym: "BTC", name: "Bitcoin",      price: "$47,248", chg: "+3.84%", alloc: 78, hold: "0.32 BTC"  },
  { sym: "ETH", name: "Ethereum",     price: "$2,618",  chg: "+2.11%", alloc: 52, hold: "2.15 ETH"  },
  { sym: "TON", name: "TON Crystal",  price: "$6.18",   chg: "+4.72%", alloc: 34, hold: "450 TON"   },
  { sym: "USDT",name: "Tether",       price: "$1.000",  chg: "+0.01%", alloc: 24, hold: "12,500 USDT"},
];

const actions = [
  { sym: "↑", label: "Send"    },
  { sym: "↓", label: "Receive" },
  { sym: "⇄", label: "Bridge"  },
  { sym: "◈", label: "Earn"    },
];

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0 16px" }}>
      <div style={{ flex: 1, height: "1px", background: "rgba(245,240,232,0.05)" }} />
      <span style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: "rgba(245,240,232,0.05)" }} />
    </div>
  );
}

export default function HomeScreen() {
  const [hidden, setHidden] = useState(false);
  const hide = (v: string) => hidden ? "• • • • • •" : v;

  return (
    <div style={{ padding: "20px 22px 20px" }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "14px",
            background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <span style={{ color: IVORY, fontSize: "14px", fontWeight: 600, opacity: 0.85 }}>АК</span>
            <div className="pulse-warm" style={{
              position: "absolute", bottom: "-1px", right: "-1px",
              width: "9px", height: "9px", borderRadius: "50%",
              background: WARM, border: "1.5px solid #0a0908",
            }} />
          </div>
          <div>
            <div style={{ color: "rgba(245,240,232,0.22)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>Private Banking</div>
            <div style={{ color: IVORY, fontSize: "15px", fontWeight: 400, opacity: 0.9 }}>Alexei Koval</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{
            padding: "6px 12px", borderRadius: "20px",
            background: "rgba(212,146,106,0.08)", border: "1px solid rgba(212,146,106,0.18)",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: WARM, boxShadow: `0 0 6px ${WARM}` }} />
            <span style={{ color: "rgba(212,146,106,0.8)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em" }}>AI SHIELD</span>
          </div>
          <button style={{
            width: "36px", height: "36px", borderRadius: "12px",
            background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", position: "relative",
          }}>
            <span style={{ fontSize: "14px", opacity: 0.5 }}>🔔</span>
            <div style={{ position: "absolute", top: "7px", right: "7px", width: "6px", height: "6px", borderRadius: "50%", background: "#c0392b", border: "1.5px solid #0a0908" }} />
          </button>
        </div>
      </div>

      {/* ── Balance ── */}
      <div style={{ marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: WARM, boxShadow: `0 0 8px ${WARM}` }} />
          <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Total Wealth</span>
          <button onClick={() => setHidden(!hidden)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", opacity: 0.3, color: IVORY, fontSize: "12px" }}>
            {hidden ? "◉" : "○"}
          </button>
        </div>

        <div style={{ fontSize: "54px", fontWeight: 200, color: IVORY, letterSpacing: "-3px", lineHeight: 1, marginBottom: "8px" }}>
          {hidden ? "• • • • •" : "67,204"}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
          <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "16px", fontWeight: 300 }}>BYN</span>
          <span style={{ color: "rgba(245,240,232,0.1)", fontSize: "14px" }}>/</span>
          <span style={{ color: "rgba(245,240,232,0.18)", fontSize: "13px" }}>{hide("1,842,000 ₽")}</span>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "10px", background: "rgba(212,146,106,0.08)", border: "1px solid rgba(212,146,106,0.18)" }}>
          <span style={{ color: WARM, fontSize: "11px", fontWeight: 500 }}>+4.28%</span>
          <span style={{ color: "rgba(212,146,106,0.4)", fontSize: "11px" }}>today · {hide("≈ $18,420")}</span>
        </div>
      </div>

      <Divider label="Wallets" />

      {/* ── Wallets ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "4px" }}>
        {[
          { label: "Fiat Wallet", val: hide("24,850"), cur: "BYN", bar: 37 },
          { label: "Crypto Wallet", val: hide("42,354"), cur: "USD", bar: 63 },
        ].map((w) => (
          <div key={w.label} style={{ padding: "18px", borderRadius: "20px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}` }}>
            <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>{w.label}</div>
            <div style={{ color: IVORY, fontSize: "20px", fontWeight: 300, marginBottom: "3px" }}>{w.val}</div>
            <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", marginBottom: "12px" }}>{w.cur}</div>
            <div style={{ height: "2px", borderRadius: "1px", background: "rgba(245,240,232,0.06)" }}>
              <div style={{ width: `${w.bar}%`, height: "100%", borderRadius: "1px", background: WARM, transition: "width 0.6s ease" }} />
            </div>
          </div>
        ))}
      </div>

      <Divider label="Actions" />

      {/* ── Quick Actions ── */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", padding: "0 2px" }}>
        {actions.map((a) => (
          <button key={a.label} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            padding: "16px 12px", borderRadius: "18px",
            background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`,
            cursor: "pointer", transition: "all 0.2s",
            minWidth: "76px",
          }}>
            <span style={{ fontSize: "20px", color: IVORY, fontWeight: 200, opacity: 0.7 }}>{a.sym}</span>
            <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{a.label}</span>
          </button>
        ))}
      </div>

      <Divider label="Allocation" />

      {/* ── Assets ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {assets.map((a, i) => (
          <div key={a.sym} style={{
            padding: "14px 4px",
            borderBottom: i < assets.length - 1 ? "1px solid rgba(245,240,232,0.04)" : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "11px",
                  background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: IVORY, fontSize: "11px", fontWeight: 600, opacity: 0.6 }}>{a.sym.slice(0, 1)}</span>
                </div>
                <div>
                  <div style={{ color: IVORY, fontSize: "13px", fontWeight: 400, opacity: 0.85 }}>{a.sym}</div>
                  <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", marginTop: "1px" }}>{a.hold}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: IVORY, fontSize: "13px", fontWeight: 400, opacity: 0.9 }}>{a.price}</div>
                <div style={{ color: WARM, fontSize: "10px", marginTop: "1px" }}>{a.chg}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(245,240,232,0.04)" }}>
                <div style={{ width: `${a.alloc}%`, height: "100%", borderRadius: "1px", background: i === 0 ? IVORY : "rgba(245,240,232,0.18)", transition: "width 0.6s" }} />
              </div>
              <span style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", minWidth: "24px", textAlign: "right" }}>{a.alloc}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
