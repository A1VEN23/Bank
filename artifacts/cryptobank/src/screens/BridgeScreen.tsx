import { useState } from "react";
import {
  ArrowDown, ShieldCheck, Zap, Globe, AlertCircle,
  CheckCircle2, ChevronDown, ArrowRight, Landmark, Lock
} from "lucide-react";

const currencies = ["BYN", "RUB", "USD", "EUR"];
const targets = ["CNY", "AED", "TRY", "INR", "USD", "EUR", "KZT"];

const routingSteps = [
  { from: "RUB", to: "USDT", via: "PBT Exchange", time: "~30s", fee: "0.1%" },
  { from: "USDT", to: "CNY", via: "Legal Broker Node", time: "~2min", fee: "0.15%" },
];

export default function BridgeScreen() {
  const [sendAmount, setSendAmount] = useState("150,000");
  const [fromCurr, setFromCurr] = useState("RUB");
  const [toCurr, setToCurr] = useState("CNY");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);

  const rate = toCurr === "CNY" ? 0.0809 :
               toCurr === "AED" ? 0.0277 :
               toCurr === "TRY" ? 0.882  :
               toCurr === "INR" ? 0.847  : 0.011;

  const numeric = parseFloat(sendAmount.replace(/,/g, "")) || 0;
  const receiveAmount = (numeric * rate).toLocaleString("en-US", { maximumFractionDigits: 2 });

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecuted(true);
      setTimeout(() => setExecuted(false), 3000);
    }, 2200);
  };

  return (
    <div className="px-4 pt-2 pb-4">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Globe size={16} style={{ color: "#818cf8" }} />
          <span className="text-xs text-white/40 uppercase tracking-wider font-medium">B2B Transborder Bridge</span>
        </div>
        <h2 className="text-xl font-bold text-white">Legal SWIFT-Free</h2>
        <h2 className="text-xl font-bold" style={{ color: "#818cf8" }}>Transfer Bridge</h2>
        <p className="text-xs text-white/40 mt-1">Compliant with Decree No. 19 · Instant routing</p>
      </div>

      {/* AI Risk Badge */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
        style={{
          background: "rgba(0,255,128,0.06)",
          border: "1px solid rgba(0,255,128,0.2)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full pulse-dot"
          style={{
            width: "36px", height: "36px",
            background: "rgba(0,255,128,0.12)",
          }}
        >
          <ShieldCheck size={18} style={{ color: "#00ff80" }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">AI Risk & Sanction Check</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,128,0.15)" }}>
              <CheckCircle2 size={10} style={{ color: "#00ff80" }} />
              <span style={{ fontSize: "9px", color: "#00ff80", fontWeight: 700 }}>100% CLEAN</span>
            </div>
          </div>
          <div className="text-xs text-white/40 mt-0.5">OFAC · EU · UN lists scanned · Neural verified</div>
        </div>
      </div>

      {/* Transfer Form */}
      <div
        className="rounded-3xl p-4 mb-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="text-xs text-white/40 font-medium mb-3">Transfer Details</div>

        {/* Send field */}
        <div
          className="rounded-2xl p-3 mb-3"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-xs text-white/30 mb-1.5">You Send</div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="flex-1 bg-transparent text-xl font-bold text-white outline-none"
              placeholder="0.00"
            />
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-sm font-semibold text-white">{fromCurr}</span>
              <ChevronDown size={13} className="text-white/40" />
            </button>
          </div>
          <div className="text-xs text-white/30 mt-1">
            ≈ ${(numeric * 0.011).toLocaleString("en-US", { maximumFractionDigits: 2 })} USD
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "32px", height: "32px",
              background: "rgba(129,140,248,0.15)",
              border: "1px solid rgba(129,140,248,0.3)",
            }}
          >
            <ArrowDown size={14} style={{ color: "#818cf8" }} />
          </div>
        </div>

        {/* Receive field */}
        <div
          className="rounded-2xl p-3"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-xs text-white/30 mb-1.5">They Receive</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 text-xl font-bold" style={{ color: "#00ff80" }}>
              {receiveAmount}
            </div>
            <div className="relative">
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="appearance-none flex items-center gap-1.5 px-3 py-2 pr-7 rounded-xl text-sm font-semibold text-white outline-none cursor-pointer"
                style={{
                  background: "rgba(129,140,248,0.12)",
                  border: "1px solid rgba(129,140,248,0.25)",
                  color: "white",
                }}
              >
                {targets.map((t) => <option key={t} value={t} style={{ background: "#040c18" }}>{t}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="text-xs text-white/30 mt-1">Rate: 1 {fromCurr} = {rate} {toCurr}</div>
        </div>
      </div>

      {/* Routing Path */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap size={12} style={{ color: "#fbbf24" }} />
          <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Live Routing Path</span>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Landmark size={11} className="text-white/60" />
            <span className="text-xs font-semibold text-white">{fromCurr}</span>
          </div>

          {routingSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <ArrowRight size={12} className="text-white/20" />
              <div
                className="flex flex-col items-center px-2.5 py-1.5 rounded-xl"
                style={{
                  background: i === 0 ? "rgba(129,140,248,0.1)" : "rgba(0,255,128,0.08)",
                  border: `1px solid ${i === 0 ? "rgba(129,140,248,0.25)" : "rgba(0,255,128,0.2)"}`,
                }}
              >
                <span className="text-xs font-bold" style={{ color: i === 0 ? "#818cf8" : "#00ff80" }}>
                  {step.to}
                </span>
                <span style={{ fontSize: "8px" }} className="text-white/30">{step.time}</span>
              </div>
            </div>
          ))}

          <ArrowRight size={12} className="text-white/20" />
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl"
            style={{ background: "rgba(0,255,128,0.1)", border: "1px solid rgba(0,255,128,0.3)" }}
          >
            <Globe size={11} style={{ color: "#00ff80" }} />
            <span className="text-xs font-semibold" style={{ color: "#00ff80" }}>{toCurr}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex-1">
            <div className="text-xs text-white/30">Total Fee</div>
            <div className="text-sm font-semibold text-white">0.25% · ~{(numeric * 0.0025).toFixed(0)} {fromCurr}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-white/30">Est. Time</div>
            <div className="text-sm font-semibold text-white">~2m 30s</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-white/30">Legal Node</div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={10} style={{ color: "#00ff80" }} />
              <span className="text-sm font-semibold" style={{ color: "#00ff80" }}>Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div
        className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl mb-4"
        style={{ background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.15)" }}
      >
        <Lock size={12} style={{ color: "#818cf8", marginTop: "2px" }} />
        <p style={{ fontSize: "10px" }} className="text-white/40 leading-relaxed">
          This transfer complies with Decree No. 19 (BY) and Federal Law No. 259-FZ (RU).
          All funds routed through licensed PBT brokers with full KYC/AML verification.
        </p>
      </div>

      {/* Execute button */}
      <button
        onClick={handleExecute}
        disabled={isExecuting || executed}
        className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98]"
        style={{
          background: executed
            ? "rgba(0,255,128,0.15)"
            : isExecuting
            ? "rgba(129,140,248,0.2)"
            : "linear-gradient(135deg, #00ff80, #00cc66)",
          color: executed ? "#00ff80" : isExecuting ? "#818cf8" : "#020b14",
          border: executed
            ? "1px solid rgba(0,255,128,0.4)"
            : isExecuting
            ? "1px solid rgba(129,140,248,0.3)"
            : "none",
          boxShadow: !isExecuting && !executed ? "0 0 30px rgba(0,255,128,0.3)" : "none",
        }}
      >
        {executed ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} />
            Transfer Initiated Successfully
          </span>
        ) : isExecuting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(129,140,248,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#818cf8" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Processing Legal Transfer...
          </span>
        ) : (
          "Execute Legal Transborder Transfer"
        )}
      </button>
    </div>
  );
}
