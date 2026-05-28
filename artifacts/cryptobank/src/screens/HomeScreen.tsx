import { useState } from "react";
import {
  Bell, Eye, EyeOff, ShieldCheck, TrendingUp, TrendingDown,
  Bitcoin, Zap, ArrowUpDown, Landmark, Coins, ChevronRight
} from "lucide-react";

const sparklineData = {
  BTC: [42100, 43200, 41800, 44500, 43100, 45200, 44800, 46100, 45600, 47200],
  ETH: [2240, 2310, 2180, 2390, 2280, 2450, 2420, 2510, 2480, 2620],
  TON: [5.12, 5.45, 5.28, 5.67, 5.34, 5.89, 5.72, 6.01, 5.94, 6.18],
  USDT: [0.998, 1.001, 0.999, 1.002, 1.000, 0.999, 1.001, 1.000, 1.001, 1.000],
};

type AssetKey = keyof typeof sparklineData;

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 60;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const color = positive ? "#00ff80" : "#ff4d4d";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const assets = [
  {
    id: "BTC" as AssetKey, name: "Bitcoin", symbol: "BTC",
    price: "47,248.20", change: "+3.84%", positive: true,
    holding: "0.32 BTC",
  },
  {
    id: "ETH" as AssetKey, name: "Ethereum", symbol: "ETH",
    price: "2,618.45", change: "+2.11%", positive: true,
    holding: "2.15 ETH",
  },
  {
    id: "TON" as AssetKey, name: "TON Crystal", symbol: "TON",
    price: "6.18", change: "+4.72%", positive: true,
    holding: "450 TON",
  },
  {
    id: "USDT" as AssetKey, name: "Tether USD", symbol: "USDT",
    price: "1.000", change: "+0.01%", positive: true,
    holding: "12,500 USDT",
  },
];

const quickActions = [
  { label: "Buy Crypto", icon: Bitcoin, color: "#f7931a" },
  { label: "Send / Pay", icon: ArrowUpDown, color: "#00ff80" },
  { label: "B2B Bridge", icon: Landmark, color: "#818cf8" },
  { label: "Earn / Stake", icon: Coins, color: "#fbbf24" },
];

export default function HomeScreen() {
  const [hidden, setHidden] = useState(false);

  const fmt = (val: string) => hidden ? "••••••" : val;

  return (
    <div className="px-4 pt-2 pb-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "40px", height: "40px",
              background: "linear-gradient(135deg, #1e3a2f, #0d2018)",
              border: "1.5px solid rgba(0,255,128,0.3)",
            }}
          >
            <span className="text-sm font-bold" style={{ color: "#00ff80" }}>АК</span>
            <div
              className="absolute bottom-0 right-0 rounded-full pulse-dot"
              style={{ width: "9px", height: "9px", background: "#00ff80", border: "1.5px solid #060f1e" }}
            />
          </div>
          <div>
            <div className="text-xs text-white/40">Welcome back</div>
            <div className="text-sm font-semibold text-white">Alexei Koval</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* AI Shield */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{
              background: "rgba(0,255,128,0.08)",
              border: "1px solid rgba(0,255,128,0.2)",
            }}
          >
            <ShieldCheck size={11} style={{ color: "#00ff80" }} />
            <span style={{ fontSize: "9px", color: "#00ff80", fontWeight: 600 }}>AI-Shield Active</span>
          </div>
          <button
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "36px", height: "36px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Bell size={16} className="text-white/60" />
            <div
              className="absolute top-1 right-1 rounded-full"
              style={{ width: "6px", height: "6px", background: "#ff4d4d" }}
            />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div
        className="rounded-3xl p-5 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d2018 0%, #071610 50%, #0a1f14 100%)",
          border: "1px solid rgba(0,255,128,0.2)",
          boxShadow: "0 0 40px rgba(0,255,128,0.08), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute -top-10 -right-10 rounded-full"
          style={{
            width: "120px", height: "120px",
            background: "radial-gradient(circle, rgba(0,255,128,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Total Portfolio Value</span>
          <button onClick={() => setHidden(!hidden)} className="text-white/40 hover:text-white/70 transition-colors">
            {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-white">{fmt("₿ 1.42")}</span>
          <span className="text-sm text-white/40">≈</span>
          <span className="text-xl font-semibold" style={{ color: "#00ff80" }}>{fmt("67,204 BYN")}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-4">
          <TrendingUp size={12} style={{ color: "#00ff80" }} />
          <span className="text-xs" style={{ color: "#00ff80" }}>+4.28% today</span>
          <span className="text-xs text-white/30">•</span>
          <span className="text-xs text-white/30">≈ 1,842,000 ₽</span>
        </div>
        {/* Mini balances */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-2xl p-3"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Landmark size={11} className="text-white/40" />
              <span style={{ fontSize: "9px" }} className="text-white/40 uppercase tracking-wider font-medium">Fiat Wallet</span>
            </div>
            <div className="text-base font-bold text-white">{fmt("24,850")}</div>
            <div className="text-xs text-white/40">{fmt("BYN / RUB")}</div>
          </div>
          <div
            className="rounded-2xl p-3"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Bitcoin size={11} style={{ color: "#f7931a" }} />
              <span style={{ fontSize: "9px" }} className="text-white/40 uppercase tracking-wider font-medium">Crypto Wallet</span>
            </div>
            <div className="text-base font-bold text-white">{fmt("42,354")}</div>
            <div className="text-xs" style={{ color: "#00ff80" }}>{fmt("≈ USD")}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <div className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">Quick Actions</div>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 py-3 rounded-2xl transition-all duration-200 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: "38px", height: "38px",
                    background: `${action.color}14`,
                    border: `1px solid ${action.color}30`,
                  }}
                >
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <span style={{ fontSize: "9px", lineHeight: "1.2" }} className="text-white/60 text-center font-medium leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assets Watchlist */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Watchlist</div>
          <button className="flex items-center gap-0.5 text-xs" style={{ color: "#00ff80" }}>
            All assets <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 active:scale-[0.99]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: "36px", height: "36px",
                    background: asset.id === "BTC" ? "#f7931a18" :
                               asset.id === "ETH" ? "#627eea18" :
                               asset.id === "TON" ? "#0098ea18" : "#26a17b18",
                    border: `1px solid ${
                      asset.id === "BTC" ? "#f7931a30" :
                      asset.id === "ETH" ? "#627eea30" :
                      asset.id === "TON" ? "#0098ea30" : "#26a17b30"
                    }`,
                    color: asset.id === "BTC" ? "#f7931a" :
                           asset.id === "ETH" ? "#627eea" :
                           asset.id === "TON" ? "#0098ea" : "#26a17b",
                  }}
                >
                  {asset.symbol.slice(0, 1)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{asset.name}</div>
                  <div className="text-xs text-white/30">{asset.holding}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkline data={sparklineData[asset.id]} positive={asset.positive} />
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">${asset.price}</div>
                  <div className="flex items-center gap-0.5 justify-end">
                    {asset.positive
                      ? <TrendingUp size={10} style={{ color: "#00ff80" }} />
                      : <TrendingDown size={10} style={{ color: "#ff4d4d" }} />
                    }
                    <span
                      className="text-xs font-medium"
                      style={{ color: asset.positive ? "#00ff80" : "#ff4d4d" }}
                    >
                      {asset.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
