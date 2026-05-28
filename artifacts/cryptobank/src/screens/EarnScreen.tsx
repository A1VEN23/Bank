import { useState } from "react";

const IVORY = "#F5F0E8";
const IVORY_DIM = "rgba(245,240,232,0.05)";
const IVORY_BORDER = "rgba(245,240,232,0.08)";
const WARM = "#D4926A";

const products = [
  { asset: "BTC",  apy: 8.0, term: "90 days", min: "0.01 BTC",  tag: "Highest Yield" },
  { asset: "USDT", apy: 6.5, term: "30 days", min: "500 USDT",  tag: "Most Popular"  },
  { asset: "ETH",  apy: 5.2, term: "60 days", min: "0.1 ETH",   tag: null            },
];

function Label({ text }: { text: string }) {
  return (
    <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>
      {text}
    </div>
  );
}

export default function EarnScreen() {
  const [tab, setTab] = useState<"deposit" | "loan">("deposit");
  const [sel, setSel] = useState("BTC");
  const [depositAmt, setDepositAmt] = useState(5000);
  const [btcCollateral, setBtcCollateral] = useState(0.5);

  const product = products.find((p) => p.asset === sel) || products[0];
  const monthly = (depositAmt * (product.apy / 100) / 12).toFixed(2);
  const annual  = (depositAmt * (product.apy / 100)).toFixed(2);

  const btcPrice = 47248;
  const collVal  = btcCollateral * btcPrice;
  const maxLoan  = collVal * 0.65;

  return (
    <div style={{ padding: "20px 22px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Decree No. 19 · Compliant</div>
        <div style={{ fontSize: "28px", fontWeight: 200, color: IVORY, letterSpacing: "-1px", lineHeight: 1.2 }}>
          Earn &<br /><span style={{ color: WARM }}>Deposits</span>
        </div>
      </div>

      {/* Tab toggle */}
      <div style={{ display: "flex", borderRadius: "16px", padding: "4px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, marginBottom: "28px" }}>
        {(["deposit", "loan"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px", borderRadius: "12px",
            fontSize: "12px", fontWeight: tab === t ? 500 : 400,
            letterSpacing: "0.04em", cursor: "pointer", border: "none",
            background: tab === t ? "rgba(212,146,106,0.1)" : "transparent",
            color: tab === t ? WARM : "rgba(245,240,232,0.25)",
            transition: "all 0.2s",
          }}>
            {t === "deposit" ? "Crypto Deposit" : "Crypto Loan"}
          </button>
        ))}
      </div>

      {tab === "deposit" && (
        <>
          <Label text="Products" />

          {/* Product list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
            {products.map((p) => (
              <button key={p.asset} onClick={() => setSel(p.asset)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px 18px", borderRadius: "18px", cursor: "pointer",
                background: sel === p.asset ? "rgba(212,146,106,0.07)" : IVORY_DIM,
                border: `1px solid ${sel === p.asset ? "rgba(212,146,106,0.2)" : IVORY_BORDER}`,
                transition: "all 0.2s",
                textAlign: "left",
              }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: IVORY, fontSize: "12px", fontWeight: 600, opacity: 0.6 }}>{p.asset.slice(0, 1)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: IVORY, fontSize: "13px", fontWeight: 400, opacity: 0.85 }}>{p.asset} Deposit</span>
                    {p.tag && (
                      <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(212,146,106,0.1)", color: WARM, fontSize: "9px", fontWeight: 600, letterSpacing: "0.05em" }}>
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", marginTop: "3px" }}>Min {p.min} · {p.term}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: WARM, fontSize: "20px", fontWeight: 200, letterSpacing: "-0.5px" }}>{p.apy}%</div>
                  <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", letterSpacing: "0.1em" }}>APY</div>
                </div>
              </button>
            ))}
          </div>

          <Label text="Earnings Calculator" />

          {/* Calculator */}
          <div style={{ padding: "20px", borderRadius: "20px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
              <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "12px" }}>Deposit Amount</span>
              <span style={{ color: IVORY, fontSize: "18px", fontWeight: 200 }}>${depositAmt.toLocaleString()}</span>
            </div>

            <input
              type="range" min={100} max={50000} step={100}
              value={depositAmt} onChange={(e) => setDepositAmt(+e.target.value)}
              style={{
                width: "100%", height: "2px", borderRadius: "1px", border: "none",
                background: `linear-gradient(to right, ${WARM} ${(depositAmt / 50000) * 100}%, rgba(245,240,232,0.08) ${(depositAmt / 50000) * 100}%)`,
                marginBottom: "18px",
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
              {[
                { label: "Monthly", value: `$${monthly}` },
                { label: "Annual",  value: `$${annual}`  },
              ].map((item) => (
                <div key={item.label} style={{ padding: "14px", borderRadius: "14px", background: "rgba(212,146,106,0.06)", border: "1px solid rgba(212,146,106,0.12)", textAlign: "center" }}>
                  <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>{item.label}</div>
                  <div style={{ color: WARM, fontSize: "22px", fontWeight: 200, letterSpacing: "-0.5px" }}>{item.value}</div>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", padding: "16px", borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(212,146,106,0.85), rgba(190,116,82,0.85))",
              border: "none", color: "#0a0908", fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.05em", cursor: "pointer",
              boxShadow: "0 0 24px rgba(212,146,106,0.15)",
            }}>
              Open {product.apy}% APY Deposit
            </button>
          </div>
        </>
      )}

      {tab === "loan" && (
        <>
          <Label text="BTC-Backed Loan" />

          <div style={{ padding: "20px", borderRadius: "20px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "12px" }}>BTC Collateral</span>
              <span style={{ color: IVORY, fontSize: "18px", fontWeight: 200 }}>{btcCollateral} BTC</span>
            </div>
            <input
              type="range" min={0.01} max={5} step={0.01}
              value={btcCollateral} onChange={(e) => setBtcCollateral(+e.target.value)}
              style={{
                width: "100%", height: "2px", borderRadius: "1px", border: "none",
                background: `linear-gradient(to right, ${WARM} ${(btcCollateral / 5) * 100}%, rgba(245,240,232,0.08) ${(btcCollateral / 5) * 100}%)`,
                marginBottom: "20px",
              }}
            />

            {/* LTV */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "12px" }}>Loan-to-Value</span>
                <span style={{ color: WARM, fontSize: "12px", fontWeight: 500 }}>65%</span>
              </div>
              <div style={{ height: "4px", borderRadius: "2px", background: "rgba(245,240,232,0.06)" }}>
                <div style={{ width: "65%", height: "100%", borderRadius: "2px", background: `linear-gradient(90deg, ${WARM}, rgba(212,146,106,0.5))` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ color: "rgba(245,240,232,0.15)", fontSize: "9px" }}>Safe zone</span>
                <span style={{ color: "rgba(245,240,232,0.15)", fontSize: "9px" }}>Liq. at 85%</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { l: "Collateral Value", v: `$${collVal.toLocaleString("en-US", { maximumFractionDigits: 0 })}` },
                { l: "Max Borrow",       v: `$${maxLoan.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, hi: true },
                { l: "Interest Rate",    v: "4.5% APR" },
                { l: "Term",             v: "Flexible" },
              ].map((row) => (
                <div key={row.l} style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(245,240,232,0.03)" }}>
                  <div style={{ color: "rgba(245,240,232,0.2)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{row.l}</div>
                  <div style={{ color: row.hi ? WARM : IVORY, fontSize: "15px", fontWeight: 300, opacity: row.hi ? 1 : 0.8 }}>{row.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "12px 16px", borderRadius: "14px", background: IVORY_DIM, border: `1px solid ${IVORY_BORDER}`, marginBottom: "18px" }}>
            <p style={{ color: "rgba(245,240,232,0.2)", fontSize: "10px", lineHeight: 1.7 }}>
              Collateral held in licensed custody under Decree No. 19. Liquidation only at 85% LTV with 24-hour prior notice.
            </p>
          </div>

          <button style={{
            width: "100%", padding: "18px", borderRadius: "18px",
            background: "linear-gradient(135deg, rgba(212,146,106,0.85), rgba(190,116,82,0.85))",
            border: "none", color: "#0a0908", fontSize: "13px", fontWeight: 500,
            letterSpacing: "0.05em", cursor: "pointer",
          }}>
            Apply for BTC-Backed Loan
          </button>
        </>
      )}
    </div>
  );
}
