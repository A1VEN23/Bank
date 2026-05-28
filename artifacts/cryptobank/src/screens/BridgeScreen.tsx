import { useState } from "react";

const IVORY = "#F5F0E8";
const IVORY_DIM = "rgba(245,240,232,0.05)";
const IVORY_BORDER = "rgba(245,240,232,0.08)";
const WARM = "#D4926A";

const targets = ["CNY", "AED", "TRY", "INR", "USD", "EUR", "KZT"];

const RATES: Record<string, number> = {
  CNY: 0.0809, AED: 0.0277, TRY: 0.882,
  INR: 0.847,  USD: 0.011,  EUR: 0.0101, KZT: 4.98,
};

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(245,240,232,0.04)" }}>
      <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "12px" }}>{label}</span>
      <span style={{ color: highlight ? WARM : IVORY, fontSize: "12px", fontWeight: highlight ? 500 : 400, opacity: highlight ? 1 : 0.8 }}>{value}</span>
    </div>
  );
}

export default function BridgeScreen() {
  const [amount, setAmount] = useState("150000");
  const [from] = useState("RUB");
  const [to, setTo] = useState("CNY");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const num = parseFloat(amount.replace(/\D/g, "")) || 0;
  const rate = RATES[to] ?? 0.01;
  const received = (num * rate).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const fee = (num * 0.0025).toFixed(0);

  const execute = () => {
    setState("loading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 3000); }, 2000);
  };

  return (
    <div style={{ padding: "20px 22px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
          Decree No. 19 · SWIFT-Free
        </div>
        <div style={{ fontSize: "28px", fontWeight: 200, color: IVORY, letterSpacing: "-1px", lineHeight: 1.2 }}>
          Transborder<br />
          <span style={{ color: WARM }}>Bridge</span>
        </div>
      </div>

      {/* Sanction check */}
      <div style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 16px", borderRadius: "16px", marginBottom: "28px",
        background: "rgba(212,146,106,0.06)", border: "1px solid rgba(212,146,106,0.14)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "12px", background: "rgba(212,146,106,0.1)", flexShrink: 0 }}>
          <span style={{ fontSize: "16px" }}>◉</span>
        </div>
        <div>
          <div style={{ color: IVORY, fontSize: "13px", fontWeight: 400, opacity: 0.85, marginBottom: "3px" }}>AI Risk & Sanction Check</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: WARM, boxShadow: `0 0 6px ${WARM}` }} />
            <span style={{ color: "rgba(212,146,106,0.7)", fontSize: "10px", letterSpacing: "0.08em" }}>100% CLEAN · OFAC · EU · UN verified</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: "8px", background: "rgba(212,146,106,0.1)" }}>
          <span style={{ color: WARM, fontSize: "10px", fontWeight: 700 }}>SAFE</span>
        </div>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {/* Send */}
        <div style={{ padding: "18px 20px", borderRadius: "18px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}` }}>
          <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>You Send</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                fontSize: "28px", fontWeight: 200, color: IVORY, letterSpacing: "-1px",
              }}
              placeholder="0"
            />
            <div style={{ padding: "6px 14px", borderRadius: "10px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}` }}>
              <span style={{ color: IVORY, fontSize: "13px", fontWeight: 500, opacity: 0.7 }}>{from}</span>
            </div>
          </div>
          <div style={{ color: "rgba(245,240,232,0.18)", fontSize: "11px", marginTop: "6px" }}>≈ ${(num * 0.011).toFixed(0)} USD</div>
        </div>

        {/* Arrow */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "10px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "rgba(245,240,232,0.4)", fontSize: "14px", fontWeight: 200 }}>↓</span>
          </div>
        </div>

        {/* Receive */}
        <div style={{ padding: "18px 20px", borderRadius: "18px", background: IVORY_DIM, border: `1px solid rgba(212,146,106,0.15)` }}>
          <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>They Receive</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, fontSize: "28px", fontWeight: 200, color: WARM, letterSpacing: "-1px" }}>{received}</div>
            <div style={{ position: "relative" }}>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{
                  padding: "6px 28px 6px 14px", borderRadius: "10px",
                  background: "rgba(212,146,106,0.08)", border: "1px solid rgba(212,146,106,0.2)",
                  color: WARM, fontSize: "13px", fontWeight: 500, cursor: "pointer", outline: "none",
                }}
              >
                {targets.map((t) => <option key={t} value={t} style={{ background: "#0a0908" }}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ color: "rgba(245,240,232,0.18)", fontSize: "11px", marginTop: "6px" }}>1 {from} = {rate} {to}</div>
        </div>
      </div>

      {/* Route card */}
      <div style={{ padding: "18px 20px", borderRadius: "18px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, marginBottom: "20px" }}>
        <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>Live Routing Path</div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {[
            { label: from, sub: "Fiat" },
            { label: "→", sub: null },
            { label: "USDT", sub: "~30s" },
            { label: "→", sub: null },
            { label: to, sub: "~2m" },
          ].map((s, i) => s.sub === null
            ? <span key={i} style={{ color: "rgba(245,240,232,0.15)", fontSize: "14px" }}>{s.label}</span>
            : (
              <div key={i} style={{ padding: "6px 12px", borderRadius: "10px", background: s.label === to ? "rgba(212,146,106,0.1)" : IVORY_DIM, border: `1px solid ${s.label === to ? "rgba(212,146,106,0.2)" : IVORY_BORDER}` }}>
                <div style={{ color: s.label === to ? WARM : IVORY, fontSize: "12px", fontWeight: 500, opacity: s.label === to ? 1 : 0.7 }}>{s.label}</div>
                <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", marginTop: "1px" }}>{s.sub}</div>
              </div>
            )
          )}
        </div>

        <Row label="Total Fee" value={`0.25% · ~${fee} ${from}`} />
        <Row label="Est. Time" value="~2m 30s" />
        <Row label="Legal Node" value="BY-PBT-012 · Verified" highlight />
        <Row label="Protocol" value="PBT Broker Layer v3" />
      </div>

      {/* Notice */}
      <div style={{ padding: "12px 16px", borderRadius: "14px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, marginBottom: "20px" }}>
        <p style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", lineHeight: 1.7 }}>
          Compliant with Decree No. 19 (BY) · Federal Law No. 259-FZ (RU). All routing through licensed PBT brokers with full KYC/AML.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={execute}
        disabled={state !== "idle"}
        style={{
          width: "100%", padding: "18px", borderRadius: "18px",
          fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em",
          cursor: state === "idle" ? "pointer" : "default",
          border: "none", transition: "all 0.3s",
          background: state === "done"
            ? "rgba(212,146,106,0.1)"
            : state === "loading"
            ? "rgba(245,240,232,0.04)"
            : "linear-gradient(135deg, rgba(212,146,106,0.9), rgba(190,116,82,0.9))",
          color: state === "idle" ? "#0a0908" : WARM,
          boxShadow: state === "idle" ? "0 0 30px rgba(212,146,106,0.2)" : "none",
        }}
      >
        {state === "done" ? "✓  Transfer Initiated" : state === "loading" ? "Processing…" : "Execute Legal Transfer"}
      </button>
    </div>
  );
}
