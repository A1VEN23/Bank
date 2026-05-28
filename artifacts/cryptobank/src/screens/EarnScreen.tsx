import { useState } from "react";
import {
  TrendingUp, Bitcoin, Coins, Lock, ChevronRight,
  Calculator, Percent, Clock, ShieldCheck, Zap
} from "lucide-react";

const depositProducts = [
  {
    asset: "BTC", name: "Bitcoin Deposit",
    apy: "8.0%", minAmount: "0.01 BTC", term: "90 days",
    color: "#f7931a", bg: "#f7931a18", border: "#f7931a30",
    badge: "Highest Yield",
  },
  {
    asset: "USDT", name: "Stablecoin Deposit",
    apy: "6.5%", minAmount: "500 USDT", term: "30 days",
    color: "#26a17b", bg: "#26a17b18", border: "#26a17b30",
    badge: "Most Popular",
  },
  {
    asset: "ETH", name: "Ethereum Deposit",
    apy: "5.2%", minAmount: "0.1 ETH", term: "60 days",
    color: "#627eea", bg: "#627eea18", border: "#627eea30",
    badge: null,
  },
];

export default function EarnScreen() {
  const [depositAmount, setDepositAmount] = useState(5000);
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [loanCollateral, setLoanCollateral] = useState(0.5);
  const [activeTab, setActiveTab] = useState<"deposit" | "loan">("deposit");

  const selectedProduct = depositProducts.find(p => p.asset === selectedAsset) || depositProducts[0];
  const apyNum = parseFloat(selectedProduct.apy) / 100;
  const monthlyEarnings = (depositAmount * apyNum / 12).toFixed(2);
  const annualEarnings = (depositAmount * apyNum).toFixed(2);

  const btcPrice = 47248;
  const collateralValue = loanCollateral * btcPrice;
  const maxLoan = collateralValue * 0.65;
  const ltv = 65;

  return (
    <div className="px-4 pt-2 pb-4">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} style={{ color: "#fbbf24" }} />
          <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Decree No. 19 · Compliant</span>
        </div>
        <h2 className="text-xl font-bold text-white">Earn & Deposits</h2>
        <p className="text-xs text-white/40 mt-0.5">Crypto-backed savings under full legal framework</p>
      </div>

      {/* Toggle tabs */}
      <div
        className="flex rounded-2xl p-1 mb-5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {(["deposit", "loan"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: activeTab === tab
                ? "linear-gradient(135deg, rgba(0,255,128,0.15), rgba(0,204,102,0.1))"
                : "transparent",
              color: activeTab === tab ? "#00ff80" : "rgba(255,255,255,0.35)",
              border: activeTab === tab ? "1px solid rgba(0,255,128,0.2)" : "1px solid transparent",
            }}
          >
            {tab === "deposit" ? "Crypto Deposit" : "Crypto Loan"}
          </button>
        ))}
      </div>

      {activeTab === "deposit" && (
        <>
          {/* Products list */}
          <div className="flex flex-col gap-3 mb-5">
            {depositProducts.map((product) => (
              <button
                key={product.asset}
                onClick={() => setSelectedAsset(product.asset)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 active:scale-[0.99]"
                style={{
                  background: selectedAsset === product.asset
                    ? `${product.bg}`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedAsset === product.asset ? product.border : "rgba(255,255,255,0.06)"}`,
                  boxShadow: selectedAsset === product.asset ? `0 0 20px ${product.bg}` : "none",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    width: "40px", height: "40px",
                    background: product.bg,
                    border: `1px solid ${product.border}`,
                    color: product.color,
                  }}
                >
                  {product.asset.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{product.name}</span>
                    {product.badge && (
                      <span
                        className="px-1.5 py-0.5 rounded-full"
                        style={{
                          fontSize: "8px", fontWeight: 700,
                          background: "rgba(0,255,128,0.15)",
                          color: "#00ff80",
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-white/40">Min: {product.minAmount}</span>
                    <span className="text-xs text-white/40">Term: {product.term}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: product.color }}>{product.apy}</div>
                  <div className="text-xs text-white/30">APY</div>
                </div>
              </button>
            ))}
          </div>

          {/* Calculator */}
          <div
            className="rounded-3xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calculator size={14} style={{ color: "#00ff80" }} />
              <span className="text-sm font-semibold text-white">Earnings Calculator</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-white/40">Deposit Amount (USDT)</span>
                <span className="text-sm font-bold" style={{ color: "#00ff80" }}>
                  ${depositAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00ff80 ${(depositAmount / 50000) * 100}%, rgba(255,255,255,0.1) ${(depositAmount / 50000) * 100}%)`,
                  outline: "none",
                }}
              />
              <div className="flex justify-between mt-1">
                <span style={{ fontSize: "9px" }} className="text-white/20">$100</span>
                <span style={{ fontSize: "9px" }} className="text-white/20">$50,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-3 text-center"
                style={{ background: "rgba(0,255,128,0.06)", border: "1px solid rgba(0,255,128,0.15)" }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock size={10} style={{ color: "#00ff80" }} />
                  <span style={{ fontSize: "9px" }} className="text-white/40">Monthly</span>
                </div>
                <div className="text-lg font-bold" style={{ color: "#00ff80" }}>
                  ${monthlyEarnings}
                </div>
                <div style={{ fontSize: "9px" }} className="text-white/30">est. earnings</div>
              </div>
              <div
                className="rounded-2xl p-3 text-center"
                style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Percent size={10} style={{ color: "#fbbf24" }} />
                  <span style={{ fontSize: "9px" }} className="text-white/40">Annual</span>
                </div>
                <div className="text-lg font-bold" style={{ color: "#fbbf24" }}>
                  ${annualEarnings}
                </div>
                <div style={{ fontSize: "9px" }} className="text-white/30">est. earnings</div>
              </div>
            </div>

            <button
              className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #00ff80, #00cc66)",
                color: "#020b14",
                boxShadow: "0 0 20px rgba(0,255,128,0.25)",
              }}
            >
              Open {selectedProduct.apy} APY Deposit
            </button>
          </div>
        </>
      )}

      {activeTab === "loan" && (
        <>
          {/* Loan info */}
          <div
            className="rounded-2xl px-4 py-3 mb-4 flex items-center gap-3"
            style={{ background: "rgba(247,147,26,0.08)", border: "1px solid rgba(247,147,26,0.2)" }}
          >
            <Bitcoin size={18} style={{ color: "#f7931a" }} />
            <div>
              <div className="text-sm font-semibold text-white">Bitcoin-Backed Loans</div>
              <div className="text-xs text-white/40">Borrow fiat or stablecoins using BTC as collateral</div>
            </div>
          </div>

          {/* Collateral slider */}
          <div
            className="rounded-3xl p-4 mb-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-sm font-semibold text-white mb-4">Collateral Configuration</div>

            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-white/40">BTC Collateral</span>
                <span className="text-sm font-bold" style={{ color: "#f7931a" }}>
                  {loanCollateral} BTC
                </span>
              </div>
              <input
                type="range"
                min={0.01}
                max={5}
                step={0.01}
                value={loanCollateral}
                onChange={(e) => setLoanCollateral(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f7931a ${(loanCollateral / 5) * 100}%, rgba(255,255,255,0.1) ${(loanCollateral / 5) * 100}%)`,
                  outline: "none",
                }}
              />
            </div>

            {/* LTV bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-white/40">Loan-to-Value (LTV)</span>
                <span className="text-sm font-bold" style={{ color: ltv > 80 ? "#ff4d4d" : ltv > 65 ? "#fbbf24" : "#00ff80" }}>
                  {ltv}%
                </span>
              </div>
              <div className="rounded-full overflow-hidden" style={{ height: "8px", background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${ltv}%`,
                    background: ltv > 80
                      ? "linear-gradient(90deg, #ff4d4d, #ff8800)"
                      : ltv > 65
                      ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                      : "linear-gradient(90deg, #00ff80, #00cc66)",
                    boxShadow: `0 0 8px rgba(0,255,128,0.3)`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span style={{ fontSize: "9px" }} className="text-white/20">0%</span>
                <span style={{ fontSize: "9px" }} className="text-white/30">Safe: &lt;65%</span>
                <span style={{ fontSize: "9px" }} className="text-white/20">100%</span>
              </div>
            </div>

            {/* Loan details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs text-white/40 mb-1">Collateral Value</div>
                <div className="text-base font-bold text-white">${collateralValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
              </div>
              <div className="rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs text-white/40 mb-1">Max Borrow</div>
                <div className="text-base font-bold" style={{ color: "#00ff80" }}>
                  ${maxLoan.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs text-white/40 mb-1">Interest Rate</div>
                <div className="text-base font-bold text-white">4.5% APR</div>
              </div>
              <div className="rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs text-white/40 mb-1">Term</div>
                <div className="text-base font-bold text-white">Flexible</div>
              </div>
            </div>
          </div>

          <div
            className="flex items-start gap-2 px-3 py-2.5 rounded-xl mb-4"
            style={{ background: "rgba(0,255,128,0.05)", border: "1px solid rgba(0,255,128,0.12)" }}
          >
            <ShieldCheck size={12} style={{ color: "#00ff80", marginTop: "2px" }} />
            <p style={{ fontSize: "10px" }} className="text-white/40">
              Collateral is held in licensed custody under Decree No. 19.
              Liquidation only occurs at 85% LTV with 24-hour notice.
            </p>
          </div>

          <button
            className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #f7931a, #e8830e)",
              color: "#020b14",
              boxShadow: "0 0 20px rgba(247,147,26,0.2)",
            }}
          >
            Apply for BTC-Backed Loan
          </button>
        </>
      )}
    </div>
  );
}
